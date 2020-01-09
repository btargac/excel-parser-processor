import { dialog } from 'electron';

export const showOpenDialog = (browserWindow, defaultPath, cb) => {
  dialog.showOpenDialog(browserWindow, {
    buttonLabel: "Choose",
    defaultPath,
    title: "Choose an output folder",
    properties: ['openDirectory', 'createDirectory']
  }).then(({ canceled, filePaths }) => {
    if( !canceled && filePaths?.length) {
      cb(defaultPath, filePaths[0], browserWindow);
    }
  }).catch(err => {
    console.log(err);
  })
};
