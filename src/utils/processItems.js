import path from 'path';
import fs from 'fs';
import fetch from "node-fetch";
import {URL} from "url";
import xlsx from "node-xlsx";
import isUrl from "is-url";

let initialItemsLength = 0;

let processedItemsCount = 0;

const processItems = (rowItems, filePath, outputPath, win) => {

  const itemUrl = new URL(rowItems.pop());

  const itemName = path.basename(itemUrl.pathname);

  fetch(itemUrl)
    .then(response => {

      if (response.ok) {

        const dest = fs.createWriteStream(path.join(outputPath, itemName));
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
          imageInfo: itemUrl.href
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

  if(initialItemsLength) {
    browserWindow.webContents.send('process-started');

    processItems(rowItems, filePath, outputPath, browserWindow);
  } else {
    browserWindow.webContents.send('file-error', {
      message: 'No item to process'
    });
  }

};
