import {VariableParamEntity} from "../enums/VariableParamsEntity";
import variablesProcessor from "./variablesProcessor";

const escapeRegex = (input: string) => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const extractVariablesFromInput = (input: string, actionTypeVariables) => {
  const systemnameList = Object.values(actionTypeVariables).map((v: any) => v.systemname);
  const result = input.match(/\{{2}.*?\}{2}/g) || [];
  return result.filter(match => {
    return systemnameList.includes(getPureSystemname(match) || isCheckpointVariable(match));
  });
};

const getPureSystemname = (input: string) => {
  return getSystemnameWithoutParams(getSystemnameWithoutIndex(input));
};

const getSystemnameWithoutIndex = (input: string) => {
  return input.replace(/(\[\d*\]){0,1}/g, '');
};

const getSystemnameWithoutParams = (input: string) => {
  return input.replace(/(\(.*\)){0,1}/g, '');
};

const getVariableParams = (input: string) => {
  if (isCheckpointVariable(input)) return [];
  return input.match(/\{{2}.*?\((?<params>.*)\).*?\}{2}/)?.groups?.params?.split(',') || [];
};

const getVariableObject = (systemname: string, actionTypeVariables) => {
  return Object.values(actionTypeVariables).find((v: any) => v.systemname === getPureSystemname(systemname));
};

const isReusable = (obj: any) => {
  return !!obj?.reusable;
};

const getUsedVariableObject = (value: string) => {
  return variablesProcessor.usedVariables.find(({ systemname }) => value === systemname);
};

const isCheckpointVariable = (value: string) => null;

const getCheckpointVariable = (systemname: string) => {
  return null
  // const variable = store.getters.checkpointVariables.find(v => v.systemname === systemname);
  // return variable ? variable.value : null;
};

const processNotIndexedVariable = async ({
  variableObj,
  input,
  actionValue,
  nodeValue,
  variableParams,
}: {
  variableObj: any;
  input: string;
  actionValue: string;
  nodeValue: string;
  variableParams: string[];
}) => {
  setVariableParamsFromManualInput(variableObj, variableParams);
  const newValue = await generateVariableValue(variableObj);
  const parsedSystemValue = actionValue.replace(input, getSystemnameWithoutIndex(input));
  const parsedNodeValue = nodeValue.replace(input, newValue);
  return {
    parsedSystemValue,
    parsedNodeValue,
  };
};

const setVariableParamsFromManualInput = (variableObj: object, variableParams: string[]) => {
  // @ts-ignore
  variableParams.forEach((p, index) => (variableObj.params.options[index].value = p));
};

const getVariableIndexFromSystemname = (variable: string) => {
  const index = variable.match(/\{{2}.*?\[(?<index>\d*)\].*?\}{2}/)?.groups?.index;
  if (index !== null && index !== undefined && !isNaN(parseInt(index))) {
    return parseInt(index);
  }
};

const isVariableIndexValid = (value: any) => {
  return !isNaN(parseInt(value));
};

const processVariable = async ({ input, actionValue, nodeValue, actionTypeVariables }: { input: string; actionValue: string; nodeValue: string, actionTypeVariables }) => {
  const variableIndex = getVariableIndexFromSystemname(input);
  const systemnameWithoutIndex = getPureSystemname(input);
  const variableObj: any = getVariableObject(systemnameWithoutIndex, actionTypeVariables);
  const variableParams = getVariableParams(input);
  if (isCheckpointVariable(systemnameWithoutIndex)) {
    return processCheckpointVariable({ actionValue, input, nodeValue });
  }
  if (isVariableIndexValid(variableIndex)) {
    return processIndexedVariable({ variableObj, actionValue, input, nodeValue, variableIndex: variableIndex || 0 });
  }
  return processNotIndexedVariable({ variableObj, actionValue, input, nodeValue, variableParams });
};

const processIndexedVariable = async ({
  variableObj,
  input,
  variableIndex,
  actionValue,
  nodeValue,
}: {
  variableObj: any;
  input: string;
  variableIndex: number;
  actionValue: string;
  nodeValue: string;
}) => {
  let usedVariableObj = getUsedVariableObject(variableObj.systemname);
  let localActionValue = actionValue;
  let parsedNodeValue = '';
  const usedValue = usedVariableObj?.values?.[variableIndex - 1];
  if (usedValue) {
    parsedNodeValue = nodeValue.replace(input, usedValue);
  } else {
    const generatedValue = await variableObj.generate();
    const fixedInputVariable = input.replace(/(\[\d*\])?(\}{2})/, `$2`);
    localActionValue = actionValue.replace(new RegExp(escapeRegex(input), 'g'), fixedInputVariable);
    parsedNodeValue = nodeValue.replace(fixedInputVariable, generatedValue);
  }
  return {
    parsedSystemValue: localActionValue,
    parsedNodeValue,
  };
};

const processCheckpointVariable = async ({ input, actionValue, nodeValue }: { input: string; actionValue: string; nodeValue: string }) => {
  const newValue = getCheckpointVariable(input);
  const parsedNodeValue = nodeValue.replace(input, newValue);
  return {
    parsedSystemValue: actionValue,
    parsedNodeValue,
  };
};

const mapVariableParams = (param: VariableParamEntity) => {
  if (param.paramType === 'list') {
    const values = param.options.filter(v => v.value || v.defaultValue).map(v => v.value);
    return values.length ? values : undefined;
  } else if (param.paramType === 'object') {
    const values = Object.fromEntries(param.options.filter(o => o.value || o.defaultValue).map(o => [o.key, o.value]));
    return Object.values(values).length ? values : undefined;
  }
  return [];
};

const generateVariableValue = async (variableObj: any) => {
  if (!variableObj.generate) return '';
  let params: any;
  if (variableObj.params) {
    params = mapVariableParams(variableObj.params);
    params = params ? JSON.parse(JSON.stringify(params)) : undefined;
    variableObj.params.options.forEach(o => (o.value = ''));
  }
  return variableObj.generate(params);
};

const isValueAlreadyGenerated = (systemname: string, value: string) => {
  const obj = getUsedVariableObject(systemname);
  return obj?.values?.includes(value);
};

export default {
  extractVariablesFromInput,
  getSystemnameWithoutIndex,
  getVariableObject,
  isReusable,
  processVariable,
  processIndexedVariable,
  getUsedVariableObject,
  getVariableIndexFromSystemname,
  //setVariableIndex,
  generateVariableValue,
  isValueAlreadyGenerated,
};
