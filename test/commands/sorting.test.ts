import {expect, test} from '@oclif/test'

describe('sorting', () => {
  test
  .stdout()
  .command(['sorting', '-s=test/resources/source/package.xml', '-t=package'])
  .it('sorting', ctx => {
    expect(ctx.stdout).to.contain('Finish package sorting')
  })
})
