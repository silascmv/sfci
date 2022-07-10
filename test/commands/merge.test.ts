import {expect, test} from '@oclif/test'

describe('Merge Function', () => {
  test
  .stdout()
  .command(['merge', '-s=test/resources/source/profiles/', '-d=test/resources/target/', '-t=profile'])
  .it('merge', ctx => {
    expect(ctx.stdout).to.contain('Finish Merging Profiles')
  })
})
