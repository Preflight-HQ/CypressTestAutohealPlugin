import SelectorGeneratorStep from './selector-generator-step';

/**
 * @class
 * get unique selector, path of node
 * @param {Object?} options
 * @param {Element} options.until
 * @constructor
 */
class SelectorGenerator {
  /**
   * @description get full path of node
   * @function getPath
   * @param {HTMLElement} node
   * @return {string}
   */

  static doc = document;
  getPath(node) {
    if (!node || node.nodeType !== 1) {
      return '';
    }
    var selectorGeneratorStep = new SelectorGeneratorStep({
      withoutNthChild: true,
      targetNode: node,
    });
    var steps = [];
    var contextNode = node;
    while (contextNode) {
      var step = selectorGeneratorStep.visit(contextNode);
      if (!step) {
        break;
      } // Error - bail out early.
      steps.push(step);
      contextNode = contextNode.parentNode;
    }

    steps.reverse();
    return steps.join(' ');
  }

  /**
   * @param {HTMLElement} node
   * @param {boolean?} optimized
   * @return {string}
   */
  static getSelector(node, optimized = true) {
    if (!node || node.nodeType !== 1) {
      return '';
    }
    var selectorGeneratorStep = new SelectorGeneratorStep({ targetNode: node, until: null });
    var steps = [];
    var contextNode = node;
    while (contextNode) {
      var step = selectorGeneratorStep.visit(contextNode);
      if (!step) {
        break; // Error - bail out early.
      }
      steps.push(step);
      if (optimized) {
        if (SelectorGenerator.isUniqueSelector(SelectorGenerator.buildSelector(steps))) {
          break;
        }
      }
      contextNode = contextNode.parentNode;
    }

    var simplifiedSteps = SelectorGenerator.simplifySelector(steps);
    return SelectorGenerator.buildSelector(simplifiedSteps);
  }

  /**
   * simplify selector
   * @example
   * ```
   *  <div>
   *      <div>
   *          <form>
   *              <input type="text"/>
   *          </form>
   *      </div>
   *  </div>
   *
   * var steps = [new DomNodePathStep("input[type='text']"), new DomNodePathStep("form"), new DomNodePathStep("div"), new DomNodePathStep("div")];
   * var simplified = simplifySelector(steps); // ["input[type='text']", "form"]
   * ```
   *
   * @example
   * ```
   *  <div id="loginForm">
   *      <div>
   *          <div>
   *              <input type="text"/>
   *          </div>
   *      </div>
   *  </div>
   *
   * var steps = [new DomNodePathStep("input[type='text']"), new DomNodePathStep("div"), new DomNodePathStep("div"), new DomNodePathStep("div#loginForm")];
   * var simplified = simplifySelector(steps); // [["input[type='text']"],["div#loginForm"]]
   * ```
   *
   * @method simplifySelector
   * @param {Array} steps parts of selector
   * @return {Array} steps array of steps or array Arrays of steps
   */
  static simplifySelector(steps) {
    var minLength = 2;
    //if count of selectors is little, that not modify selector
    if (steps.length <= minLength) {
      return steps;
    }

    var stepsCopy = steps.slice();
    SelectorGenerator.removeHtmlBodySteps(stepsCopy);

    var lastStep = stepsCopy[stepsCopy.length - 1];
    var parentWithId = lastStep.toString().indexOf('#') >= 0;
    var parentWithName = lastStep.toString().indexOf('name=') >= 0;

    if (parentWithId || parentWithName) {
      var selector = SelectorGenerator.simplifyStepsWithParent(stepsCopy);
      if (this.isUniqueSelector(selector)) {
        return selector;
      }
    }

    return SelectorGenerator.regularSimplifySteps(stepsCopy, minLength);
  }

  /**
   * remove Html, Body Steps
   * @param steps
   */
  static removeHtmlBodySteps(steps) {
    while (steps[steps.length - 1].toString() === 'html' || steps[steps.length - 1].toString() === 'body') {
      steps.pop();
    }
  }

  /**
   *  simplifyStepsWithParent
   * @function simplifyStepsWithParent
   * @param steps
   * @return {Array} array of arrays
   */
  static simplifyStepsWithParent(steps) {
    var parentStep = steps.slice(-1);
    var sliced = steps.slice(0, 1);
    while (sliced.length < steps.length - 1) {
      var selector = SelectorGenerator.buildSelector([sliced, parentStep]);
      if (SelectorGenerator.isUniqueSelector(selector)) {
        break;
      }
      sliced = steps.slice(0, sliced.length + 1);
    }
    return [sliced, parentStep];
  }

  /**
   * regularSimplifySteps
   * @method regularSimplifySteps
   * @param {Array} steps
   * @param {int=2} minLength
   * @return {Array} array of steps
   */
  static regularSimplifySteps(steps, minLength) {
    minLength = minLength || 2;
    var sliced = steps.slice(0, minLength);
    while (sliced.length < steps.length) {
      var selector = SelectorGenerator.buildSelector(sliced);
      if (SelectorGenerator.isUniqueSelector(selector)) {
        break;
      }
      sliced = steps.slice(0, sliced.length + 1);
    }
    return sliced;
  }

  /**
   * create selector string from steps array
   * @function buildSelector
   * @example
   * with single array of steps
   * ```
   * <form id="loginForm">
   *    <input type='text'/>
   * </form>
   *
   *  var steps = [new DomNodePathStep("input[type='text']"),new DomNodePathStep("form#loginForm")];
   *  var selector = buildSelector(steps); // "form#loginForm > input[type='text']"
   * ```
   *
   * @example
   * with multiple array of steps
   * ```
   * <div id="loginForm">
   *    <div>
   *       <div>
   *          <input type='text'/>
   *      </div>
   *   </div>
   *  </div>
   *
   * var steps = [[new DomNodePathStep("input[type='text']")],[new DomNodePathStep("div#loginForm")]];
   * var selector = buildSelector(steps); // "div#loginForm input[type='text']"
   * ```
   *
   * @param {Array} steps Array of string or array of Array of string
   * @return {string} selector string
   */
  static buildSelector(steps) {
    var stepsCopy = steps.slice();
    stepsCopy.reverse();
    //check steps is regular array of steps
    if (typeof stepsCopy[0] !== 'undefined') {
      return stepsCopy.join(' > ');
    } else {
      return stepsCopy.reduce(
        function(previousValue, currentValue) {
          var selector = SelectorGenerator.buildSelector(currentValue);
          return previosValue ? previosValue + ' ' + selector : selector;
        },
        ''
      );
    }
  }

  /**
   * @function isUniqueSelector
   * detect selector is unique
   * @param {String} selector
   * @return {boolean} unique selector?
   */
  static isUniqueSelector(selector) {
    return this.doc.body.querySelectorAll(selector).length < 2;
  }
}

export default SelectorGenerator;
