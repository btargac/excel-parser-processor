import path from 'path';
import fs from 'fs';
import fetch from "node-fetch";
import {URL} from "url";
import xlsx from "node-xlsx";
import isUrl from "is-url";

const imageNameRegex = /[A-z0-9\-]*.(jpg|png)$/ig;

let initialItemsLength = 0;

let processedItemsCount = 0;

const processItems = (rowItems, filePath, outputPath) => {

  const imageUrl = new URL(rowItems.pop());
  const imageName = imageUrl.pathname.match(imageNameRegex)[0];

  fetch(imageUrl)
    .then(res => {
      const dest = fs.createWriteStream(path.join(outputPath, imageName));
      res.body.pipe(dest);

      console.log(`% ${ Math.abs(++processedItemsCount / initialItemsLength) * 100 }`);

      if (rowItems.length) {
        processItems(rowItems, filePath, outputPath);
      } else {
        console.log('process finished');
      }

    })
    .catch(err => {
      console.log(err);
      processItems(rowItems, filePath, outputPath);
    });

};

export const processFile = (filePath, outputPath) => {

  const workSheetsFromFile = xlsx.parse(filePath);

  const pagesWithData = workSheetsFromFile.filter(page => page.data.length);

  const rowItems = pagesWithData.reduce((prev, curr) => prev.concat(...curr.data), []).filter(text => isUrl(text));

  initialItemsLength = rowItems.length;

  processedItemsCount = 0;

  processItems(rowItems, filePath, outputPath);

};
