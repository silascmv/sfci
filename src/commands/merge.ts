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
          for (let key of mapNewProfiles.keys()) {
            fileUtils.moveFilesToTarget(key, flags.source, flags.dir);
          }
        }

        // MERGE PERMISSIONS IN SAME FILES
        if (mapToUpdate.size > 0) {
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
    var typesMerged = "" ;

   
    // MAPS - SOURCE
    var mapOfFieldObjSource = mergeObject.mountMapFieldPermission(source);
    var mapUserPermissionSource = mergeObject.mountMapUserPermission(source);
    var mapLayoutAssignmentsSource = mergeObject.mountMapLayoutAssignments(source);
    var mapCustomMdtAccessesSource = mergeObject.mountCustomMetadataTypeAccesses(source);
    var mapCustomPermissionsSource = mergeObject.mountCustomPermissions(source);

    
    //  Class Accesses MAPS
    var mapClassAccessesTarget = mergeObject.mountClassAccesses(target);
    var mapClassAccessesSource = mergeObject.mountClassAccesses(source);
    //  CustomSettingAccesses MAPS
    var mapCustomSettingsTarget = mergeObject.mountCustomSettingAccesses(target);
    var mapCCustomSettingsSource = mergeObject.mountCustomSettingAccesses(source);
    //  Application Visibilities MAPS
    var mapApplicationVisibilitiesTarget = mergeObject.mountApplicationVisibilities(target);
    var mapApplicationVisibilitiesSource = mergeObject.mountApplicationVisibilities(source);

    //  Object Permission MAPS
    var mapObjectPermissionsTarget = mergeObject.mountObjectPermissions(target);
    var mapObjectPermissionsSource = mergeObject.mountObjectPermissions(source);
    if (mapOfFieldObjSource.size > 0) {
      typesMerged += "Field Permissions \n";
      targetFile.Profile.fieldPermissions = mergeObject.mergeFieldPermissions(mergeObject.mountMapFieldPermission(target), mapOfFieldObjSource);
    }
    if (mapUserPermissionSource.size > 0) {
      typesMerged += "UserPermissions\n";
      targetFile.Profile.userPermissions = mergeObject.mergeUserPermissions(mergeObject.mountMapUserPermission(target), mapUserPermissionSource)
    }
    if (mapLayoutAssignmentsSource.size > 0) {
      typesMerged += "Layout Assignments\n";
      targetFile.Profile.layoutAssignments = mergeObject.mergeLayoutAssignments(mergeObject.mountMapLayoutAssignments(target), mapLayoutAssignmentsSource);
    }
    if (mapCustomMdtAccessesSource.size > 0) {
      typesMerged += "Custom Metadata Type Accesses\n";
      targetFile.Profile.customMetadataTypeAccesses = mergeObject.mergeCustomMdtAccesses(mergeObject.mountCustomMetadataTypeAccesses(target), mapCustomMdtAccessesSource);
    }
    if (mapCustomPermissionsSource.size > 0) {
      typesMerged += "Custom Permissions\n";
      targetFile.Profile.customPermissions = mergeObject.mergeCustomPermissions(mergeObject.mountCustomPermissions(target), mapCustomPermissionsSource);
    }

    this.log("Types Merged : \n \n" + typesMerged);


    /*  
    sourceFile.Profile.customMetadataTypeAccesses = mergeUtils.mergeCustomMdtAccesses(mapCustomMdtAccessesTarget,mapCustomMdtAccessesSource); 
    sourceFile.Profile.customPermissions = mergeUtils.mergeCustomPermissions(mapCustomPermissionsTarget,mapCustomPermissionsSource); 
    sourceFile.Profile.classAccesses = mergeUtils.mergeClassAccesses(mapClassAccessesTarget,mapClassAccessesSource); 
    sourceFile.Profile.customSettingAccesses = mergeUtils.mergeClassAccesses(mapCustomSettingsTarget,mapCCustomSettingsSource); 
    sourceFile.Profile.applicationVisibilities = mergeUtils.mergeApplicationVisibilities(mapApplicationVisibilitiesTarget,mapApplicationVisibilitiesSource); 
    sourceFile.Profile.objectPermissions = mergeUtils.mergeObjectPermissions(mapObjectPermissionsTarget,mapObjectPermissionsSource);  */
    fileUtils.writeChanges(targetFile, this.targetFolder, fileName);

  }

  get fileName(){
    return this.fileMerging;
  }

}
