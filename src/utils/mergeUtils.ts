import * as xml2js from 'xml2js';
import * as fs from 'fs';
// CREATE MAP FUNCTIONS

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

export function mountMapLayoutAssignments(file: any){
    var mapOfFieldPerm = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        console.log(err);
      } else {
        var json = result;
/*         console.log('mountMapLayoutAssignments',json.Profile.layoutAssignments);
 */        if(json.Profile.layoutAssignments != null){
          for (let x of json.Profile.layoutAssignments) {
            mapOfFieldPerm.set(x.layout.toString(), x);
          }
        }
      }
    });
    return mapOfFieldPerm;
}

// MERGE FUNCTIONS

export function mergeFieldPermissions(mapOfFieldObjTarget: Map<any,any>,mapOfFieldObjSource: Map<any,any>){
  var arrayFieldPermission = new Array();
  for (let field of mapOfFieldObjSource.keys()) {
    if (mapOfFieldObjTarget.has(field) == true) {
      var targetField = mapOfFieldObjTarget.get(field);
      targetField.editable = mapOfFieldObjSource.get(field).editable;
      targetField.readable = mapOfFieldObjTarget.get(field).readable;
      arrayFieldPermission.push(targetField);
    } else {
      arrayFieldPermission.push(mapOfFieldObjSource.get(field.toString()));
    }
  }

  return arrayFieldPermission;

}

export function mergeUserPermissions(mapUserPermissionTarget: Map<any,any>,mapUserPermissionSource: Map<any,any>){
  var arrayUserPermission = new Array();
  for (let field of mapUserPermissionSource.keys()) {
    if (mapUserPermissionTarget.has(field) == true) {
      var targetUsrPerm = mapUserPermissionTarget.get(field);
      targetUsrPerm.enabled = mapUserPermissionSource.get(field).enabled;
      arrayUserPermission.push(targetUsrPerm);
    } else {
      arrayUserPermission.push(mapUserPermissionSource.get(field.toString()));
    }
  }

  return arrayUserPermission;

}

// SPECIFIC INFORMATIONS ( CASE THE TARGET FILE HAS THE PERMISSION, ONLY VERIFIY IF CHANGE RECORDTYPE)
export function mergeLayoutAssignments(mapLayoutAssignmentsTarget: Map<any,any>,mapLayoutAssignmentsSource: Map<any,any>){
  var arrayLayoutAssigments = new Array();
  console.log( mapLayoutAssignmentsSource.keys());
  for (let field of mapLayoutAssignmentsSource.keys()) {
    if (mapLayoutAssignmentsTarget.has(field) == true) {
      var targetLayoutPerm = mapLayoutAssignmentsTarget.get(field);
      targetLayoutPerm.recordType = mapLayoutAssignmentsSource.get(field).recordType != mapLayoutAssignmentsTarget.get(field).recordType? 
                                    mapLayoutAssignmentsSource.get(field).recordType :  mapLayoutAssignmentsTarget.get(field).recordType ;
      arrayLayoutAssigments.push(targetLayoutPerm);
    } else {
      arrayLayoutAssigments.push(mapLayoutAssignmentsSource.get(field.toString()));
    }
  }
  return arrayLayoutAssigments;
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

export function writeChanges(sourceFile: any, targetFolder: any, fileName: any){
    var builder = new xml2js.Builder({ renderOpts: { pretty: true, 'indent': '    ', 'newline': '\n' } });
    var xml = builder.buildObject(sourceFile);
    fs.writeFileSync(targetFolder + '/' + fileName, xml);
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

// AUXILIARY FUNCTIONS

const isIterable = (value: any) => {
  return Symbol.iterator in Object(value);
}