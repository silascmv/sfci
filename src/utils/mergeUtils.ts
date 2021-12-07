import * as xml2js from 'xml2js';
import * as fs from 'fs';

// CREATE MAP FUNCTIONS
export function mountMapFieldPermission(file: any) {
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

export function mountMapUserPermission(file: any) {
  var mapUserPermission = new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      for (let usrPerm of json.Profile.userPermissions) {
        /*   console.log(x);*/
        mapUserPermission.set(usrPerm.name.toString(), usrPerm);
      }
    }
  });
  return mapUserPermission;
}

export function mountMapLayoutAssignments(file: any) {
  var mapOfLayoutAssignments = new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      if (json.Profile.layoutAssignments != null) {
        for (let x of json.Profile.layoutAssignments) {
          mapOfLayoutAssignments.set(x.layout.toString(), x);
        }
      }
    }
  });
  return mapOfLayoutAssignments;
}

export function mountCustomMetadataTypeAccesses(file: any) {
  var mapOfCustomMdtAccess = new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      if (json.Profile.customMetadataTypeAccesses != null) {
        for (let obj of json.Profile.customMetadataTypeAccesses) {
          mapOfCustomMdtAccess.set(obj.name.toString(), obj);
        }
      }
    }
  });
  return mapOfCustomMdtAccess;
}

export function mountCustomPermissions(file: any) {
  var mapOfCustomPermission = new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      if (json.Profile.customPermissions != null) {
        for (let obj of json.Profile.customPermissions) {
          mapOfCustomPermission.set(obj.name.toString(), obj);
        }
      }
    }
  });
  return mapOfCustomPermission;
}

export function mountClassAccesses(file: any) {
  var mapOfClassAccesses = new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      if (json.Profile.classAccesses != null) {
        for (let obj of json.Profile.classAccesses) {
          mapOfClassAccesses.set(obj.apexClass.toString(), obj);
        }
      }
    }
  });
  return mapOfClassAccesses;
}

export function mountCustomSettingAccesses(file: any) {
  var mapOfCustomSettings= new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      if (json.Profile.customSettingAccesses != null) {
        for (let obj of json.Profile.customSettingAccesses) {
          mapOfCustomSettings.set(obj.name.toString(), obj);
        }
      }
    }
  });
  return mapOfCustomSettings;
}

// MERGE FUNCTIONS

export function mergeFieldPermissions(mapOfFieldObjTarget: Map<any, any>, mapOfFieldObjSource: Map<any, any>) {
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

export function mergeUserPermissions(mapUserPermissionTarget: Map<any, any>, mapUserPermissionSource: Map<any, any>) {
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
export function mergeLayoutAssignments(mapLayoutAssignmentsTarget: Map<any, any>, mapLayoutAssignmentsSource: Map<any, any>) {
  var arrayLayoutAssigments = new Array();
  for (let layout of mapLayoutAssignmentsSource.keys()) {
    console.log(layout);
    if (mapLayoutAssignmentsTarget.has(layout) == true) {
      var targetLayoutPerm = mapLayoutAssignmentsTarget.get(layout);
      if (targetLayoutPerm.recordType != null && mapLayoutAssignmentsSource.get(layout).recordType == null) {
        delete targetLayoutPerm.recordType;
        arrayLayoutAssigments.push(targetLayoutPerm);
      } else if (targetLayoutPerm.recordType == null && mapLayoutAssignmentsSource.get(layout).recordType != null) {
        targetLayoutPerm.recordType = mapLayoutAssignmentsSource.get(layout).recordType;
        arrayLayoutAssigments.push(targetLayoutPerm);
      } else if (targetLayoutPerm.recordType == null && mapLayoutAssignmentsSource.get(layout).recordType != null) {
        arrayLayoutAssigments.push(targetLayoutPerm);
      } else {
        arrayLayoutAssigments.push(targetLayoutPerm);
      }
    } else {
      arrayLayoutAssigments.push(mapLayoutAssignmentsSource.get(layout.toString()));
    }
  }
  return arrayLayoutAssigments;
}

export function mergeCustomMdtAccesses(mapUserPermissionTarget: Map<any, any>, mapUserPermissionSource: Map<any, any>) {
  var arrayCustomMdtAccesses = new Array();
  for (let name of mapUserPermissionSource.keys()) {
    if (mapUserPermissionTarget.has(name) == true) {
      var targetCustomMdt = mapUserPermissionTarget.get(name);
      targetCustomMdt.enabled = mapUserPermissionSource.get(name).enabled;
      arrayCustomMdtAccesses.push(targetCustomMdt);
    } else {
      arrayCustomMdtAccesses.push(mapUserPermissionSource.get(name.toString()));
    }
  }

  return arrayCustomMdtAccesses;

}

export function mergeCustomPermissions(mapCustomPermissionTarget: Map<any, any>, mapCustomPermissionSource: Map<any, any>) {
  var arrayCustomMdtAccesses = new Array();
  for (let name of mapCustomPermissionSource.keys()) {
    if (mapCustomPermissionTarget.has(name) == true) {
      var targetCustomMdt = mapCustomPermissionTarget.get(name);
      targetCustomMdt.enabled = mapCustomPermissionSource.get(name).enabled;
      arrayCustomMdtAccesses.push(targetCustomMdt);
    } else {
      arrayCustomMdtAccesses.push(mapCustomPermissionSource.get(name.toString()));
    }
  }

  return arrayCustomMdtAccesses;

}

export function mergeClassAccesses(mapClassAccessesTarget: Map<any, any>, mapUserClassAccessesSource: Map<any, any>) {
  var arrayClassAccesses = new Array();
  for (let apexClass of mapUserClassAccessesSource.keys()) {
    if (mapClassAccessesTarget.has(apexClass) == true) {
      var targetClassAccesses = mapClassAccessesTarget.get(apexClass);
      targetClassAccesses.enabled = mapUserClassAccessesSource.get(apexClass).enabled;
      arrayClassAccesses.push(targetClassAccesses);
    } else {
      arrayClassAccesses.push(mapUserClassAccessesSource.get(apexClass.toString()));
    }
  }

  return arrayClassAccesses;

}

export function mergeCustomSettings(mapCustomSettingsTarget: Map<any, any>, mapCustomSettingsSource: Map<any, any>) {
  var arrayCustomSettings = new Array();
  for (let customSettings of mapCustomSettingsSource.keys()) {
    if (mapCustomSettingsTarget.has(customSettings) == true) {
      var targetClassAccesses = mapCustomSettingsTarget.get(customSettings);
      targetClassAccesses.enabled = mapCustomSettingsSource.get(customSettings).enabled;
      arrayCustomSettings.push(targetClassAccesses);
    } else {
      arrayCustomSettings.push(mapCustomSettingsSource.get(customSettings.toString()));
    }
  }

  return arrayCustomSettings;

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
  var builder = new xml2js.Builder({ renderOpts: { pretty: true, 'indent': '    ', 'newline': '\n' } });
  var xml = builder.buildObject(sourceFile);
  fs.writeFileSync(targetFolder + '/' + fileName, xml);
}


export function convertFile(file: any) {
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