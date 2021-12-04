import * as xml2js from 'xml2js';
import * as fs from 'fs';


export function mountMapFieldPermission (file: any){
   
    var mapOfFieldPerm = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        console.log(err);
      } else {
        var json = result;
        for (let x of json.Profile.fieldPermissions) {
          /*   console.log(x);*/
          mapOfFieldPerm.set(x.field.toString(), x);
        }
      }
    });
    return mapOfFieldPerm;

}

export function convertFile(file: any){
    var resultado;
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        console.log(err);
      } else {
        resultado = result;
      }
    });
    return resultado;
}

export function mountMapUserPermission(file: any){

    var mapOfFieldPerm = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        console.log(err);
      } else {
        var json = result;
        for (let x of json.Profile.userPermissions) {
          /*   console.log(x);*/
          mapOfFieldPerm.set(x.name.toString(), x);
        }
      }
    });

    return mapOfFieldPerm;

}

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

export function writeChanges(sourceFile: any, targetFolder: any, fileName: any){
    
    //WRITE CHANGES
    var builder = new xml2js.Builder({ renderOpts: { pretty: true, 'indent': '    ', 'newline': '\n' } });
    var xml = builder.buildObject(sourceFile);

    fs.writeFileSync(targetFolder + '/' + fileName, xml);
}

export function mergeFieldPermissions(mapOfFieldObjTarget: Map<any,any>,mapOfFieldObjSource: Map<any,any>){
  var arrayFieldPermission = new Array();
  for (let field of mapOfFieldObjSource.keys()) {
    if (mapOfFieldObjTarget.has(field) == true) {
      var targetField = mapOfFieldObjTarget.get(field);
      targetField.editable = mapOfFieldObjSource.get(field).editable;
      targetField.readable = mapOfFieldObjTarget.get(field).readable;
      arrayFieldPermission.push(targetField);
    } else {
      var newFieldPermission = mapOfFieldObjSource.get(field.toString());
      arrayFieldPermission.push(newFieldPermission);
    }
  }

  return arrayFieldPermission;

}