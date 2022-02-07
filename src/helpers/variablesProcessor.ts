import PreflightGlobalStore from "../PreflightGlobalStore";
import fakerService from "../APIs/fakerApiService";
import uuidv4 from "./globalHelpers";
import actionVariablesHelper from "./actionVariablesHelper";
import {getFakerVariables} from "./fakerVariables";

class VariablesProcessor {
  public get usedVariables() {
    if(!PreflightGlobalStore.state.variables.used){
      PreflightGlobalStore.state.variables.used = [];
    }
    return PreflightGlobalStore.state.variables.used;
  }
  public get generatedEmail(): string{
    let email = PreflightGlobalStore.state.variables.email || this.generateNewEmail();
    PreflightGlobalStore.state.variables.email = email;
    return email;
  }

  public get generatedAdminEmail(): string{
    let email = PreflightGlobalStore.state.variables.adminEmail || this.generateNewAdminEmail();
    PreflightGlobalStore.state.variables.adminEmail = email;
    return email;
  }

  public generateNewEmail() {
    const email = `${uuidv4().substring(0, 16)}@${PreflightGlobalStore.emailDomain}`;
    return email;
  }

  public generateNewAdminEmail() {
    const email = `${uuidv4().substring(0, 16)}@${PreflightGlobalStore.adminEmailDomain}`;
    return email;
  }

  public async replaceVariables(input: string): Promise<string> {
    const inputVariables = actionVariablesHelper.extractVariablesFromInput(input, this.actionTypeVariables);
    let localValue = input;
    try {
      for (let inputVariable of inputVariables) {
        const {parsedSystemValue, parsedNodeValue} = await actionVariablesHelper.processVariable({
          input: inputVariable,
          actionValue: localValue,
          nodeValue: localValue,
          actionTypeVariables: this.actionTypeVariables
        });
        localValue = parsedNodeValue;
      }
    } catch (e) {
      throw new Error('Resolving variables failed. ' + e.responseText );
    }
    return localValue;
  }

  private generateRandomString(length: number) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    return new Array(length + 1)
      .join('0')
      .replace(/[0]/g, c => chars[crypto.getRandomValues(new Uint8Array(1))[0] % (chars.length - 1)])
      .toString();
  };

  private processVariable = async ({ systemname, displayName, generator, reusable }) => {
    let value = '';
    const haveUsedBefore = this.usedVariables.find(usedV => usedV.systemname === systemname);
    if (reusable || (!reusable && !haveUsedBefore)) {
      do {
        value = await generator();
      } while (this.isValueAlreadyGenerated(systemname, value));
      this.addUsedVariable(systemname, displayName, value);
    } else {
      value = haveUsedBefore.values[0];
    }
    return value;
  };

  private addUsedVariable(systemname, displayName, value) {
    let usedVariable = this.usedVariables.find(uv => uv.systemname == systemname)
    if(!usedVariable){
      this.usedVariables.push({
        systemname: systemname,
        displayName,
        values: [value]
      });
    } else {
      usedVariable.values.push(value);
    }

  }

  private isValueAlreadyGenerated(systemname: string, value: string){
    let usedVals = this.usedVariables.find(uv => uv.systemname == systemname && uv.values && uv.values?.includes(value));
    return usedVals != null && usedVals.length > 0;
  }

  private get actionTypeVariables()
  {
    let varGen = this;
    let actionVars = {
      shuffle: {
        systemname: '{{shuffle}}',
        displayName: '{{shuffle}}',
        hint: 'e.g. x9wj4g',
        reusable: false,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => varGen.generateRandomString(6) });
        },
      },
      timestamp: {
        systemname: '{{timestamp}}',
        displayName: '{{timestamp}}',
        hint: '1587999131',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => Date.now().toString() });
        },
      },
      testResultID: {
        systemname: '{{testResultID}}',
        displayName: '{{testResultID}}',
        hint: 'e.g. vjr3069wjsmx',
        reusable: false,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => varGen.generateRandomString(12) });
        },
      },
      generateEmail: {
        systemname: '{{generate.email}}',
        displayName: 'Email',
        hint: '{{shuffle}}@' + PreflightGlobalStore.emailDomain,
        reusable: false,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => varGen.generatedEmail });
        },
      },
      generateAdminEmail: {
        id: '40',
        systemname: '{{generate.adminEmail}}',
        displayName: 'Admin Email',
        hint: '{{shuffle}}@' + PreflightGlobalStore.emailDomain,
        reusable: false,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => varGen.generatedAdminEmail });
        },
      },
      firstName: {
        systemname: '{{name.firstName}}',
        displayName: 'First Name',
        hint: 'e.g. Peter',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      lastName: {
        systemname: '{{name.lastName}}',
        displayName: 'Last Name',
        hint: 'e.g. Smith',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      phoneNumber: {
        systemname: '{{phone.phoneNumber}}',
        displayName: 'Phone Number',
        hint: 'e.g. (940) 438-7101',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      companyName: {
        systemname: '{{company.companyName}}',
        displayName: 'Company Name',
        hint: 'e.g. Random Inc',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      url: {
        systemname: '{{internet.url}}',
        displayName: 'Web Site',
        hint: 'e.g. mario.com',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      city: {
        systemname: '{{address.city}}',
        displayName: 'City',
        hint: 'Chicago',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      state: {
        systemname: '{{address.state}}',
        displayName: 'State',
        hint: 'Illinois',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      stateAbbr: {
        systemname: '{{address.stateAbbr}}',
        displayName: 'State Abbr',
        hint: 'IL',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      streetAddress: {
        systemname: '{{address.streetAddress}}',
        displayName: 'Street',
        hint: '3672 Josh Falls',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      },
      zipCode: {
        systemname: '{{address.zipCode}}',
        displayName: 'Zip Code',
        hint: '60000',
        reusable: true,
        generate: function() {
          return varGen.processVariable({ ...this, generator: () => fakerService.getFakeData(this.systemname) });
        },
      }
    }
    getFakerVariables(actionVars, this.processVariable);
    return actionVars
  };
}

export default new VariablesProcessor();
