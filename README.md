# <img src="build/icons/128x128.png" width="64px" align="center" alt="Excel Parser Processor"> Excel Parser Processor

### A Desktop app for processing all rows of Excel files

Simply generates an array of items from the rows of an Excel file and does the repetitive tedious operations step by step
recursively till every item of the array is processed. For example downloads all the URL's in an Excel file.

[![Dependency Status][dependabot-badge]][dependabot-url]
[![Build Status][gh-actions-image]][gh-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]
[![codecov][codecov-image]][codecov-url]
[![Backers on Open Collective](https://opencollective.com/excel-parser-processor/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/excel-parser-processor/sponsors/badge.svg)](#sponsors)
[![Open Source Helpers](https://www.codetriage.com/btargac/excel-parser-processor/badges/users.svg)](https://www.codetriage.com/btargac/excel-parser-processor)
[![CodeFactor][CodeFactor-image]][CodeFactor-url]
[![CodeQL][codeql-image]][codeql-url]

#### How to use

You can [download the latest release](https://github.com/btargac/excel-parser-processor/releases) for your operating system
or build it yourself (see [Development](#development)).

Just select or drag & drop an Excel file, then select the output folder for the downloaded images or files. All the items
in the Excel file will be downloaded into the selected folder, and you will be notified about the state of ongoing progress.

#### Sample Excel file structure

|               | A                                                                 | B                         | C                         |
| ------------- | :---------------------------------------------------------------- | :-------------------------| :-------------------------|
| 1             | https://www.buraktargac.com/sample_image.gif                      | optional-sample-file-name | optional-sub-folder-name  |
| 2             | https://www.buraktargac.com/sample_image.png                      | optional-sample-file-name | optional-sub-folder-name  |
| 3             | https://www.buraktargac.com/sample_image.jpg                      |                           |                           |
| .             | ...                                                               |                           |                           |
| .             | ...                                                               |                           |                           |
| n             | Asset URL ( can be any type of file jpg, jpeg, png, txt, doc, etc)|                           |                           |

<br/>

Currently there is no limit for `n`, I tested with 4000 items and unless your IP is banned from the publisher there
is no problem to download as much as you can.

#### Demo
<img src="excel-parser-processor.gif" width="640px" height="480px" align="center" alt="Excel Parser Processor Demo">

#### Development

You need to have [Node.js](https://nodejs.org) installed on your computer in order to develop & build this app.

```bash
$ git clone https://github.com/btargac/excel-parser-processor.git
$ cd excel-parser-processor
$ npm install
$ npm run build
$ npm start
```

If you are changing the view or renderer related things, you can use Webpack's watch feature with

```bash
$ npm run start-renderer-dev
```

After running this command, you'll see a webpack process watching your files after a new renderer.bundle.js is generated
you can refresh the Excel parser processor app window with `cmd + R` or `ctrl + R` depending on your system.

To generate binaries on your computer after your development is completed, you can run;

```bash
$ npm run dist
```

This will add binaries under `/release` folder on your project folder.

`/release` folder is ignored at the repository. Github Actions will be building the binaries after your branch is merged with master.

## Contributors

This project exists thanks to all the people who contribute. [[Code of Conduct](CODE_OF_CONDUCT.md)].
<a href="graphs/contributors"><img src="https://opencollective.com/excel-parser-processor/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/excel-parser-processor#backer)]

<a href="https://opencollective.com/excel-parser-processor#backers" target="_blank"><img src="https://opencollective.com/excel-parser-processor/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/excel-parser-processor#sponsor)]

<a href="https://opencollective.com/excel-parser-processor/sponsor/0/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/1/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/2/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/3/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/4/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/5/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/6/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/7/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/8/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/excel-parser-processor/sponsor/9/website" target="_blank"><img src="https://opencollective.com/excel-parser-processor/sponsor/9/avatar.svg"></a>



#### License
MIT © [Burak Targaç](https://github.com/btargac)

[dependabot-badge]: https://badgen.net/github/dependabot/btargac/excel-parser-processor?icon=dependabot
[dependabot-url]: https://github.com/btargac/excel-parser-processor/security/dependabot

[gh-actions-image]: https://github.com/btargac/excel-parser-processor/actions/workflows/main.yml/badge.svg?branch=master
[gh-actions-url]: https://github.com/btargac/excel-parser-processor/actions/workflows/main.yml

[github-tag-image]: https://img.shields.io/github/tag/btargac/excel-parser-processor.svg
[github-tag-url]: https://github.com/btargac/excel-parser-processor/releases/latest

[codecov-image]: https://codecov.io/gh/btargac/excel-parser-processor/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/btargac/excel-parser-processor

[CodeFactor-image]: https://www.codefactor.io/repository/github/btargac/excel-parser-processor/badge
[CodeFactor-url]: https://www.codefactor.io/repository/github/btargac/excel-parser-processor

[codeql-image]: https://github.com/btargac/excel-parser-processor/actions/workflows/codeql-analysis.yml/badge.svg?branch=master
[codeql-url]: https://github.com/btargac/excel-parser-processor/actions/workflows/codeql-analysis.yml
