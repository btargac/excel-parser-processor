import path from 'path';
import { createWriteStream, mkdir } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fetch from 'electron-fetch';
import { URL } from 'url';
import xlsx from 'node-xlsx';
import isUrl from 'is-url';
import mime from 'mime-types';

import generateFileName from './generateFileName';

const streamPipeline = promisify(pipeline);

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

  const [ itemUrl, newName, subFolderName ] = item;
  const url = new URL(itemUrl);
  const itemName = newName ? `${newName}${path.extname(url.pathname)}` : path.basename(url.pathname);

  // usage of 'If-None-Match' header is just to force the server not to return an 304 since electron net does not
  // correctly return content-type headers when converting an 304 to 200 internally
  // see issues https://github.com/electron/electron/issues/27895, https://github.com/electron/electron/pull/21552
  // and https://github.com/electron/electron/issues/20631
  const response = await fetch(itemUrl, {headers: {'If-None-Match': null}});

  if (response.ok) {
    if (subFolderName) {
      await mkdir(`${outputPath}/${subFolderName}`, { recursive: true }, () => {});
    }

    const contentType = response.headers.get('content-type');
    const extension = mime.extension(contentType);
    const fileName = generateFileName(itemName, extension);
    // file system flag 'wx' stands for:
    // Open file for writing. The file is created (if it does not exist), but fails if the path exists. (x causes to throw)
    const dest = createWriteStream(path.join(outputPath, subFolderName || '', fileName), {flags: 'wx'});

    try {
      await streamPipeline(response.body, dest);
    } catch (error) {
      throw {
        statusText: error.message,
        itemInfo: error.path
      }
    }
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
    const requests = rowItems
      .slice(i, i + 20)
      .map(item => processItem(item, outputPath)
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
        })
      );

    await Promise.allSettled(requests);
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
