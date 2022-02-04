import {toSentenceCase} from "./globalHelpers";
import {VariableParamEntity} from "../enums/VariableParamsEntity";
import * as faker from 'faker';

const variableParams: Record<string, VariableParamEntity> = {
  '{{random.alpha}}': {
    paramType: 'object',
    options: [
      {
        label: 'Length',
        type: 'input',
        key: 'count',
        value: '',
      },
    ],
  },
  '{{random.number}}': {
    paramType: 'object',
    options: [
      {
        label: 'Min',
        type: 'input',
        key: 'min',
        value: '',
        defaultValue: 1,
      },
      {
        label: 'Max',
        type: 'input',
        key: 'max',
        value: '',
      },
    ],
  },
  '{{random.alphaNumeric}}': {
    paramType: 'list',
    options: [
      {
        label: 'Length',
        type: 'input',
        value: '',
      },
    ],
  },
};

const allowedFakerVariableTypes = [
  'address',
  'animal',
  'commerce',
  'company',
  'database',
  'datatype',
  'date',
  'finance',
  'git',
  'hacker',
  'helpers',
  'image',
  'internet',
  'lorem',
  // 'mersenne', // has some required params
  'music',
  'name',
  'phone',
  'random',
  'system',
  'time',
  'unique',
  'vehicle',
];

export const getFakerVariables = (target, processor) => {
  Object.entries(faker).forEach(([parentKey, parentValue]) => {
    if (allowedFakerVariableTypes.includes(parentKey) && typeof parentValue === 'object') {
      Object.entries(parentValue || {}).forEach(([childKey, childValue]) => {
        if (typeof childValue === 'function') {
          const systemname = `{{${parentKey}.${childKey}}}`;
          const displayName = `${toSentenceCase(childKey)}`;
          target[systemname] = {
            systemname: systemname,
            displayName: displayName,
            reusable: true,
            params: variableParams[systemname],
            generate: function(...args) {
              return processor({
                ...this,
                generator: () => faker[parentKey][childKey](...args),
              });
            },
          };
        }
      });
    }
  });
};
