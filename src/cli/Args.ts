import yargs from 'yargs';

export interface Args {
  outputDirectory: string;
  featuresDirectory: string;
  relativePathToFeatures: string;
}

export const args: Args = yargs
  .alias('h', 'help')
  .help('h')
  .showHelpOnFail(true)
  .alias('o', 'outputDirectory')
  .string('outputDirectory')
  .alias('f', 'featuresDirectory')
  .string('featuresDirectory')
  .string('relativePathToFeatures').argv as Args;
