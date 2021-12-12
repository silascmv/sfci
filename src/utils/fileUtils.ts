import * as xml2js from 'xml2js';
import * as fs from 'fs';
const logger = require('./logUtils');

//DTO
class Profile {
  Profile: any;
}
// FILES FUNCTIONS
export function getFilesInFolders(folder: string) {
  let allFilesInDir = new Map(fs.readdirSync(folder, 'utf8').entries());
  let mapRetorno = new Map();
  for (let entry of allFilesInDir.values()) {
    mapRetorno.set(entry, fs.readFileSync(folder + '/' + entry, { encoding: 'utf8', flag: 'r' }));
  }
  return mapRetorno;
}


export function moveFilesToTarget(fileName: string, source: string, target: string) {
  fs.copyFileSync(process.cwd() + '/' + source + '/' + fileName, process.cwd() + '/' + target + '/' + fileName);
}

export function writeChanges(sourceFile: any, targetFolder: any, fileName: any) {
  var builder = new xml2js.Builder({
    xmldec: {
      version: '1.0',
      encoding: 'UTF-8',
      standalone: undefined
    }, renderOpts: {
      pretty: true,
      indent: '    ',
      newline: '\n'
    }
  });
  var xml = builder.buildObject(sourceFile);
  fs.writeFileSync(targetFolder + '/' + fileName, xml);
}

export function convertFile(file: any) {
  var resultado = new Profile();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      logger.error(err.message);
      throw err.message.toString();
    } else {
      resultado = result;
    }
  });

  return resultado;

}

const isIterable = (value: any) => {
  return Symbol.iterator in Object(value);
}