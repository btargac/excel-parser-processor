import path from 'path';
import fs from 'fs';
import fetch from "electron-fetch";
import {URL} from "url";
import xlsx from "node-xlsx";
import isUrl from "is-url";

let initialItemsLength;
let processedItemsCount;
let incompatibleItems;
let erroneousItems = [];

const _resetProcessData = () => {
  initialItemsLength = 0;
  processedItemsCount = 0;
  erroneousItems.length = 0;
};

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

          const logFileStream = fs.createWriteStream(path.join(
            outputPath,
            `excel-parser-processor-log${Date.now()}.txt`)
          );

          logFileStream.write(
            [
              `Processed Items Count: ${processedItemsCount}`,
              '-----',
              `Incompatible Items Count: ${incompatibleItems.length};`,
              `${incompatibleItems.join('\r\n')}`,
              '-----',
              `Erroneous Items Count: ${erroneousItems.length};`,
              `${erroneousItems.join('\r\n')}`,
              '-----'
            ].join('\r\n'), 'utf8');

          logFileStream.on('finish', () => {
            win.webContents.send('process-completed', {
              processedItemsCount,
              incompatibleItems,
              erroneousItems,
              logFilePath: logFileStream.path
            });
          });

          logFileStream.end();
        }

      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          itemInfo: itemUrl.href
        })
      }

    })
    .catch(err => {
      erroneousItems.push(err.itemInfo);
      win.webContents.send('process-error', err);
      processItems(rowItems, filePath, outputPath, win);
    });

};

export const processFile = (filePath, outputPath, browserWindow) => {

  _resetProcessData();

  const workSheetsFromFile = xlsx.parse(filePath);

  const pagesWithData = workSheetsFromFile.filter(page => page.data.length).reduce((prev, curr) => prev.concat(...curr.data), []);

  const rowItems = pagesWithData.filter(text => isUrl(text));

  incompatibleItems = pagesWithData.filter(text => !isUrl(text));

  initialItemsLength = rowItems.length;

  if(initialItemsLength) {
    browserWindow.webContents.send('process-started');

    processItems(rowItems, filePath, outputPath, browserWindow);
  } else {
    browserWindow.webContents.send('file-error', {
      message: 'No item to process'
    });
  }

};
