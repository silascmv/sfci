/* eslint-disable no-else-return */
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
export default class SortUtils {
  /* fileName: string; */

  /* constructor(fileName: string) {
      this.fileName = fileName
    } */
  mapOfMetadataKeys = [{
    fieldPermissions: 'field',
    userPermissions: 'name',
    layoutAssignments: 'layout',
    customMetadataTypeAccesses: 'name',
    customPermissions: 'name',
    classAccesses: 'apexClass',
    customSettingAccesses: 'name',
    applicationVisibilities: 'application',
    objectPermissions: 'object',
    loginFlows: 'friendlyName',
    pageAccesses: 'apexPage',
    recordTypeVisibilities: 'recordType',
    externalDataSourceAccesses: 'externalDataSource',
    flowAccesses: 'flow',

  }]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sortTag(obj: any, fieldCondition: any): any {
    return obj.sort((a: any, b: any) => {
      return (a[fieldCondition] > b[fieldCondition]) ? 1 : ((b[fieldCondition] > a[fieldCondition]) ? -1 : 0);
    })
  }

  sortTagConditions(obj: any, fieldCondition: any): any {
    return obj.sort((a: any, b: any) => {
      return (a[fieldCondition] > b[fieldCondition]) ? 1 : ((b[fieldCondition] > a[fieldCondition]) ? -1 : 0);
    })
  }

  sortListTags(){
    this.log(new Map(this.mapOfMetadataKeys))
  }
}
