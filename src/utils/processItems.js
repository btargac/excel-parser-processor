import path from 'path';
import { createWriteStream } from 'fs';
import fetch from 'electron-fetch';
import { URL } from 'url';
import xlsx from 'node-xlsx';
import isUrl from 'is-url';

let initialItemsLength;
let processedItemsCount;
let incompatibleItems = [];
let erroneousItems = [];

const _resetProcessData = () => {
  initialItemsLength = 0;
  processedItemsCount = 0;
  incompatibleItems.length = 0;
  erroneousItems.length = 0;
};

const processItem = async (item, outputPath) => {

  const [ itemUrl, newName ] = item;
  const url = new URL(itemUrl);
  const itemName = newName ? `${newName}${path.extname(url.pathname)}` : path.basename(url.pathname);

  const response = await fetch(itemUrl);

  if (response.ok) {

    const dest = createWriteStream(path.join(outputPath, itemName));
    response.body.pipe(dest);

  } else {
    throw {
      status: response.status,
      statusText: response.statusText,
      itemInfo: url.href
    }
  }

};

const processItems = async (rowItems, outputPath, win) => {
  const itemsLength = rowItems.length;

  for (let i = 0; i < itemsLength; i += 20) {
    const requests = rowItems.slice(i, i + 20).map((item) => {
      return processItem(item, outputPath)
        .then(() => {
          const unprocessedItems = erroneousItems.length + incompatibleItems.length;
          const percentage = Math.abs(++processedItemsCount / (initialItemsLength - unprocessedItems)) * 100;

          win.webContents.send('main-message', {
            type: 'progress',
            data: percentage
          });
        })
        .catch(err => {
          erroneousItems.push(err.itemInfo);

          win.webContents.send('main-message', {
            type: 'process-error',
            data: err
          });
        });
    });

    await Promise.all(requests)
      .catch(e => console.log(`Error processing for the batch ${i} - ${e}`));
  }

  const logFileStream = createWriteStream(path.join(
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
    win.webContents.send('main-message', {
      type: 'process-completed',
      data: {
        processedItemsCount,
        incompatibleItems,
        erroneousItems,
        logFilePath: logFileStream.path
      }
    });
  });

  logFileStream.end();
};

export const processFile = async (filePath, outputPath, browserWindow) => {

  _resetProcessData();

  const workSheetsFromFile = xlsx.parse(filePath);
  const dataRows = workSheetsFromFile.flatMap(page => page.data).filter(item => item.length);
  const validRows = dataRows.filter(row => row.some(text => isUrl(text)));

  incompatibleItems = dataRows.filter(row => !row.some(text => isUrl(text)));

  initialItemsLength = validRows.length;

  if (initialItemsLength) {
    browserWindow.webContents.send('main-message', {
      type: 'process-started'
    });

    await processItems(validRows, outputPath, browserWindow);
  } else {
    browserWindow.webContents.send('main-message', {
      type: 'file-error',
      data: 'No item to process'
    });
  }

};
