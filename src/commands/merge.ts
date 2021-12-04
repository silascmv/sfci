import { Command, flags } from '@oclif/command'
import { resolve } from 'dns';
import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';
import * as xml2js from 'xml2js';

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

        const filesInSource = this.getFilesInFolders(flags.source)
        const filesInTarget = this.getFilesInFolders(flags.dir)

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
            this.moveFilesToTarget(key, flags.source, flags.dir);
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

  getFilesInFolders(folder: string) {
    let allFilesInDir = new Map(fs.readdirSync(folder, 'utf8').entries());
    let mapRetorno = new Map();

    for (let entry of allFilesInDir.values()) {
      mapRetorno.set(entry, fs.readFileSync(folder + '/' + entry, { encoding: 'utf8', flag: 'r' }));
    }
    return mapRetorno;
  }

  moveFilesToTarget(fileName: string, source: string, target: string) {
    fs.copyFileSync(process.cwd() + '/' + source + '/' + fileName, process.cwd() + '/' + target + '/' + fileName);
  }
  mergeProfile(fileName: string, target: any, source: any) {
    var sourceFile = this.convertFile(source);
    //FIELD PERMISSION MAPS
    var mapOfFieldObjTarget = this.createMapFieldPermission(target);
    var mapOfFieldObjSource = this.createMapFieldPermission(source);
    // USER PERMISSION MAPS
    var mapUserPermissionTarget = this.createMapUserPermission(target);
    var mapUserPermissionSource = this.createMapUserPermission(source);

    var arrayFieldPermission = new Array();
    var arrayUserPermission = new Array();

    // START - CHANGE FIELD PERMISSIONS
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
    sourceFile.Profile.fieldPermissions = arrayFieldPermission;
    // END - CHANGE FIELD PERMISSIONS
    // START - CHANGE USER PERMISSIONS
    for (let field of mapUserPermissionSource.keys()) {

      if (mapUserPermissionTarget.has(field) == true) {
        var targetUsrPerm = mapUserPermissionTarget.get(field);
        targetUsrPerm.enabled = mapUserPermissionSource.get(field).enabled;
        arrayUserPermission.push(targetUsrPerm);
      } else {
        var newUsrPermission = mapUserPermissionSource.get(field.toString());
        arrayUserPermission.push(newUsrPermission);
      }
    }
    sourceFile.Profile.userPermissions = arrayUserPermission;
    // END - CHANGE USER PERMISSIONS



    //WRITE CHANGES
    var builder = new xml2js.Builder({ renderOpts: { pretty: true, 'indent': '    ', 'newline': '\n' } });
    var xml = builder.buildObject(sourceFile);

    fs.writeFileSync(this.targetFolder + '/' + fileName, xml);

  }

  convertFile(file: any) {
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

  createMapFieldPermission(file: any) {
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
  createMapUserPermission(file: any) {
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


}
