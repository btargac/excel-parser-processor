import path from 'path';
import fs from 'fs';
import fetch from "node-fetch";
import {URL} from "url";
import xlsx from "node-xlsx";
import isUrl from "is-url";

const imageNameRegex = /[A-z0-9\-]*.(jpg|png)$/ig;

let initialItemsLength = 0;

let processedItemsCount = 0;

const processItems = (rowItems, filePath, outputPath, win) => {

  const imageUrl = new URL(rowItems.pop());
  const imageName = imageUrl.pathname.match(imageNameRegex)[0];

  fetch(imageUrl)
    .then(response => {

      if (response.ok) {

        const dest = fs.createWriteStream(path.join(outputPath, imageName));
        response.body.pipe(dest);

        const percentage = Math.abs(++processedItemsCount / initialItemsLength) * 100;

        win.webContents.send('progress', percentage);

        if (rowItems.length) {
          processItems(rowItems, filePath, outputPath, win);
        } else {
          console.log('process completed');
          win.webContents.send('process-completed');
        }

      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          imageInfo: imageUrl.href
        })
      }

    })
    .catch(err => {
      win.webContents.send('process-error', err);
      processItems(rowItems, filePath, outputPath, win);
    });

};

export const processFile = (filePath, outputPath, browserWindow) => {

  const workSheetsFromFile = xlsx.parse(filePath);

  const pagesWithData = workSheetsFromFile.filter(page => page.data.length);

  const rowItems = pagesWithData.reduce((prev, curr) => prev.concat(...curr.data), []).filter(text => isUrl(text));

  initialItemsLength = rowItems.length;

  processedItemsCount = 0;

  browserWindow.webContents.send('process-started');

  processItems(rowItems, filePath, outputPath, browserWindow);

};
