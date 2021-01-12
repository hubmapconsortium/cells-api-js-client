import Client from '../internal';
import { inputTypes, outputTypes, genomicModalities } from '../internal/internal.config';

interface CheckParametersArguments {
  inputType: string;
  outputType: string;
  // inputSet: string[];
  genomicModality: string;
  pValue?: number;
}

it('should not throw an error', () => {
  const testObj: CheckParametersArguments = {
    inputType: 'cell',
    outputType: 'organ',
    // inputSet: [],
    genomicModality: 'fake',
  };
  expect(() => Client.checkParameters(testObj)).not.toThrow();
});

it('should throw an error when output type is not in output types', () => {
  interface FakeCheckParametersArguments {
    inputType: string;
    outputType: string;
    // inputSet: string[];
    genomicModality: string;
    pValue?: number;
  }

  const outputType: string = 'fake';
  const testObj: FakeCheckParametersArguments = {
    inputType: 'cell',
    outputType,
    // inputSet: [],
    genomicModality: 'fake',
  };
  expect(() => Client.checkParameters(testObj)).toThrow(`${outputType} not in ${outputTypes}`);
});

it('should throw an error when input type does correspond to output type', () => {
  const inputType: string = 'protein';
  const outputType: string = 'organ';
  const testObj: CheckParametersArguments = {
    inputType,
    outputType,
    // inputSet: [],
    genomicModality: 'fake',
  };
  expect(() => Client.checkParameters(testObj)).toThrow(`${inputType} not in ${inputTypes[outputType]}`);
});

it('should not throw an error when input type is gene and output type is cell', () => {
  const testObj: CheckParametersArguments = {
    inputType: 'gene',
    outputType: 'cell',
    // inputSet: [],
    genomicModality: 'rna',
  };
  expect(() => Client.checkParameters(testObj)).not.toThrow();
});

it('should throw an error when input type is gene and output type is cell and genomic modality is not rna or atac', () => {
  const genomicModality: string = 'fake';
  const testObj: CheckParametersArguments = {
    inputType: 'gene',
    outputType: 'cell',
    // inputSet: [],
    genomicModality,
  };
  expect(() => Client.checkParameters(testObj)).toThrow(`${genomicModality} not in ${genomicModalities}`);
});

it('should not throw an error when input type is gene and output type is organ and p value within bounds', () => {
  const testObj: CheckParametersArguments = {
    inputType: 'gene',
    outputType: 'cell',
    // inputSet: [],
    genomicModality: 'atac',
    pValue: 0.2,
  };
  expect(() => Client.checkParameters(testObj)).not.toThrow();
});

it('should throw an error when input type is gene and output type is cell and p value is less than 0', () => {
  const pValue: number = -0.1;
  const testObj: CheckParametersArguments = {
    inputType: 'gene',
    outputType: 'organ',
    // inputSet: [],
    genomicModality: 'atac',
    pValue,
  };
  expect(() => Client.checkParameters(testObj)).toThrow(`p_value ${pValue} should be in [0,1]`);
});

it('should throw an error when input type is cell and output type is gene and p value is greater than 0', () => {
  const pValue: number = 1.2;
  const testObj: CheckParametersArguments = {
    inputType: 'organ',
    outputType: 'gene',
    // inputSet: [],
    genomicModality: 'atac',
    pValue,
  };
  expect(() => Client.checkParameters(testObj)).toThrow(`p_value ${pValue} should be in [0,1]`);
});
