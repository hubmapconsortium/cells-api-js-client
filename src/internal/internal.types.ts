interface InputTypes {
  cell: string[];
  organ: string[];
  gene: string[];
  cluster: string[];
}

interface CheckParametersTypes {
  inputType: string;
  outputType: keyof InputTypes;
  // inputSet: string[];
  genomicModality: string;
  pValue?: number;
}

export { InputTypes, CheckParametersTypes };
