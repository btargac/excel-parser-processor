import { dialog } from 'electron';

export const showOpenDialog = (browserWindow, defaultPath, cb) => {
  dialog.showOpenDialog(browserWindow, {
    buttonLabel: "Choose",
    defaultPath,
    title: "Choose an output folder",
    properties: ['openDirectory', 'createDirectory']
  }, (filePaths) => {
    if(filePaths && filePaths.length) {

      cb(defaultPath, filePaths[0]);

    }
  });
};
