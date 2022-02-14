
const handlerElementTags = ['a', 'button'];
const skipElementTags = ['input', 'textarea', 'select'];
const exceptionCharsToInclude = ['..', '+', '-', '>', '<', '*', '$', '@'];
const tags = [
  { id: 1, tagName: '!doctype' },
  { id: 2, tagName: 'a' },
  { id: 3, tagName: 'abbr' },
  { id: 4, tagName: 'acronym' },
  { id: 5, tagName: 'address' },
  { id: 6, tagName: 'applet' },
  { id: 7, tagName: 'area' },
  { id: 8, tagName: 'article' },
  { id: 9, tagName: 'aside' },
  { id: 10, tagName: 'audio' },
  { id: 11, tagName: 'b' },
  { id: 12, tagName: 'base' },
  { id: 13, tagName: 'basefont' },
  { id: 14, tagName: 'bdi' },
  { id: 15, tagName: 'bdo' },
  { id: 16, tagName: 'big' },
  { id: 17, tagName: 'blockquote' },
  { id: 18, tagName: 'body' },
  { id: 19, tagName: 'br' },
  { id: 20, tagName: 'button' },
  { id: 21, tagName: 'canvas' },
  { id: 22, tagName: 'caption' },
  { id: 23, tagName: 'center' },
  { id: 24, tagName: 'cite' },
  { id: 25, tagName: 'code' },
  { id: 26, tagName: 'col' },
  { id: 27, tagName: 'colgroup' },
  { id: 28, tagName: 'data' },
  { id: 29, tagName: 'datalist' },
  { id: 30, tagName: 'dd' },
  { id: 31, tagName: 'del' },
  { id: 32, tagName: 'details' },
  { id: 33, tagName: 'dfn' },
  { id: 34, tagName: 'dialog' },
  { id: 35, tagName: 'dir' },
  { id: 36, tagName: 'div' },
  { id: 37, tagName: 'dl' },
  { id: 38, tagName: 'dt' },
  { id: 39, tagName: 'em' },
  { id: 40, tagName: 'embed' },
  { id: 41, tagName: 'fieldset' },
  { id: 42, tagName: 'figcaption' },
  { id: 43, tagName: 'figure' },
  { id: 44, tagName: 'font' },
  { id: 45, tagName: 'footer' },
  { id: 46, tagName: 'form' },
  { id: 47, tagName: 'frame' },
  { id: 48, tagName: 'frameset' },
  { id: 49, tagName: 'h1 to <h6>' },
  { id: 50, tagName: 'head' },
  { id: 51, tagName: 'header' },
  { id: 52, tagName: 'hr' },
  { id: 53, tagName: 'html' },
  { id: 54, tagName: 'i' },
  { id: 55, tagName: 'iframe' },
  { id: 56, tagName: 'img' },
  { id: 57, tagName: 'input' },
  { id: 58, tagName: 'ins' },
  { id: 59, tagName: 'kbd' },
  { id: 60, tagName: 'label' },
  { id: 61, tagName: 'legend' },
  { id: 62, tagName: 'li' },
  { id: 63, tagName: 'link' },
  { id: 64, tagName: 'main' },
  { id: 65, tagName: 'map' },
  { id: 66, tagName: 'mark' },
  { id: 67, tagName: 'meta' },
  { id: 68, tagName: 'meter' },
  { id: 69, tagName: 'nav' },
  { id: 70, tagName: 'noframes' },
  { id: 71, tagName: 'noscript' },
  { id: 72, tagName: 'object' },
  { id: 73, tagName: 'ol' },
  { id: 74, tagName: 'optgroup' },
  { id: 75, tagName: 'option' },
  { id: 76, tagName: 'output' },
  { id: 77, tagName: 'p' },
  { id: 78, tagName: 'param' },
  { id: 79, tagName: 'picture' },
  { id: 80, tagName: 'pre' },
  { id: 81, tagName: 'progress' },
  { id: 82, tagName: 'q' },
  { id: 83, tagName: 'rp' },
  { id: 84, tagName: 'rt' },
  { id: 85, tagName: 'ruby' },
  { id: 86, tagName: 's' },
  { id: 87, tagName: 'samp' },
  { id: 88, tagName: 'script' },
  { id: 89, tagName: 'section' },
  { id: 90, tagName: 'select' },
  { id: 91, tagName: 'small' },
  { id: 92, tagName: 'source' },
  { id: 93, tagName: 'span' },
  { id: 94, tagName: 'strike' },
  { id: 95, tagName: 'strong' },
  { id: 96, tagName: 'style' },
  { id: 97, tagName: 'sub' },
  { id: 98, tagName: 'summary' },
  { id: 99, tagName: 'sup' },
  { id: 100, tagName: 'svg' },
  { id: 101, tagName: 'table' },
  { id: 102, tagName: 'tbody' },
  { id: 103, tagName: 'td' },
  { id: 104, tagName: 'template' },
  { id: 105, tagName: 'textarea' },
  { id: 106, tagName: 'tfoot' },
  { id: 107, tagName: 'th' },
  { id: 108, tagName: 'thead' },
  { id: 109, tagName: 'time' },
  { id: 110, tagName: 'title' },
  { id: 111, tagName: 'tr' },
  { id: 112, tagName: 'track' },
  { id: 113, tagName: 'tt' },
  { id: 114, tagName: 'u' },
  { id: 115, tagName: 'ul' },
  { id: 116, tagName: 'var' },
  { id: 117, tagName: 'video' },
  { id: 118, tagName: 'wbr' },
];

class XPathGenerator {
  constructor(doc, options) {
    this.doc = doc;
    this.options = options || {
      checkVisibility: true,
    };
  }

  getOwnerDocumentOfElement = element => {
    if (!element) return null;
    return element.contentDocument || element.ownerDocument;
  };

  updateDocument(element) {
    this.doc = this.getOwnerDocumentOfElement(element);
  }

  generateXPath(element) {
    const handlerElement = this.getHandlerElement(element);
    this.updateDocument(handlerElement);
    this.prepareElement(handlerElement);
    return this.xpathStrategies(element);
  }

  getAttributes(element) {
    var attrs = element.attributes;
    var result = [];
    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].value.indexOf('base64')) continue;
      result.push({ name: attrs[i].name, value: attrs[i].value });
    }
    return result;
  }
  getTagName(element) {
    return this.getTagId(element.tagName.toLowerCase());
  }
  getTagId(tagName) {
    var found = tags.find(d => d.tagName === tagName);
    if (found === undefined) {
      return {
        i: 0,
        t: tagName,
      };
    }
    return {
      i: found.id,
    };
  }
  getTagNameFromTagObj(tag) {
    if (tag.i === 0) return tag.t;
    var found = tags.find(d => d.id === tag.i);
    return found.tagName;
  }
  getPreviousSiblings(element) {
    var siblings = [];
    var current = element.previousElementSibling;
    while (current) {
      siblings.push({
        ta: this.getTagName(current),
        a: this.getAttributes(current),
        t: this.getText(current),
      });
      current = current.previousElementSibling;
    }
    return siblings;
  }
  getNextSiblings(element) {
    var siblings = [];
    var current = element.nextElementSibling;
    while (current) {
      siblings.push({
        ta: this.getTagName(current),
        a: this.getAttributes(current),
        t: this.getText(current),
      });
      current = current.nextElementSibling;
    }
    return siblings;
  }
  getData(element, level) {
    if (!element) {
      return null;
    }
    var parent;
    if (level === undefined) level = 0;
    if (element.parentElement !== null) parent = this.getData(element.parentElement, ++level);
    return {
      ta: this.getTagName(element),
      a: this.getAttributes(element),
      p: parent,
      ps: this.getPreviousSiblings(element),
      ns: this.getNextSiblings(element),
      t: this.getText(element, [], [], 0, false),
    };
  }
  findElementsByXpath(xpathToExecute) {
    var result = [];
    try {
      var nodesSnapshot = this.doc.evaluate(xpathToExecute, this.doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        result.push(nodesSnapshot.snapshotItem(i));
      }
    } catch (e) {}
    return result;
  }
  isVisible(el) {
    if (!this.options.checkVisibility) return true;
    let result = !(el.offsetWidth === 0 && el.offsetHeight === 0);
    return result;
  }

  isSelect(el) {
    if (!el) {
      return false;
    }
    return el.tagName === 'SELECT';
  }

  getText(element, result, parents, level, deep) {
    if (element === null) return;
    if (this.isSelect(element)) return [];
    if (!deep && level > 2) return result;
    const addToResult = (level, text, p, tag) => {
      if (text === undefined || text === null || text === '') {
        return;
      }
      text = text.replace(/\r?\n|\r/g, '');
      if (exceptionCharsToInclude.indexOf(text) === -1) {
        let pureText = text.replace(/[^A-Za-z!?]/g, '');
        if (pureText.length < 3) return;
      }

      let match = text.match(/^\s+$/);
      if (match === null)
        result.push({
          l: level,
          t: text,
          ta: this.getTagId(tag),
          p: p.map(this.getTagId),
        });
    };
    if (result === undefined) result = [];
    if (parents === undefined) parents = [];
    if (level === undefined) level = 0;
    var children = element.childNodes;
    if (children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.nodeType === 3) {
          if (child.parentElement.tagName.toLowerCase() === 'style' || child.parentElement.tagName.toLowerCase() === 'script') continue;
          if (children.length === 1) parents.push(this.getTagNameFromElement(element));
          addToResult(level, child.textContent, Array.from(parents), this.getTagNameFromElement(element));
        } else if (child.nodeType === 1) {
          if (child.tagName.toLowerCase() === 'style' || child.tagName.toLowerCase() === 'script') continue;
          if (level !== 0) parents.push(this.getTagNameFromElement(element));
          this.getText(child, result, Array.from(parents), level + 1);
        }
      }
    } else if (element.nodeType === 3) {
      // if node is text
      addToResult(level, element.textContent, parents, null);
    } else if (element.nodeType === 1) {
      if (element.tagName.toLowerCase() === 'style' || element.tagName.toLowerCase() === 'script') return result;
      // if node is element
      addToResult(level, element.innerText, parents, this.getTagNameFromElement(element));
    }

    return result;
  }
  getTagNameFromElement(el) {
    let tag = el.tagName.toLowerCase();
    if (tag === 'svg') return "*[name()='svg']";
    return tag;
  }
  xpathStrategyFormElement(el) {
    // preceding siblings
    var texts = [];
    var tempEl = el;
    while (tempEl && tempEl.previousSibling) {
      tempEl = tempEl.previousSibling;
      texts.push(...this.getText(tempEl, [], [], 0, true));
    }

    var xpaths = [];
    for (let i = 0; i < texts.length; i++) {
      let xpath = `//${this.getTagNameFromElement(el)}[preceding-sibling::*[descendant::text()='${texts[i].t}']]`;
      xpaths.push(xpath);
    }

    // following siblings
    tempEl = el;
    while (tempEl && tempEl.nextSibling) {
      tempEl = tempEl.nextSibling;
      texts.push(...this.getText(tempEl, [], [], 0, true));
    }

    for (let i = 0; i < texts.length; i++) {
      let xpath = `//${this.getTagNameFromElement(el)}[following-sibling::*[descendant::text()='${texts[i].t}']]`;
      xpaths.push(xpath);
    }

    return xpaths;
  }
  xpathStrategyFormElementParent(el) {
    var texts = [];
    var tempEl = el.parentElement;
    while (tempEl && tempEl.previousSibling) {
      tempEl = tempEl.previousSibling;
      texts.push(...this.getText(tempEl));
    }

    var xpaths = [];
    for (var i = 0; i < texts.length; i++) {
      let xpath = `//${this.getTagNameFromTagObj(texts[i].ta)}[text()='${texts[i].t}']/..//${this.getTagNameFromElement(el)}`;
      xpaths.push(xpath);
    }
    return xpaths;
  }
  xpathStrategyFromElementAttribute(el, attribute) {
    if (el.nodeType === 1 && el.hasAttribute(attribute) && el.getAttribute(attribute) !== '') {
      let xpath = `//${this.getTagNameFromElement(el)}[@${attribute}='${el.getAttribute(attribute)}']`;
      return xpath;
    }
    return null;
  }
  xpathStrategyFromElementAttributes(el) {
    var xpaths = [];
    let attributes = ['placeholder', 'name', 'id', 'value', 'href', 'src'];
    for (var i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      let xpath = this.xpathStrategyFromElementAttribute(el, attribute);
      if (xpath !== null) xpaths.push(xpath);
    }
    return xpaths;
  }
  xpathStrategyText(el) {
    var xpaths = [];
    if (el.nodeType === 1 && el.innerText !== undefined && el.innerText.trim() !== '') {
      let xpath = `//${this.getTagNameFromElement(el)}[normalize-space(.)='${el.innerText.trim()}']`;
      xpaths.push(xpath);
    }
    let texts = this.getText(el);
    for (var i = 0; i < texts.length; i++) {
      let text = texts[i];
      let xpath = `//${this.getTagNameFromElement(el)}//${this.getTagNameFromTagObj(text.ta)}[text()='${text.t}']`;
      xpaths.push(xpath);
      let xpath2 = `//${this.getTagNameFromTagObj(text.ta)}[text()='${text.t}']`;
      xpaths.push(xpath2);
    }

    return xpaths;
  }
  prepareElement(el) {
    try {
      el.style.textTransform = 'none';
    } catch (e) {}
  }
  neutralizeElement(el) {
    try {
      el.style.textTransform = '';
    } catch (e) {}
  }
  xPathStrategyDescendantText(data) {
    let xpaths = [];
    for (var i = 0; i < data.t.length; i++) {
      let xpath = `//${this.getTagNameFromTagObj(data.t[i].ta)}[descendant::text()='${data.t[i].t}']`;
      xpaths.push(xpath);
    }
    return xpaths;
  }
  xpathStrategyTextInSameLevel(data) {
    let xpaths = [];
    if (!data || !data.p) {
      return xpaths;
    }
    var textsSameLevel = data.p.t;
    for (var i = 0; i < textsSameLevel.length; i++) {
      let xpathPreceding = `//${this.getTagNameFromTagObj(textsSameLevel[i].ta)}[preceding-sibling::text()='${textsSameLevel[i].t}']`;
      xpaths.push(xpathPreceding);
      let xpathFollowing = `//${this.getTagNameFromTagObj(textsSameLevel[i].ta)}[following-sibling::text()='${textsSameLevel[i].t}']`;
      xpaths.push(xpathFollowing);
    }
    return xpaths;
  }
  getXpathFromUpperEl(upperEl, el) {
    var xpaths = [];
    if (upperEl) {
      let texts = this.getText(upperEl);
      for (var i = 0; i < texts.length; i++) {
        let text = texts[i];
        let xpath = `//${this.getTagNameFromTagObj(text.ta)}[text()='${text.t}']/..//${this.getTagNameFromElement(el)}`;
        xpaths.push(xpath);
      }
    }
    return xpaths;
  }
  xpathStrategyUpperText(el) {
    var xpaths = [];
    var rect = el.getBoundingClientRect();
    var upperEl = document.elementFromPoint(rect.x - rect.width, rect.y - rect.height);
    xpaths.push(...this.getXpathFromUpperEl(upperEl, el));
    upperEl = document.elementFromPoint(rect.x - 2 * rect.width, rect.y - 2 * rect.height);
    xpaths.push(...this.getXpathFromUpperEl(upperEl, el));
    upperEl = document.elementFromPoint(rect.x - 3 * rect.width, rect.y - 3 * rect.height);
    xpaths.push(...this.getXpathFromUpperEl(upperEl, el));

    return xpaths;
  }
  getAttributesSelector(el, maxAttributes) {
    let excludedClasses = ['ng-'];
    let elClasses = [...el.classList].filter(c => excludedClasses.find(ec => !c.includes(ec)));
    let elAttributesXpath = [];
    let iterations = Math.min(maxAttributes, elClasses.length);

    for (let i = 0; i < iterations; i++) {
      elAttributesXpath.push({
        priority: 2,
        value: `contains(@class, '${elClasses[i]}')`,
      });
    }
    if (el.type) {
      elAttributesXpath.push({
        priority: 1,
        value: `@type='${el.type}'`,
      });
    }
    if (el.name) {
      elAttributesXpath.push({
        priority: 1,
        value: `@name='${el.name}'`,
      });
    }
    elAttributesXpath.sort((a, b) => a.priority - b.priority);
    elAttributesXpath = elAttributesXpath.slice(0, 3);
    let result = elAttributesXpath.map(e => e.value).join(' and ');
    return `[${result}]`;
  }

  getSelectableInnerTextForXPath(inputText, maxWrodsCount = 999) {
    if (!inputText) {
      return null;
    }
    let text = inputText;
    text = text.replace(/^[\s]+|[\s]+$/m, '');
    text = text.split('\n').find(t => t.length > 2);
    if (!text) {
      return null;
    }
    text = text.split("'").find(t => t.length > 2);
    if (!text) {
      return null;
    }
    let words = text.split(' ');
    text = words.slice(0, Math.min(maxWrodsCount, words.length)).join(' ');
    return text;
  }

  getElementTextForXpath(el) {
    let elInnerText = el.innerText;
    let elTextContent = el.textContent;
    if (!elInnerText || !elTextContent) {
      return '';
    }

    let elTextContentLower = el.textContent.toLowerCase();
    let texts = elInnerText.toLowerCase().split('\n');
    let results = [];
    texts.forEach(t => {
      let position = elTextContentLower.indexOf(t);
      if (position != -1) {
        results.push(elTextContent.substr(position, t.length));
      }
    });
    let result = results.join('\n');
    return result;
  }

  xpathStrategyFormAncestorText(el) {
    let elAttributesSelector = this.getAttributesSelector(el, 3);
    let elText = this.getElementTextForXpath(el);
    let elTagName = el.tagName;
    let elementSelectors = [];
    if (elText) {
      let elXpathSelectorText = this.getSelectableInnerTextForXPath(elText, 1);
      elementSelectors.push(`${elTagName}[contains(text(), '${elXpathSelectorText}')]`);
    }
    if (elAttributesSelector) {
      elementSelectors.push(`${elTagName}${elAttributesSelector}`);
    }
    if (elementSelectors.length == 0) {
      elementSelectors.push('' + elTagName);
    }
    let hierarchy = [];
    let repeatingText = elText;
    let parent = el.parentElement;
    let xpaths = [];
    while (parent) {
      let parentText = this.getElementTextForXpath(parent);
      let parentTextPure = parentText.replace(repeatingText, '');
      let parentXpathText = this.getSelectableInnerTextForXPath(parentTextPure, 4);
      if (!parentXpathText) {
        hierarchy.unshift(parent.tagName);
        parent = parent.parentElement;
        continue;
      }

      let hierarchyXpath = hierarchy.length > 3 ? '/descendant::*' : '/' + hierarchy.join('/');
      if (hierarchy.length == 0) {
        hierarchyXpath = '';
      }
      elementSelectors.forEach(elSelector => {
        let xpath = `(//*[contains(text(), '${parentXpathText}')]/ancestor-or-self::*${hierarchyXpath}/${elSelector})`;
        xpaths.push({
          selector: xpath,
          hierarchyDepth: hierarchy.length,
        });
      });

      repeatingText = parentText;
      hierarchy.unshift(parent.tagName);
      parent = parent.parentElement;
    }
    let resultXpaths = [];
    xpaths.forEach(x => {
      let elements = this.findElementsByXpath(x.selector);
      if (!elements || elements.length == 0) {
        return false;
      }
      let index = 1;
      elements.forEach(e => {
        if (e == el) {
          resultXpaths.push({
            selector: `${x.selector}[${index}]`,
            resultsCount: elements.length,
            hierarchyDepth: x.hierarchyDepth,
          });
        }
        index++;
      });
    });
    resultXpaths = resultXpaths.sort((a, b) => a.hierarchyDepth - b.hierarchyDepth).sort((a, b) => a.resultsCount - b.resultsCount);
    return resultXpaths.slice(0, Math.min(resultXpaths.length, 3)).map(r => r.selector);
  }

  getHandlerElement(el) {
    if (!el || !el.tagName || skipElementTags.indexOf(el.tagName.toLowerCase()) > -1) return el;

    var parent = el.parentElement;
    for (var i = 0; i < 5 && parent !== null; i++) {
      if (parent.tagName && handlerElementTags.indexOf(parent.tagName.toLowerCase()) > -1) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return el;
  }
  xpathStrategies(el) {
    let data = this.getData(el);

    var xpaths = [];
    xpaths.push(...this.xPathStrategyDescendantText(data));
    xpaths.push(...this.xpathStrategyTextInSameLevel(data));
    xpaths.push(...this.xpathStrategyFormElement(el));
    xpaths.push(...this.xpathStrategyFormElementParent(el));
    xpaths.push(...this.xpathStrategyFromElementAttributes(el));
    xpaths.push(...this.xpathStrategyText(el));
    xpaths.push(...this.xpathStrategyUpperText(el));
    xpaths.push(...this.xpathStrategyFormAncestorText(el));

    xpaths = [...new Set(xpaths)];
    const uniqueXpaths = [];
    const fallbackXpaths = [];
    const possibleXpaths = [];
    for (var i = 0; i < xpaths.length; i++) {
      let xpath = xpaths[i];
      var foundElements = this.findElementsByXpath(xpath);
      var visibleElements = foundElements.filter(d => {
        return this.isVisible(d);
      });
      if (visibleElements.length === 1 && el === this.getHandlerElement(visibleElements[0])) {
        uniqueXpaths.push(xpath);
      } else if (visibleElements.length > 1) {
        possibleXpaths.push(xpath);
        const index = visibleElements.indexOf(el) + 1;
        let xpathWithPosition = `(${xpath})[${index}]`;
        foundElements = this.findElementsByXpath(xpathWithPosition);
        visibleElements = foundElements.filter(d => {
          return this.isVisible(d);
        });
        if (visibleElements.length === 1 && el === this.getHandlerElement(visibleElements[0])) {
          fallbackXpaths.push(xpathWithPosition);
        }
      } else if (foundElements.length > 0) {
        possibleXpaths.push(xpath);
      }
    }

    this.neutralizeElement(el);
    var result = {
      unique: uniqueXpaths.length === 0 ? fallbackXpaths : uniqueXpaths,
      possible: possibleXpaths,
      data: data,
    };
    return result;
  }
}

export default new XPathGenerator(document);
