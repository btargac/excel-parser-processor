import { dialog } from 'electron';

export const showOpenDialog = async (browserWindow, data, cb) => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog(browserWindow, {
      buttonLabel: "Choose",
      defaultPath: data.path,
      title: "Choose an output folder",
      properties: ['openDirectory', 'createDirectory']
    });

    if( !canceled && filePaths?.length) {
      cb(data.file, filePaths[0], browserWindow);
    }
  } catch (err) {
    console.log(err);
  }
};
