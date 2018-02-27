import path from 'path';
import { app, BrowserWindow } from 'electron';
import processItems from './utils/processItems';

// to tell webpack that we also need to process some styles
import './styles/index.scss';

let mainWindow;

processItems();

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false
  });

  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

});
