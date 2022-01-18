import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { showOpenDialog } from './dialogs';
import { processFile } from "./utils/processItems";

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
  });

  // Open the DevTools during development.
  if(process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
};

app.on('ready', () => {
  ipcMain.on('file-dropped', (event, filePath) => {
    const [window] = BrowserWindow.getAllWindows();

    showOpenDialog(window, filePath, processFile);
  });

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
