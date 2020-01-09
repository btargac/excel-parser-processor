const { ipcRenderer } = require('electron');

process.once('loaded', () => {
  // ipc communication is handled with postMessage and event listeners since ipcRenderer cannot be imported to renderer
  // process for security reasons
  window.addEventListener('message', event => {
    const message = event.data;
    const { data, type } = message;

    ipcRenderer.send(type, data);
  });

  ipcRenderer.on('main-message', (event, payload) => {
    const { data, type } = payload;

    window.postMessage({
      type,
      data
    }, '*');
  });
});
