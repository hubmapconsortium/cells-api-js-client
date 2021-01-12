import { InputTypes } from './internal.types';

const outputTypes: string[] = ['cell', 'organ', 'gene', 'cluster'];

const inputTypes: InputTypes = {
  // Allowed input types vary depending on output type
  cell: ['gene', 'organ', 'protein', 'dataset'],
  organ: ['cell', 'gene'],
  gene: ['organ', 'cluster'],
  cluster: ['gene'],
};

const genomicModalities: string[] = ['rna', 'atac']; // Used for quantitative gene->cell queries

export { outputTypes, inputTypes, genomicModalities };
