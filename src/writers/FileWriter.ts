import { Writer } from './Writer';
import * as path from 'path';
import { existsSync, mkdir, writeFile } from 'fs';

export class FileWriter implements Writer {
  constructor(
    private readonly maintainStructure: boolean,
    private readonly outputDirectory: string,
    private readonly includeDirectory: boolean = false
  ) {}

  public async write(file: string, content: string): Promise<false | string> {
    let outFile = path.join(this.outputDirectory, file);
    if (existsSync(outFile)) {
      return false;
    }
    let directory = outFile.substr(0, outFile.lastIndexOf(path.sep));
    if (this.includeDirectory) {
      const fn = file.match(/(^|\/)([^\/]*)\.features?$/)?.[2]!;
      directory = path.join(directory, fn);
      outFile = path.join(directory, 'Steps.ts');
    } else {
      outFile = outFile.replace(/\.features?$/, '.spec.ts');
    }
    await new Promise((resolve, reject) => {
      if (!existsSync(directory)) {
        mkdir(directory, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else resolve();
    });
    await new Promise((resolve, reject) =>
      writeFile(outFile, content, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    );
    return outFile.replace(this.outputDirectory, '');
  }
}
