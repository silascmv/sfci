/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
import { Command, flags } from '@oclif/command'
import * as fileUtils from '../utils/file-utils'
import MergeFile from '../utils/merge-file'

export default class Merge extends Command {
  static description = 'Merge your metadata from source path to target org path'

  targetFolder = '';

  fileMerging = '';

  static examples = [
    '$ sfci merge -t profile -s metadata -d src',
  ]

  static teste = [
    '$ OIE',
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    source: flags.string({ required: true, char: 's', description: 'Path of source directory with Salesforce' }),
    dir: flags.string({ required: true, char: 'd', description: 'Path of source directory with Salesforce' }),
    type: flags.string({ required: true, char: 't', description: 'Type of Metadata(Only profile in this moment', options: ['profile'] }),
  }

  async run() {
    this.log('SFCI - Merge \n')

    const { flags } = this.parse(Merge);
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
          this.log('New Files in Source to move to Target folder: \n' + JSON.stringify(lista) + '\n');
          for (let key of mapNewProfiles.keys()) {
            fileUtils.moveFilesToTarget(key, flags.source, flags.dir);
          }
        }

        // MERGE PERMISSIONS IN SAME FILES
        if (mapToUpdate.size > 0) {
          let lista = [...mapToUpdate.keys()];
          this.log('Files in Source to Merge: \n' + JSON.stringify(lista) + '\n');

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
    let mergeObject = new MergeFile(fileName);
    let targetFile = fileUtils.convertFile(target);
    let typesMerged = [];

    // MAPS - SOURCE
    let mapOfFieldObjSource = mergeObject.mountMapFieldPermission(source);
    let mapUserPermissionSource = mergeObject.mountMapUserPermission(source);
    let mapLayoutAssignmentsSource = mergeObject.mountMapLayoutAssignments(source);
    let mapCustomMdtAccessesSource = mergeObject.mountCustomMetadataTypeAccesses(source);
    let mapCustomPermissionsSource = mergeObject.mountCustomPermissions(source);
    let mapClassAccessesSource = mergeObject.mountClassAccesses(source);
    let mapCCustomSettingsSource = mergeObject.mountCustomSettingAccesses(source);
    let mapApplicationVisibilitiesSource = mergeObject.mountApplicationVisibilities(source);
    let mapObjectPermissionsSource = mergeObject.mountObjectPermissions(source);
    let mapLoginFlowsSource = mergeObject.mountLoginFlows(source);
    let mapPageAccessesSource = mergeObject.mountPageAccess(source);
    let mapRtAccessesSource = mergeObject.mountRecordTypeVisibilities(source);
    // VERIFICATIONS TO BE MERGE.
    if (mapOfFieldObjSource.size > 0) {
      typesMerged.push('Field Permissions');
      targetFile.Profile.fieldPermissions = mergeObject.mergeFieldPermissions(mergeObject.mountMapFieldPermission(target), mapOfFieldObjSource);
    }
    if (mapUserPermissionSource.size > 0) {
      typesMerged.push('UserPermissions');
      targetFile.Profile.userPermissions = mergeObject.mergeUserPermissions(mergeObject.mountMapUserPermission(target), mapUserPermissionSource)
    }
    if (mapLayoutAssignmentsSource.size > 0) {
      typesMerged.push('Layout Assignments');
      targetFile.Profile.layoutAssignments = mergeObject.mergeLayoutAssignments(mergeObject.mountMapLayoutAssignments(target), mapLayoutAssignmentsSource);
    }
    if (mapCustomMdtAccessesSource.size > 0) {
      typesMerged.push('Custom Metadata Type Accesses');
      targetFile.Profile.customMetadataTypeAccesses = mergeObject.mergeCustomMdtAccesses(mergeObject.mountCustomMetadataTypeAccesses(target), mapCustomMdtAccessesSource);
    }
    if (mapCustomPermissionsSource.size > 0) {
      typesMerged.push('Custom Permissions');
      targetFile.Profile.customPermissions = mergeObject.mergeCustomPermissions(mergeObject.mountCustomPermissions(target), mapCustomPermissionsSource);
    }

    if (mapClassAccessesSource.size > 0) {
      typesMerged.push('Class Accesses');
      targetFile.Profile.classAccesses = mergeObject.mergeClassAccesses(mergeObject.mountClassAccesses(target), mapClassAccessesSource);
    }

    if (mapCCustomSettingsSource.size > 0) {
      typesMerged.push('Custom Settings');
      targetFile.Profile.customSettingAccesses = mergeObject.mergeCustomSettings(mergeObject.mountCustomSettingAccesses(target), mapCCustomSettingsSource);
    }

    if (mapApplicationVisibilitiesSource.size > 0) {
      typesMerged.push('Application Visibilities');
      targetFile.Profile.applicationVisibilities = mergeObject.mergeApplicationVisibilities(mergeObject.mountApplicationVisibilities(target), mapApplicationVisibilitiesSource);
    }

    if (mapObjectPermissionsSource.size > 0) {
      typesMerged.push('Object Permissions');
      targetFile.Profile.objectPermissions = mergeObject.mergeObjectPermissions(mergeObject.mountObjectPermissions(target), mapObjectPermissionsSource);
    }

    if (mapLoginFlowsSource.size > 0) {
      typesMerged.push('Login Flows');
      targetFile.Profile.loginFlows = mergeObject.mergeLoginFlows(mergeObject.mountLoginFlows(target), mapLoginFlowsSource);
    }

    if (mapPageAccessesSource.size > 0) {
      typesMerged.push('Page Accesses');
      targetFile.Profile.pageAccesses = mergeObject.mergePageAccesses(mergeObject.mountPageAccess(target), mapPageAccessesSource);
    }

    if (mapRtAccessesSource.size > 0) {
      typesMerged.push('Record Type Visibilities');
      targetFile.Profile.recordTypeVisibilities = mergeObject.mergeRecordTypeVisibilities(mergeObject.mountRecordTypeVisibilities(target), mapRtAccessesSource);
    }
    this.log('Types in Source ' + fileName + ' to Merge : \n' + JSON.stringify(typesMerged.sort()) + '\n');
    // ORDER IN TYPES OF PERMISSIONS
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
