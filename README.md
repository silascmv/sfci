sfci
====

sfci tools

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sfci.svg)](https://npmjs.org/package/sfci)
[![Downloads/week](https://img.shields.io/npm/dw/sfci.svg)](https://npmjs.org/package/sfci)
[![License](https://img.shields.io/npm/l/sfci.svg)](https://github.com/https://github.com/silascmv/sfci/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sfci
$ sfci COMMAND
running command...
$ sfci (-v|--version|version)
sfci/0.0.2 linux-x64 node-v17.1.0
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

Merge your metadata from source path to target org path

```
USAGE
  $ sfci merge

OPTIONS
  -d, --dir=dir        (required) Path of source directory with Salesforce
  -h, --help           show CLI help
  -s, --source=source  (required) Path of source directory with Salesforce
  -t, --type=profile   (required) Type of Metadata(Only profile in this moment

EXAMPLE
  $ sfci merge -t profile -s metadata -d src
```

_See code: [src/commands/merge.ts](https://github.com/silascmv/sfci/blob/v0.0.2/src/commands/merge.ts)_
<!-- commandsstop -->
