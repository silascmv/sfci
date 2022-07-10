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
    this.utilsObj.sortTag(file.Profile.fieldPermissions, 'field')
    this.utilsObj.sortTag(file.Profile.applicationVisibilities, 'application')
    this.utilsObj.sortTag(file.Profile.objectPermissions, 'object')
    this.utilsObj.sortTag(file.Profile.layoutAssignments, 'layout')
    this.utilsObj.sortTag(file.Profile.userPermissions, 'name')
    this.utilsObj.sortTag(file.Profile.customMetadataTypeAccesses, 'name')
    this.utilsObj.sortTag(file.Profile.customPermissions, 'name')
    this.utilsObj.sortTag(file.Profile.classAccesses, 'apexClass')
    this.utilsObj.sortTag(file.Profile.customSettingAccesses, 'name')
    this.utilsObj.sortTag(file.Profile.customSettingAccesses, 'name')
    this.utilsObj.sortTag(file.Profile.loginFlows, 'friendlyName')
    this.utilsObj.sortTag(file.Profile.pageAccesses, 'apexPage')
    this.utilsObj.sortTag(file.Profile.recordTypeVisibilities, 'recordType')
    this.utilsObj.sortTag(file.Profile.tabVisibilities, 'tab')
    this.utilsObj.sortTag(file.Profile.flowAccesses, 'flow')
    this.utilsObj.sortTag(file.Profile.externalDataSourceAccesses, 'externalDataSource')

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
