import { Command, flags } from '@oclif/command'
import * as fileUtils from '../utils/fileUtils'
import MergeFile from '../utils/mergeFile'
const logger = require('../utils/logUtils');

export default class Merge extends Command {
  static description = 'Merge your metadata from source path to target org path'

  targetFolder = '';
  fileMerging = '';

  static examples = [
    `$ sfci merge -t profile -s metadata -d src`,
  ]

  static teste = [
    `$ OIE`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    source: flags.string({ required: true, char: 's', description: 'Path of source directory with Salesforce' }),
    dir: flags.string({ required: true, char: 'd', description: 'Path of source directory with Salesforce' }),
    type: flags.string({ required: true, char: 't', description: 'Type of Metadata(Only profile in this moment', options: ['profile'] }),
  }

  async run() {
    this.log('SFCI - Merge \n')

    const { args, flags } = this.parse(Merge);
    this.targetFolder = flags.dir;

    switch (flags.type) {

      case 'profile':
        this.log('Starting Merging Profiles \n')
        const filesInSource = fileUtils.getFilesInFolders(flags.source)
        const filesInTarget = fileUtils.getFilesInFolders(flags.dir);
        let mapToUpdate = new Map();
        let mapNewProfiles = new Map();

        for (let file of filesInSource.keys()) {
          if (filesInTarget.has(file)) {
            mapToUpdate.set(file, filesInTarget.get(file));
          } else {
            mapNewProfiles.set(file, filesInSource.get(file));
          }
        }

        // MOVE ONLY NEWPROFILES
        if (mapNewProfiles.size > 0) {
          let lista = [...mapNewProfiles.keys()];
          this.log("New Files in Source to move to Target folder: " + JSON.stringify(lista) + "\n");
          for (let key of mapNewProfiles.keys()) {
            fileUtils.moveFilesToTarget(key, flags.source, flags.dir);
          }
        }

        // MERGE PERMISSIONS IN SAME FILES
        if (mapToUpdate.size > 0) {
          let lista = [...mapToUpdate.keys()];
          this.log("Files in Source to Merge: " + JSON.stringify(lista) + "\n");

          for (let arquivo of mapToUpdate.keys()) {
            this.mergeProfile(arquivo, mapToUpdate.get(arquivo), filesInSource.get(arquivo));
          }
        }
        this.log('Finish Merging Profiles \n')

        break;
        
      default:
        this.log('Unexpected value type')
        break;
    }

  }


  mergeProfile(fileName: string, target: any, source: any) {
    var mergeObject = new MergeFile(fileName);
    var targetFile = fileUtils.convertFile(target);
    var typesMerged = new Array();


    // MAPS - SOURCE
    var mapOfFieldObjSource = mergeObject.mountMapFieldPermission(source);
    var mapUserPermissionSource = mergeObject.mountMapUserPermission(source);
    var mapLayoutAssignmentsSource = mergeObject.mountMapLayoutAssignments(source);
    var mapCustomMdtAccessesSource = mergeObject.mountCustomMetadataTypeAccesses(source);
    var mapCustomPermissionsSource = mergeObject.mountCustomPermissions(source);
    var mapClassAccessesSource = mergeObject.mountClassAccesses(source);
    var mapCCustomSettingsSource = mergeObject.mountCustomSettingAccesses(source);
    var mapApplicationVisibilitiesSource = mergeObject.mountApplicationVisibilities(source);
    var mapObjectPermissionsSource = mergeObject.mountObjectPermissions(source);
    var mapLoginFlowsSource = mergeObject.mountLoginFlows(source);


    if (mapOfFieldObjSource.size > 0) {
      typesMerged.push("Field Permissions");
      targetFile.Profile.fieldPermissions = mergeObject.mergeFieldPermissions(mergeObject.mountMapFieldPermission(target), mapOfFieldObjSource);
    }
    if (mapUserPermissionSource.size > 0) {
      typesMerged.push("UserPermissions");
      targetFile.Profile.userPermissions = mergeObject.mergeUserPermissions(mergeObject.mountMapUserPermission(target), mapUserPermissionSource)
    }
    if (mapLayoutAssignmentsSource.size > 0) {
      typesMerged.push("Layout Assignments");
      targetFile.Profile.layoutAssignments = mergeObject.mergeLayoutAssignments(mergeObject.mountMapLayoutAssignments(target), mapLayoutAssignmentsSource);
    }
    if (mapCustomMdtAccessesSource.size > 0) {
      typesMerged.push("Custom Metadata Type Accesses");
      targetFile.Profile.customMetadataTypeAccesses = mergeObject.mergeCustomMdtAccesses(mergeObject.mountCustomMetadataTypeAccesses(target), mapCustomMdtAccessesSource);
    }
    if (mapCustomPermissionsSource.size > 0) {
      typesMerged.push("Custom Permissions");
      targetFile.Profile.customPermissions = mergeObject.mergeCustomPermissions(mergeObject.mountCustomPermissions(target), mapCustomPermissionsSource);
    }

    if (mapClassAccessesSource.size > 0) {
      typesMerged.push("Class Accesses");
      targetFile.Profile.classAccesses = mergeObject.mergeClassAccesses(mergeObject.mountClassAccesses(target), mapClassAccessesSource);
    }

    if (mapCCustomSettingsSource.size > 0) {
      typesMerged.push("Custom Settings");
      targetFile.Profile.customSettingAccesses = mergeObject.mergeCustomSettings(mergeObject.mountCustomSettingAccesses(target), mapCCustomSettingsSource);
    }

    if (mapApplicationVisibilitiesSource.size > 0) {
      typesMerged.push("Application Visibilities");
      targetFile.Profile.applicationVisibilities = mergeObject.mergeApplicationVisibilities(mergeObject.mountApplicationVisibilities(target), mapApplicationVisibilitiesSource);
    }

    if (mapObjectPermissionsSource.size > 0) {
      typesMerged.push("Object Permissions");
      targetFile.Profile.objectPermissions = mergeObject.mergeObjectPermissions(mergeObject.mountObjectPermissions(target), mapObjectPermissionsSource);
    }

    if (mapLoginFlowsSource.size > 0) {
      typesMerged.push("Object Permissions");
      targetFile.Profile.loginFlows = mergeObject.mergeLoginFlows(mergeObject.mountLoginFlows(target), mapLoginFlowsSource);
    }


    this.log("Types in source " + fileName + " to Merge : \n" + JSON.stringify(typesMerged.sort()) + "\n");



    //ORDER IN TYPES OF PERMISSIONS
    targetFile.Profile = Object.keys(targetFile.Profile).sort().reduce(
      (obj: any, key: any) => {
        obj[key] = targetFile.Profile[key];
        return obj;
      },
      {}
    );

    fileUtils.writeChanges(targetFile, this.targetFolder, fileName);

  }

}
