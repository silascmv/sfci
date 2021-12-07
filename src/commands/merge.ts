import { Command, flags } from '@oclif/command'
import * as mergeUtils from '../utils/mergeUtils'
export default class Merge extends Command {
  static description = 'Merge your metadata from source path to target org path'

  targetFolder = '';

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
    const { args, flags } = this.parse(Merge);
    this.targetFolder = flags.dir;

    switch (flags.type) {

      case 'profile':
        const filesInSource = mergeUtils.getFilesInFolders(flags.source)
        const filesInTarget = mergeUtils.getFilesInFolders(flags.dir)

        let mapToUpdate = new Map();
        let mapNewProfiles = new Map();

        for (let key of filesInSource.keys()) {
          if (filesInTarget.has(key)) {
            mapToUpdate.set(key, filesInTarget.get(key));
          } else {
            mapNewProfiles.set(key, filesInSource.get(key));
          }
        }

        // MOVE ONLY NEWPROFILES
        if (mapNewProfiles.size > 0) {
          for (let key of mapNewProfiles.keys()) {
            mergeUtils.moveFilesToTarget(key, flags.source, flags.dir);
          }
        }

        // MERGE PERMISSIONS IN SAME FILES
        if (mapToUpdate.size > 0) {
          for (let key of mapToUpdate.keys()) {
            this.mergeProfile(key, mapToUpdate.get(key), filesInSource.get(key));
          }
        }

        break;

      default:
        this.log('Unexpected value type')
        break;
    }

  }


  mergeProfile(fileName: string, target: any, source: any) {
    var sourceFile = mergeUtils.convertFile(source);
    //FIELD PERMISSION MAPS
    var mapOfFieldObjTarget = mergeUtils.mountMapFieldPermission(target);
    var mapOfFieldObjSource = mergeUtils.mountMapFieldPermission(source);
    // USER PERMISSION MAPS
    var mapUserPermissionTarget = mergeUtils.mountMapUserPermission(target);
    var mapUserPermissionSource = mergeUtils.mountMapUserPermission(source);
    // LAYOUT ASSINGMENTS PERMISSION MAPS
    var mapLayoutAssignmentsTarget = mergeUtils.mountMapLayoutAssignments(target);
    var mapLayoutAssignmentsSource = mergeUtils.mountMapLayoutAssignments(source);
    //  CustomMetadataTypeAccesses MAPS
    var mapCustomMdtAccessesTarget = mergeUtils.mountCustomMetadataTypeAccesses(target);
    var mapCustomMdtAccessesSource = mergeUtils.mountCustomMetadataTypeAccesses(source);
    //  CustomPermissions MAPS
    var mapCustomPermissionsTarget = mergeUtils.mountCustomPermissions(target);
    var mapCustomPermissionsSource = mergeUtils.mountCustomPermissions(source);
    //  Class Accesses MAPS
    var mapClassAccessesTarget = mergeUtils.mountClassAccesses(target);
    var mapClassAccessesSource = mergeUtils.mountClassAccesses(source);
    //  CustomSettingAccesses MAPS
    var mapCustomSettingsTarget = mergeUtils.mountCustomSettingAccesses(target);
    var mapCCustomSettingsSource = mergeUtils.mountCustomSettingAccesses(source);
    //  Application Visibilities MAPS
    var mapApplicationVisibilitiesTarget = mergeUtils.mountApplicationVisibilities(target);
    var mapApplicationVisibilitiesSource = mergeUtils.mountApplicationVisibilities(source);
  
    //  Object Permission MAPS
    var mapObjectPermissionsTarget = mergeUtils.mountObjectPermissions(target);
    var mapObjectPermissionsSource = mergeUtils.mountObjectPermissions(source);
  
  
   
    sourceFile.Profile.fieldPermissions = mergeUtils.mergeFieldPermissions(mapOfFieldObjTarget,mapOfFieldObjSource);
    sourceFile.Profile.userPermissions = mergeUtils.mergeUserPermissions(mapUserPermissionTarget,mapUserPermissionSource); 
    sourceFile.Profile.layoutAssignments = mergeUtils.mergeLayoutAssignments(mapLayoutAssignmentsTarget,mapLayoutAssignmentsSource); 
    sourceFile.Profile.customMetadataTypeAccesses = mergeUtils.mergeCustomMdtAccesses(mapCustomMdtAccessesTarget,mapCustomMdtAccessesSource); 
    sourceFile.Profile.customPermissions = mergeUtils.mergeCustomPermissions(mapCustomPermissionsTarget,mapCustomPermissionsSource); 
    sourceFile.Profile.classAccesses = mergeUtils.mergeClassAccesses(mapClassAccessesTarget,mapClassAccessesSource); 
    sourceFile.Profile.customSettingAccesses = mergeUtils.mergeClassAccesses(mapCustomSettingsTarget,mapCCustomSettingsSource); 
    sourceFile.Profile.applicationVisibilities = mergeUtils.mergeApplicationVisibilities(mapApplicationVisibilitiesTarget,mapApplicationVisibilitiesSource); 
    sourceFile.Profile.objectPermissions = mergeUtils.mergeObjectPermissions(mapObjectPermissionsTarget,mapObjectPermissionsSource); 

    mergeUtils.writeChanges(sourceFile,this.targetFolder,fileName);

  }

}
