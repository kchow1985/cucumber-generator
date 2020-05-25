import yargs from 'yargs';

export interface Args {
  outputDirectory: string;
  featuresDirectory: string;
  templatesDirectory?: string;
  output: 'file' | 'stdio';
  relativePathToFeatures: string;
  template: 'jest-cucumber' | 'cypress-cucumber-preprocessor';
  verbose: boolean;
  maintainStructure: boolean;
}

export const args: Args = yargs
  .completion()
  .choices('output', ['stdio', 'file'])
  .alias('h', 'help')
  .help('h')
  .showHelpOnFail(true)
  .alias('o', 'outputDirectory')
  .string('outputDirectory')
  .alias('f', 'featuresDirectory')
  .string('featuresDirectory')
  .string('relativePathToFeatures')
  .string('templatesDirectory')
  .default('templatesDirectory', undefined)
  .string('template')
  .default('template', 'jest-cucumber')
  .default('relativePathToFeatures', './')
  .boolean('verbose')
  .boolean('maintainStructure')
  .default('maintainStructure', true)
  .default('verbose', false)
  .demandOption('output')
  .demandOption('featuresDirectory').argv as Args;
