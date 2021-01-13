import { CheckParametersTypes, RequestObjectTypes } from './internal.types';
import { outputTypes, inputTypes, genomicModalities } from './internal.config';

class Client {
  baseUrl: string;

  constructor(baseUrl: string) {
    // https://cells.dev.hubmapconsortium.org/api/'
    this.baseUrl = baseUrl;
  }

  static checkParameters({
    inputType,
    outputType,
    // inputSet,
    genomicModality,
    pValue = 0.05,
  }: CheckParametersTypes): void {
    if (!outputTypes.includes(outputType)) {
      throw new Error(`${outputType} not in ${outputTypes}`);
    }

    if (!inputTypes[outputType].includes(inputType)) {
      throw new Error(`${inputType} not in ${inputTypes[outputType]}`);
    }

    if (inputType === 'gene' && outputType === 'cell' && !genomicModalities.includes(genomicModality)) {
      throw new Error(`${genomicModality} not in ${genomicModalities}`);
    }

    if (
      (((inputType === 'organ' && outputType === 'gene') || (inputType === 'gene' && outputType === 'organ')) &&
        pValue < 0) ||
      pValue > 1
    ) {
      throw new Error(`p_value ${pValue} should be in [0,1]`);
    }
  }

  static fillRequestObject({
    inputType,
    outputType,
    inputSet,
    genomicModality,
    pValue,
  }: CheckParametersTypes): RequestObjectTypes {
    const requestObject = { input_type: inputType, input_set: inputSet };

    if (['organ', 'gene'].includes(inputType) && outputType === 'gene') {
      requestObject.p_value = pValue;
    }

    if (genomicModality) {
      requestObject.genomic_modality = genomicModality;
    }

    requestObject.logical_operator = 'and';
    return requestObject;
  }
  /*
  hubmapQuery() {}

  setIntersection() {}

  setUnion() {}

  setDifference() {}

  operation() {}

  checkDetailParameters() {}

  setCount() {}

  setListEvaluation() {}

  setDetailEvaluation() {}
  */
}

export default Client;
