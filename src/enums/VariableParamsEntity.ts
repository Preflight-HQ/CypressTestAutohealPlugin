export interface VariableParamEntity {
  paramType: 'object' | 'list';
  options: {
    label: string;
    type: 'input';
    key?: string;
    value: string;
    defaultValue?: number | string;
  }[];
}

export type VariableParamsEntity = Record<string, VariableParamEntity>;
