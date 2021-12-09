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
  var mapOfCustomSettings = new Map();
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
export function mountApplicationVisibilities(file: any) {
  var mapOfApplicationVisibilities = new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      if (json.Profile.applicationVisibilities != null) {
        for (let obj of json.Profile.applicationVisibilities) {
          mapOfApplicationVisibilities.set(obj.application.toString(), obj);
        }
      }
    }
  });
  return mapOfApplicationVisibilities;
}

export function mountObjectPermissions(file: any) {
  var mapOfObjPermissions = new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      if (json.Profile.objectPermissions != null) {
        for (let obj of json.Profile.objectPermissions) {
          mapOfObjPermissions.set(obj.object.toString(), obj);
        }
      }
    }
  });
  return mapOfObjPermissions;
}

export function mountLoginFlows(file: any) {
  var mapOfLoginFlows = new Map();
  xml2js.parseString(file, (err: Error, result: any) => {
    if (err) {
      console.log(err);
    } else {
      var json = result;
      if (json.Profile.loginFlows != null) {
        for (let obj of json.Profile.loginFlows) {
          mapOfLoginFlows.set(obj.friendlyName.toString(), obj);
        }
      }
    }
  });
  return mapOfLoginFlows;
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

export function mergeApplicationVisibilities(mapAppVisibilitiesTarget: Map<any, any>, mapAppVisibilitiesSource: Map<any, any>) {
  var arrayAppVisibilities = new Array();
  for (let appVisibilities of mapAppVisibilitiesSource.keys()) {
    if (mapAppVisibilitiesTarget.has(appVisibilities) == true) {
      var app = mapAppVisibilitiesTarget.get(appVisibilities);
      app.default = mapAppVisibilitiesSource.get(appVisibilities).default;
      app.visible = mapAppVisibilitiesSource.get(appVisibilities).visible;
      arrayAppVisibilities.push(app);
    } else {
      arrayAppVisibilities.push(mapAppVisibilitiesSource.get(appVisibilities.toString()));
    }
  }

  return arrayAppVisibilities;

}

export function mergeObjectPermissions(mapObjPermTarget: Map<any, any>, mapObjPermSource: Map<any, any>) {
  var arrayObjPermissions = new Array();
  for (let objtPermission of mapObjPermSource.keys()) {
    if (mapObjPermTarget.has(objtPermission) == true) {
      var objtTarget = mapObjPermTarget.get(objtPermission);
      objtTarget.allowCreate = mapObjPermSource.get(objtPermission).allowCreate;
      objtTarget.allowDelete = mapObjPermSource.get(objtPermission).allowDelete;
      objtTarget.allowEdit = mapObjPermSource.get(objtPermission).allowEdit;
      objtTarget.allowRead = mapObjPermSource.get(objtPermission).allowRead;
      objtTarget.modifyAllRecords = mapObjPermSource.get(objtPermission).modifyAllRecords;
      objtTarget.viewAllRecords = mapObjPermSource.get(objtPermission).viewAllRecords;
      arrayObjPermissions.push(objtTarget);
    } else {
      arrayObjPermissions.push(mapObjPermSource.get(objtPermission.toString()));
    }
  }

  return arrayObjPermissions;

}
// SPECIFIC INFORMATIONS ( OBTAIN CHANGES ONLY IN THE SAME TYPE) - IF CHANGE TYPE, IS NEEDLY MANUAL ACTIONS
export function mergeLoginFlows(mapLoginFlowsTarget: Map<any, any>, mapLoginFlowsSource: Map<any, any>) {
  var arrayLoginFlows = new Array();
  for (let loginFlows of mapLoginFlowsSource.keys()) {
    if (mapLoginFlowsTarget.has(loginFlows) == true) {
      var loginFlowsObj = mapLoginFlowsTarget.get(loginFlows);
      if (mapLoginFlowsTarget.get(loginFlows).uiLoginFlowType.toString() == mapLoginFlowsSource.get(loginFlows).uiLoginFlowType.toString()) {
        
        if (loginFlowsObj.uiLoginFlowType == 'VisualForce') {
          loginFlowsObj.vfFlowPage = mapLoginFlowsSource.get(loginFlows).vfFlowPage;
          loginFlowsObj.vfFlowPageTitle = mapLoginFlowsSource.get(loginFlows).vfFlowPageTitle;
          loginFlowsObj.useLightningRuntime = mapLoginFlowsSource.get(loginFlows).useLightningRuntime;

        } else if (loginFlowsObj.uiLoginFlowType == 'VisualWorkflow') {
          loginFlowsObj.flow = mapLoginFlowsSource.get(loginFlows).flow;
          loginFlowsObj.useLightningRuntime = mapLoginFlowsSource.get(loginFlows).useLightningRuntime;

        }
      } 

      arrayLoginFlows.push(loginFlowsObj);

    } else {

      arrayLoginFlows.push(mapLoginFlowsSource.get(loginFlows.toString()));

    }
  }

  return arrayLoginFlows;

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