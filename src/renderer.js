import { ipcRenderer } from 'electron';
// to tell webpack that we also need to process some styles
import './styles/index.scss';

document.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();

  for (let file of event.dataTransfer.files) {
    ipcRenderer.send('file-dropped', file.path);
  }
});

document.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.stopPropagation();
});
