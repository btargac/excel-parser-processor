# <img src="build/icons/128x128.png" width="64px" align="center" alt="Excel Parser Processor"> Excel Parser Processor

### A Cross-Platform Desktop App for processing all rows of excel files

Simply generates an array of items from the rows of an excel file and does the repetitive tedious operations step by step 
recursively till every item of the array is processed. For example downloading all the URL's in an excel file.

[![Dependency Status][david_img]][david_site]
[![Build Status][travis_img]][travis_site]
[![Github Tag][github-tag-image]][github-tag-url]

#### How to use

You can [download the latest release](https://github.com/btargac/excel-parser-processor/releases) for your operating system
or build it yourself (see [Development](#development)).

Just select or drag & drop an excel file, then select the output folder for the downloaded images or files. All of the 
items in the excel file will be downloaded into the selected folder and you will be notified about the state of ongoing
progress.

#### Sample Excel file structure

|               | A                                                                 |
| ------------- | :---------------------------------------------------------------- |
| 1             | http://www.buraktargac.com/sample_image.gif                       |
| 2             | http://www.buraktargac.com/sample_image.png                       |
| 3             | http://www.buraktargac.com/sample_image.jpg                       |
| .             | ...                                                               |
| .             | ...                                                               |
| n             | Asset URL ( can be any type of file jpg, jpeg, png, txt, doc, etc)|

<br/>

Currently there is no limit for n, I tested with 4000 items and unless your IP is not banned from the publisher there 
is no problem to download as much as you can.

#### Development

You need to have [Node.js](https://nodejs.org) installed on your computer in order to develop & build this app.

```bash
$ git clone https://github.com/btargac/excel-parser-processor.git
$ cd excel-parser-processor
$ npm install
$ npm run build
$ npm start
```

If you are changing the view or renderer related things, you can use webpack's watch feature with

```bash
$ npm run start-renderer-dev
```

After running this command, you'll see a webpack process watching your filesi after a new renderer.bundle.js is generated
you can refresh the excel parser processor app window with `cmd + R` or `ctrl + R` depending on your system.

To generate binaries on your computer after your development is completed, you can run;

```bash
$ npm run dist
```

This will add binaries under /release folder on your project folder.

/release folder is ignored at the repository. Travis will be building the binaries after your branch is merged with master.

#### License
MIT © [Burak Targaç](https://github.com/btargac)

[david_img]: https://david-dm.org/btargac/excel-parser-processor/status.svg
[david_site]: https://david-dm.org/btargac/excel-parser-processor

[travis_img]: https://travis-ci.org/btargac/excel-parser-processor.svg?branch=master
[travis_site]: https://travis-ci.org/btargac/excel-parser-processor

[github-tag-image]: https://img.shields.io/github/tag/btargac/excel-parser-processor.svg
[github-tag-url]: https://github.com/btargac/excel-parser-processor/releases/latest
