# <img src="build/icons/128x128.png" width="64px" align="center" alt="Excel Parser Processor"> Excel Parser Processor

Simply generates an array of items from the rows of a given excel file and do the tedious operations step by step 
recursively till every item of the array is processed.

[![Dependency Status][david_img]][david_site]
[![Build Status][travis_img]][travis_site]
[![Github Tag][github-tag-image]][github-tag-url]

### A Cross-Platform Desktop App for processing all rows of excel files

Just select or drag & drop an excel file, then select the output folder for the downloaded images or files. All of the 
items in the excel file will be downloaded for you.

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

[david_img]: https://david-dm.org/btargac/excel-parser-processor/status.svg
[david_site]: https://david-dm.org/btargac/excel-parser-processor

[travis_img]: https://travis-ci.org/btargac/excel-parser-processor.svg?branch=master
[travis_site]: https://travis-ci.org/btargac/excel-parser-processor

[github-tag-image]: https://img.shields.io/github/tag/btargac/excel-parser-processor.svg
[github-tag-url]: https://github.com/btargac/excel-parser-processor/releases/latest
