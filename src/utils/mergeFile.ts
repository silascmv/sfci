import * as xml2js from 'xml2js';
const logger = require('./logUtils');


export default class MergeFile {
    fileName;
    constructor(fileName: string) {
      this.fileName = fileName;
    }

    // CREATE MAP FUNCTIONS
 mountMapFieldPermission(file: any) {
    var mapOfFieldPerm = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.fieldPermissions != null) {
          for (let x of json.Profile.fieldPermissions) {
            if (x.field != null) {
              mapOfFieldPerm.set(x.field.toString(), x);
            }
          }
        }
      }
    });
    return mapOfFieldPerm;
  }
  
   mountMapUserPermission(file: any) {
    var mapUserPermission = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.userPermissions != null) {
          for (let usrPerm of json.Profile.userPermissions) {
            if (usrPerm.name != null) {
              mapUserPermission.set(usrPerm.name.toString(), usrPerm);
            }
          }
        }
      }
    });
    return mapUserPermission;
  }
  
   mountMapLayoutAssignments(file: any) {
    var mapOfLayoutAssignments = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.layoutAssignments != null) {
          for (let x of json.Profile.layoutAssignments) {
            if (x.layout != null) {
              mapOfLayoutAssignments.set(x.layout.toString(), x);
            }
          }
        }
      }
    });
    return mapOfLayoutAssignments;
  }
  
   mountCustomMetadataTypeAccesses(file: any) {
    var mapOfCustomMdtAccess = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.customMetadataTypeAccesses != null) {
          for (let obj of json.Profile.customMetadataTypeAccesses) {
            if (obj.name != null) {
              mapOfCustomMdtAccess.set(obj.name.toString(), obj);
            }
          }
        }
      }
    });
    return mapOfCustomMdtAccess;
  }
  
   mountCustomPermissions(file: any) {
    var mapOfCustomPermission = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.customPermissions != null) {
          for (let obj of json.Profile.customPermissions) {
            if (obj.name != null) {
              mapOfCustomPermission.set(obj.name.toString(), obj);
            }
          }
        }
      }
    });
    return mapOfCustomPermission;
  }
  
   mountClassAccesses(file: any) {
    var mapOfClassAccesses = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.classAccesses != null) {
          for (let obj of json.Profile.classAccesses) {
            if (obj.apexClass != null) {
              mapOfClassAccesses.set(obj.apexClass.toString(), obj);
            }
          }
        }
      }
    });
    return mapOfClassAccesses;
  }
  
   mountCustomSettingAccesses(file: any) {
    var mapOfCustomSettings = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.customSettingAccesses != null) {
          for (let obj of json.Profile.customSettingAccesses) {
            if (obj.name != null) {
              mapOfCustomSettings.set(obj.name.toString(), obj);
            }
          }
        }
      }
    });
    return mapOfCustomSettings;
  
  
  }
   mountApplicationVisibilities(file: any) {
    var mapOfApplicationVisibilities = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.applicationVisibilities != null) {
          for (let obj of json.Profile.applicationVisibilities) {
            if (obj.application != null) {
              mapOfApplicationVisibilities.set(obj.application.toString(), obj);
            }
          }
        }
      }
    });
    return mapOfApplicationVisibilities;
  }
  
   mountObjectPermissions(file: any) {
    var mapOfObjPermissions = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.objectPermissions != null) {
          for (let obj of json.Profile.objectPermissions) {
            if (obj.object != null) {
              mapOfObjPermissions.set(obj.object.toString(), obj);
            }
          }
        }
      }
    });
    return mapOfObjPermissions;
  }
  
   mountLoginFlows(file: any) {
    var mapOfLoginFlows = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.loginFlows != null) {
          for (let obj of json.Profile.loginFlows) {
            if (obj.friendlyName) {
              mapOfLoginFlows.set(obj.friendlyName.toString(), obj);
            }
          }
        }
      }
    });
    return mapOfLoginFlows;
  }
  
   mountPageAccess(file: any) {
    var mapOfLoginFlows = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = "File --> " + this.fileName + "\n"  + err.message 
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.pageAccesses != null) {
          for (let page of json.Profile.pageAccesses) {
            if (page.apexPage != null) {
              mapOfLoginFlows.set(page.apexPage.toString(), page);
            }
          }
        }
      }
    });
    return mapOfLoginFlows;
  }
  
  // MERGE FUNCTIONS
  
   mergeFieldPermissions(mapOfFieldObjTarget: Map<any, any>, mapOfFieldObjSource: Map<any, any>) {
    var arrayFieldPermission = new Array();
  
    for (let field of mapOfFieldObjTarget.keys()) {
      if (mapOfFieldObjSource.has(field) == true) {
        var targetField = mapOfFieldObjTarget.get(field);
        targetField.editable = mapOfFieldObjSource.get(field).editable;
        targetField.readable = mapOfFieldObjSource.get(field).readable;
        arrayFieldPermission.push(targetField);
      } else {
        arrayFieldPermission.push(mapOfFieldObjTarget.get(field));
      }
    }
  
    for (let field of mapOfFieldObjSource.keys()) {
      if (mapOfFieldObjTarget.has(field) == true) {
        continue;
      } else {
        arrayFieldPermission.push(mapOfFieldObjSource.get(field));
      }
    }
    return arrayFieldPermission;
  
  }
  
   mergeUserPermissions(mapUserPermissionTarget: Map<any, any>, mapUserPermissionSource: Map<any, any>) {
    var arrayUserPermission = new Array();
    for (let userPermission of mapUserPermissionTarget.keys()) {
      if (mapUserPermissionSource.has(userPermission) == true) {
        var targetUsrPerm = mapUserPermissionTarget.get(userPermission);
        targetUsrPerm.enabled = mapUserPermissionSource.get(userPermission).enabled;
        arrayUserPermission.push(targetUsrPerm);
      } else {
        arrayUserPermission.push(mapUserPermissionTarget.get(userPermission));
      }
    }
  
    for (let field of mapUserPermissionSource.keys()) {
      if (mapUserPermissionTarget.has(field) == true) {
        continue;
      } else {
        arrayUserPermission.push(mapUserPermissionSource.get(field));
      }
    }
  
  
    return arrayUserPermission;
  
  }
  
  // SPECIFIC INFORMATIONS ( CASE THE TARGET FILE HAS THE PERMISSION, ONLY VERIFIY IF CHANGE RECORDTYPE)
   mergeLayoutAssignments(mapLayoutAssignmentsTarget: Map<any, any>, mapLayoutAssignmentsSource: Map<any, any>) {
    var arrayLayoutAssigments = new Array();
    for (let layout of mapLayoutAssignmentsTarget.keys()) {
      if (mapLayoutAssignmentsSource.has(layout) == true) {
        var targetLayoutPerm = mapLayoutAssignmentsTarget.get(layout);
        if (targetLayoutPerm.recordType != null && mapLayoutAssignmentsSource.get(layout).recordType == null) {
          delete targetLayoutPerm.recordType;
          arrayLayoutAssigments.push(targetLayoutPerm);
        } else if (targetLayoutPerm.recordType == null && mapLayoutAssignmentsSource.get(layout).recordType != null) {
          targetLayoutPerm.recordType = mapLayoutAssignmentsSource.get(layout).recordType;
          arrayLayoutAssigments.push(targetLayoutPerm);
        } else {
          arrayLayoutAssigments.push(targetLayoutPerm);
        }
      } else {
        arrayLayoutAssigments.push(mapLayoutAssignmentsTarget.get(layout));
      }
    }
  
    for (let field of mapLayoutAssignmentsSource.keys()) {
      if (mapLayoutAssignmentsTarget.has(field) == true) {
        continue;
      } else {
        arrayLayoutAssigments.push(mapLayoutAssignmentsSource.get(field));
      }
    }
    return arrayLayoutAssigments;
  }
  
   mergeCustomMdtAccesses(mapUserPermissionTarget: Map<any, any>, mapUserPermissionSource: Map<any, any>) {
    var arrayCustomMdtAccesses = new Array();
    for (let name of mapUserPermissionTarget.keys()) {
      if (mapUserPermissionSource.has(name) == true) {
        var targetCustomMdt = mapUserPermissionTarget.get(name);
        targetCustomMdt.enabled = mapUserPermissionSource.get(name).enabled;
        arrayCustomMdtAccesses.push(targetCustomMdt);
      } else {
        arrayCustomMdtAccesses.push(mapUserPermissionTarget.get(name));
      }
    }
  
    for (let name of mapUserPermissionSource.keys()) {
      if (mapUserPermissionTarget.has(name) == true) {
        continue;
      } else {
        arrayCustomMdtAccesses.push(mapUserPermissionSource.get(name));
      }
    }
  
    return arrayCustomMdtAccesses;
  
  }
  
   mergeCustomPermissions(mapCustomPermissionTarget: Map<any, any>, mapCustomPermissionSource: Map<any, any>) {
    var arrayCustomPermission = new Array();
    
    for (let name of mapCustomPermissionTarget.keys()) {
      if (mapCustomPermissionSource.has(name) == true) {
        var targetCustomMdt = mapCustomPermissionTarget.get(name);
        targetCustomMdt.enabled = mapCustomPermissionSource.get(name).enabled;
        arrayCustomPermission.push(targetCustomMdt);
      } else {
        arrayCustomPermission.push(mapCustomPermissionTarget.get(name));
      }
    }
  
    for (let name of mapCustomPermissionSource.keys()) {
      if (mapCustomPermissionTarget.has(name) == true) {
        continue;
      } else {
        arrayCustomPermission.push(mapCustomPermissionSource.get(name));
      }
    }
  
    return arrayCustomPermission;
  
  }
  
   mergeClassAccesses(mapClassAccessesTarget: Map<any, any>, mapUserClassAccessesSource: Map<any, any>) {
    var arrayClassAccesses = new Array();
    for (let apexClass of mapClassAccessesTarget.keys()) {
      if (mapUserClassAccessesSource.has(apexClass) == true) {
        var targetClassAccesses = mapClassAccessesTarget.get(apexClass);
        targetClassAccesses.enabled = mapUserClassAccessesSource.get(apexClass).enabled;
        arrayClassAccesses.push(targetClassAccesses);
      } else {
        arrayClassAccesses.push(mapClassAccessesTarget.get(apexClass));
      }
    }
  
    for (let name of mapUserClassAccessesSource.keys()) {
      if (mapClassAccessesTarget.has(name) == true) {
        continue;
      } else {
        arrayClassAccesses.push(mapUserClassAccessesSource.get(name));
      }
    }

    return arrayClassAccesses;
  
  }
  
   mergeCustomSettings(mapCustomSettingsTarget: Map<any, any>, mapCustomSettingsSource: Map<any, any>) {
    var arrayCustomSettings = new Array();
    for (let customSettings of mapCustomSettingsTarget.keys()) {
      if (mapCustomSettingsSource.has(customSettings) == true) {
        var targetCustomSetting = mapCustomSettingsTarget.get(customSettings);
        targetCustomSetting.enabled = mapCustomSettingsSource.get(customSettings).enabled;
        arrayCustomSettings.push(targetCustomSetting);
      } else {
        arrayCustomSettings.push(mapCustomSettingsTarget.get(customSettings));
      }
    }
  
    for (let customSettings of mapCustomSettingsSource.keys()) {
      if (mapCustomSettingsTarget.has(customSettings) == true) {
        continue;
      } else {
        arrayCustomSettings.push(mapCustomSettingsSource.get(customSettings));
      }
    }
  
    return arrayCustomSettings;
  
  }
  
   mergeApplicationVisibilities(mapAppVisibilitiesTarget: Map<any, any>, mapAppVisibilitiesSource: Map<any, any>) {
    var arrayAppVisibilities = new Array();
   
    for (let appVisibilities of mapAppVisibilitiesTarget.keys()) {
      if (mapAppVisibilitiesSource.has(appVisibilities) == true) {
        var app = mapAppVisibilitiesTarget.get(appVisibilities);
        app.default = mapAppVisibilitiesSource.get(appVisibilities).default;
        app.visible = mapAppVisibilitiesSource.get(appVisibilities).visible;
        arrayAppVisibilities.push(app);
      } else {
        arrayAppVisibilities.push(mapAppVisibilitiesTarget.get(appVisibilities));
      }
    }
  
    for (let appVisibilities of mapAppVisibilitiesSource.keys()) {
      if (mapAppVisibilitiesTarget.has(appVisibilities) == true) {
        continue;
      } else {
        arrayAppVisibilities.push(mapAppVisibilitiesSource.get(appVisibilities));
      }
    }
  
    return arrayAppVisibilities;
  
  }
  
   mergeObjectPermissions(mapObjPermTarget: Map<any, any>, mapObjPermSource: Map<any, any>) {
    var arrayObjPermissions = new Array();
    
    for (let objtPermission of mapObjPermTarget.keys()) {
      if (mapObjPermSource.has(objtPermission) == true) {
        var objtTarget = mapObjPermTarget.get(objtPermission);
        objtTarget.allowCreate = mapObjPermSource.get(objtPermission).allowCreate;
        objtTarget.allowDelete = mapObjPermSource.get(objtPermission).allowDelete;
        objtTarget.allowEdit = mapObjPermSource.get(objtPermission).allowEdit;
        objtTarget.allowRead = mapObjPermSource.get(objtPermission).allowRead;
        objtTarget.modifyAllRecords = mapObjPermSource.get(objtPermission).modifyAllRecords;
        objtTarget.viewAllRecords = mapObjPermSource.get(objtPermission).viewAllRecords;
        arrayObjPermissions.push(objtTarget);
      } else {
        arrayObjPermissions.push(mapObjPermTarget.get(objtPermission));
      }
    }
  
    for (let objtPermission of mapObjPermSource.keys()) {
      if (mapObjPermTarget.has(objtPermission) == true) {
        continue;
      } else {
        arrayObjPermissions.push(mapObjPermSource.get(objtPermission));
      }
    }
  
    return arrayObjPermissions;
  
  }
  // SPECIFIC INFORMATIONS ( OBTAIN CHANGES ONLY IN THE SAME TYPE) - IF CHANGE TYPE, IS NEEDLY MANUAL ACTIONS
   mergeLoginFlows(mapLoginFlowsTarget: Map<any, any>, mapLoginFlowsSource: Map<any, any>) {
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
  
   mergePageAccesses(mapPageAccessesTarget: Map<any, any>, mapPageAccessesSource: Map<any, any>) {
    var arrayCustomSettings = new Array();
    for (let page of mapPageAccessesSource.keys()) {
      if (mapPageAccessesTarget.has(page) == true) {
        var targetClassAccesses = mapPageAccessesTarget.get(page);
        targetClassAccesses.enabled = mapPageAccessesSource.get(page).enabled;
        arrayCustomSettings.push(targetClassAccesses);
      } else {
        arrayCustomSettings.push(mapPageAccessesSource.get(page.toString()));
      }
    }
  
    return arrayCustomSettings;
  
  }
}