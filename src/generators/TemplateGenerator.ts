import { Generator, Options as BaseOptions } from './Generator';
import { Parser } from '../files/Parser';
import { TemplateFeatureProcessor } from './TemplateFeatureProcessor';

type Options = BaseOptions & {
  variables: {
    relativePathToFeatures: string;
    [K: string]: any;
  };
  templateDirectory?: string;
};

export class TemplateGenerator extends Generator {
  private readonly variables: Record<string, any>;
  private readonly templateDirectory: string;

  constructor(template: string, options: Options) {
    const { variables, templateDirectory, ...base } = options;
    super(base);
    this.variables = variables;
    this.templateDirectory = templateDirectory || process.cwd();
  }

  public async generate(): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    const featureFiles = await this.scanner.scan();
    for (let f of featureFiles.relative) {
      const doc = await this.parser.parse(f);
      const features = Parser.toFeatures(doc);
      for (let feature of features) {
        result[f] = await TemplateFeatureProcessor.processFeature(feature, {
          variables: this.variables,
          templateDirectory: this.templateDirectory,
          maintainStructure: !!this.maintainStructure,
          outputDirectory: this.outputDirectory,
          featureFile: f,
        });
      }
    }
    return result;
  }
}
