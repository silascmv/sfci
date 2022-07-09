sfci
====

sfci tools

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sfci.svg)](https://npmjs.org/package/sfci)
[![Downloads/week](https://img.shields.io/npm/dw/sfci.svg)](https://npmjs.org/package/sfci)
[![License](https://img.shields.io/npm/l/sfci.svg)](https://github.com/https://github.com/silascmv/sfci/blob/master/package.json)

<!-- toc -->
* [Goal](#goal)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
<!-- goal -->
# Goal
This tool was created with the motivation of helping Salesforce developers in the delivery process where there is profile versioning.
As it is a necessary work, the action of merging the profiles is quite time-consuming and manual and for many reasons this ends up being a disaster, both because it is a time-consuming process due to the number of profiles that exist within a project, and to maintain ordering and avoid duplication of permissions.
Other improvements will be implemented in future versions in order to make our life easier, after all I've suffered a lot with it lol.
<!-- stopgoal -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sfci
$ sfci COMMAND
running command...
$ sfci (-v|--version|version)
sfci/0.0.4 linux-x64 node-v17.1.0
$ sfci --help [COMMAND]
USAGE
  $ sfci COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sfci help [COMMAND]`](#sfci-help-command)
* [`sfci merge`](#sfci-merge)
* [`sfci sorting [FILE]`](#sfci-sorting-file)

## `sfci help [COMMAND]`

display help for sfci

```
USAGE
  $ sfci help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.9/src/commands/help.ts)_

## `sfci merge`

Merge your metadata from source path to target org path(Only Profiles in this moment).

```
USAGE
  $ sfci merge

OPTIONS
  -d, --dir=dir        (required) Path of source directory with Salesforce
  -h, --help           show CLI help
  -s, --source=source  (required) Path of source directory with Salesforce
  -t, --type=profile   (required) Type of Metadata(Only profile in this moment)

EXAMPLE
  $ sfci merge -t profile -s force-app/main/default/profile -d src/profiles
```

_See code: [src/commands/merge.ts](https://github.com/silascmv/sfci/blob/v0.0.4/src/commands/merge.ts)_

## `sfci sorting [FILE]`

Sorting your profiles or package.xml

```
USAGE
  $ sfci sorting [FILE]

OPTIONS
  -h, --help                  show CLI help
  -s, --source=source         (required) Path of profile or package to sorting, full path with extension
  -t, --type=profile|package  (required) Type of Metadata(package or profile)
```

_See code: [src/commands/sorting.ts](https://github.com/silascmv/sfci/blob/v0.0.4/src/commands/sorting.ts)_
<!-- commandsstop -->
