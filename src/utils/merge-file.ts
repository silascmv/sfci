/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable unicorn/filename-case */
/* eslint-disable eol-last */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable lines-between-class-members */
/* eslint-disable padded-blocks */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-array-constructor */
import * as logger from './log-utils';
import * as xml2js from 'xml2js';


export default class MergeFile {
  fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  // CREATE MAP FUNCTIONS
  mountMapFieldPermission(file: any) {
    let mapOfFieldPerm = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
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
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.loginFlows != null) {
          for (let obj of json.Profile.loginFlows) {
            if (obj.friendlyName != null) {
              mapOfLoginFlows.set(obj.friendlyName.toString(), obj);
            }
          }
        }
      }
    });
    return mapOfLoginFlows;
  }

  mountPageAccess(file: any) {
    var mapPageAccesses = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.pageAccesses != null) {
          for (let page of json.Profile.pageAccesses) {
            if (page.apexPage != null) {
              mapPageAccesses.set(page.apexPage.toString(), page);
            }
          }
        }
      }
    });
    return mapPageAccesses;
  }

  mountRecordTypeVisibilities(file: any) {
    var mapRtVisibilities = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.recordTypeVisibilities != null) {
          for (let rt of json.Profile.recordTypeVisibilities) {
            if (rt.recordType != null) {
              mapRtVisibilities.set(rt.recordType.toString(), rt);
            }
          }
        }
      }
    });
    return mapRtVisibilities;
  }

  mountTabVisibilities(file: any) {
    var mapTabVisibilities = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.tabVisibilities != null) {
          for (let tab of json.Profile.tabVisibilities) {
            if (tab.tab != null) {
              mapTabVisibilities.set(tab.tab.toString(), tab);
            }
          }
        }
      }
    });
    return mapTabVisibilities;
  }

  mountFlowAccesses(file: any) {
    var flowAccesses = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.flowAccesses != null) {
          for (let flow of json.Profile.flowAccesses) {
            if (flow.flow != null) {
              flowAccesses.set(flow.flow.toString(), flow);
            }
          }
        }
      }
    });
    return flowAccesses;
  }

  mountExternalDataSourceAccesses(file: any) {
    var mapEDAccesses = new Map();
    xml2js.parseString(file, (err: Error, result: any) => {
      if (err) {
        let erroMessage = 'File --> ' + this.fileName + '\n' + err.message
        logger.error(erroMessage);
        throw erroMessage;
      } else {
        var json = result;
        if (json.Profile.externalDataSourceAccesses != null) {
          for (let ed of json.Profile.externalDataSourceAccesses) {
            if (ed.externalDataSource != null) {
              mapEDAccesses.set(ed.externalDataSource.toString(), ed);
            }
          }
        }
      }
    });
    return mapEDAccesses;
  }

  // MERGE FUNCTIONS

  mergeFieldPermissions(mapOfFieldObjTarget: Map<any, any>, mapOfFieldObjSource: Map<any, any>) {
    var arrayFieldPermission = [];

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
    var arrayUserPermission = [];
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
    var arrayLayoutAssigments = [];
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
    var arrayCustomMdtAccesses = [];
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
    var arrayCustomPermission = [];

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
    var arrayClassAccesses = [];
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
    var arrayCustomSettings = [];
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
    var arrayAppVisibilities = [];

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
    var arrayObjPermissions = [];

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
    var arrayLoginFlows = [];

    for (let loginFlows of mapLoginFlowsTarget.keys()) {
      if (mapLoginFlowsSource.has(loginFlows) == true) {
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
        arrayLoginFlows.push(loginFlows);
      } else {
        arrayLoginFlows.push(mapLoginFlowsTarget.get(loginFlows));
      }
    }

    for (let loginFlows of mapLoginFlowsSource.keys()) {
      if (mapLoginFlowsTarget.has(loginFlows) == true) {
        continue;
      } else {
        arrayLoginFlows.push(mapLoginFlowsSource.get(loginFlows));
      }
    }


    return arrayLoginFlows;

  }

  mergePageAccesses(mapPageAccessesTarget: Map<any, any>, mapPageAccessesSource: Map<any, any>) {
    var arrayPageAccesses = [];
    for (let page of mapPageAccessesTarget.keys()) {
      if (mapPageAccessesSource.has(page) == true) {
        var targetPage = mapPageAccessesTarget.get(page);
        targetPage.enabled = mapPageAccessesSource.get(page).enabled;
        arrayPageAccesses.push(targetPage);
      } else {
        arrayPageAccesses.push(mapPageAccessesTarget.get(page));
      }
    }

    for (let page of mapPageAccessesSource.keys()) {
      if (mapPageAccessesTarget.has(page) == true) {
        continue;
      } else {
        arrayPageAccesses.push(mapPageAccessesSource.get(page));
      }
    }

    return arrayPageAccesses;

  }

  mergeRecordTypeVisibilities(mapRtTarget: Map<any, any>, mapRtSource: Map<any, any>) {
    var arrayRtVisibilities = [];
    for (let rt of mapRtTarget.keys()) {
      if (mapRtSource.has(rt) == true) {
        var targetRt = mapRtTarget.get(rt);
        targetRt.default = mapRtSource.get(rt).default;
        targetRt.visible = mapRtSource.get(rt).visible;
        if ((targetRt.personAccountDefault == null || targetRt.personAccountDefault != null) && mapRtSource.get(rt).personAccountDefault != null) {
          targetRt.personAccountDefault = mapRtSource.get(rt).personAccountDefault;
        } else if (targetRt.personAccountDefault != null && mapRtSource.get(rt).personAccountDefault == null) {
          delete targetRt.personAccountDefault;
        }

        arrayRtVisibilities.push(targetRt);
      } else {
        arrayRtVisibilities.push(mapRtTarget.get(rt));
      }
    }

    for (let rt of mapRtSource.keys()) {
      if (mapRtTarget.has(rt) == true) {
        continue;
      } else {
        arrayRtVisibilities.push(mapRtSource.get(rt));
      }
    }

    return arrayRtVisibilities;

  }

  mergeTabVisibilities(mapTabTarget: Map<any, any>, mapTabSource: Map<any, any>) {
    var arrayTabVisibilities = [];
    for (let tab of mapTabTarget.keys()) {
      if (mapTabSource.has(tab) == true) {
        var tabTarget = mapTabTarget.get(tab);
        tabTarget.visibility = mapTabSource.get(tab).visibility;
        arrayTabVisibilities.push(tabTarget);
      } else {
        arrayTabVisibilities.push(mapTabTarget.get(tab));
      }
    }

    for (let tab of mapTabSource.keys()) {
      if (mapTabTarget.has(tab) == true) {
        continue;
      } else {
        arrayTabVisibilities.push(mapTabSource.get(tab));
      }
    }

    return arrayTabVisibilities;

  }

  mergeFlowAccesses(mapFlowTarget: Map<any, any>, mapFlowSource: Map<any, any>) {
    var arrayFlowAccess = [];
    for (let flow of mapFlowTarget.keys()) {
      if (mapFlowSource.has(flow) == true) {
        var flowTarget = mapFlowTarget.get(flow);
        flowTarget.enabled = mapFlowSource.get(flow).enabled;
        arrayFlowAccess.push(flowTarget);
      } else {
        arrayFlowAccess.push(mapFlowTarget.get(flow));
      }
    }

    for (let flow of mapFlowSource.keys()) {
      if (mapFlowTarget.has(flow) == true) {
        continue;
      } else {
        arrayFlowAccess.push(mapFlowSource.get(flow));
      }
    }

    return arrayFlowAccess;

  }

  mergeExternalDataAccesses(mapEDTarget: Map<any, any>, mapEDSource: Map<any, any>) {
    var arrayEDAccesses = [];
    for (let EDaccess of mapEDTarget.keys()) {
      if (mapEDSource.has(EDaccess) == true) {
        var ed = mapEDTarget.get(EDaccess);
        ed.enabled = mapEDSource.get(EDaccess).enabled;
        arrayEDAccesses.push(ed);
      } else {
        arrayEDAccesses.push(mapEDTarget.get(EDaccess));
      }
    }

    for (let EDaccess of mapEDSource.keys()) {
      if (mapEDTarget.has(EDaccess) == true) {
        continue;
      } else {
        arrayEDAccesses.push(mapEDSource.get(EDaccess));
      }
    }

    return arrayEDAccesses;

  }
}