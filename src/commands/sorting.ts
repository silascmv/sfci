/* eslint-disable no-case-declarations */
import {Command, flags} from '@oclif/command'
import * as fileUtils from '../utils/file-utils'
import SortUtils from '../utils/sort-utils'

export default class Sorting extends Command {
  static description = 'Sorting your profiles or package.xml'

  utilsObj = new SortUtils()

  fileToSorting = '';

  path = '';

  static flags = {
    help: flags.help({char: 'h'}),
    source: flags.string({required: true, char: 's', description: 'Path of profile or package to sorting, full path with extension'}),
    type: flags.string({required: true, char: 't', description: 'Type of Metadata(package or profile)', options: ['profile', 'package']}),

  }

  static args = [{name: 'file'}]

  async run() {
    this.log('SFCI\n')

    const {flags} = this.parse(Sorting)
    this.fileToSorting = flags.source
    this.path = flags.source
    switch (flags.type) {
    case 'profile':
      this.log('Starting profile sorting\n')
      const profileInSource = fileUtils.convertFile(fileUtils.readFile(this.fileToSorting))
      this.sortProfiles(profileInSource)
      this.log('Finish profile sorting \n')
      break

    case 'package':
      this.log('Starting package sorting\n')
      const packageInSource = fileUtils.convertFile(fileUtils.readFile(this.fileToSorting))
      /* this.log(packageInSource) */
      this.sortPackage(packageInSource)
      this.log('Finish package sorting \n')
      break

    default:
      this.log('Unexpected value type')
      break
    }
  }

  sortProfiles(file: any) {
    // ORDER TYPES OF METADATAS
    file.Profile = Object.keys(file.Profile).sort().reduce(
      (obj: any, key: any) => {
        obj[key] = file.Profile[key]
        return obj
      },
      {}
    )
    // CALL FUNCTIONS TO SORT ELEMENTS BY TYPE OF METADATA
    if (file.Profile.fieldPermissions !== undefined) {
      this.utilsObj.sortTag(file.Profile.fieldPermissions, 'field')
    }
    if (file.Profile.applicationVisibilities !== undefined) {
      this.utilsObj.sortTag(file.Profile.applicationVisibilities, 'application')
    }
    if (file.Profile.objectPermissions !== undefined) {
      this.utilsObj.sortTag(file.Profile.objectPermissions, 'object')
    }
    if (file.Profile.layoutAssignments !== undefined) {
      this.utilsObj.sortTag(file.Profile.layoutAssignments, 'layout')
    }
    if (file.Profile.userPermissions !== undefined) {
      this.utilsObj.sortTag(file.Profile.userPermissions, 'name')
    }

    if (file.Profile.customMetadataTypeAccesses !== undefined) {
      this.utilsObj.sortTag(file.Profile.customMetadataTypeAccesses, 'name')
    }
    if (file.Profile.customPermissions !== undefined) {
      this.utilsObj.sortTag(file.Profile.customPermissions, 'name')
    }
    this.log('CHEGOU AQ')

    if (file.Profile.classAccesses !== undefined) {
      this.utilsObj.sortTag(file.Profile.classAccesses, 'apexClass')
    }
    if (file.Profile.customSettingAccesses !== undefined) {
      this.utilsObj.sortTag(file.Profile.customSettingAccesses, 'name')
    }
    if (file.Profile.loginFlows !== undefined) {
      this.utilsObj.sortTag(file.Profile.loginFlows, 'friendlyName')
    }
    if (file.Profile.pageAccesses !== undefined) {
      this.utilsObj.sortTag(file.Profile.pageAccesses, 'apexPage')
    }
    if (file.Profile.recordTypeVisibilities !== undefined) {
      this.utilsObj.sortTag(file.Profile.recordTypeVisibilities, 'recordType')
    }
    if (file.Profile.recordTypeVisibilities !== undefined) {
      this.utilsObj.sortTag(file.Profile.recordTypeVisibilities, 'recordType')
    }
    if (file.Profile.tabVisibilities !== undefined) {
      this.utilsObj.sortTag(file.Profile.tabVisibilities, 'tab')
    }
    if (file.Profile.flowAccesses !== undefined) {
      this.utilsObj.sortTag(file.Profile.flowAccesses, 'flow')
    }

    if (file.Profile.externalDataSourceAccesses !== undefined) {
      this.utilsObj.sortTag(file.Profile.externalDataSourceAccesses, 'externalDataSource')
    }

    fileUtils.writeChangesOneFile(file, this.path)
  }

  sortPackage(file: any) {
    // ORDER TYPES OF METADATA
    this.utilsObj.sortTag(file.Package.types, 'name')
    // ORDER MEMBERS INSIDE OF TYPE OF METADATA
    for (const key of Object.keys(file.Package.types)) {
      file.Package.types[key].members = file.Package.types[key].members.sort()
    }
    fileUtils.writeChangesOneFile(file, this.path)
  }
}
