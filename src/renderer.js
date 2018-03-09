import { ipcRenderer } from 'electron';
import $ from 'jquery';

// we also need to process some styles with webpack
import fontawesome from '@fortawesome/fontawesome';
import { faCloudUploadAlt } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faCloudUploadAlt);
import './styles/index.scss';

const drop = document.querySelector('input');
const filesInput = document.querySelector('#files');

const handleIn = () => {

  $(".drop").css({
    "border": "4px dashed #3023AE",
    "background": "rgba(0, 153, 255, .05)"
  });

  $(".cont").css({
    "color": "#3023AE"
  });

};

const handleOut = () => {

  $(".drop").css({
    "border": "3px dashed #DADFE3",
    "background": "transparent"
  });

  $(".cont").css({
    "color": "#8E99A5"
  });

};

const inEvents = ['dragenter', 'dragover'];
const outEvents = ['dragleave', 'dragend', 'mouseout', 'drop'];

inEvents.forEach(event => drop.addEventListener(event, handleIn));
outEvents.forEach(event => drop.addEventListener(event, handleOut));

const handleFileSelect = (event) => {
  const files = event.target.files;

  for (let file of files) {

    // Only process excel files.
    if (!file.type.match('officedocument.*')) {
      continue;
    }

    ipcRenderer.send('file-dropped', file.path);
  }

  event.preventDefault();
  event.stopPropagation();

};

filesInput.addEventListener('change', handleFileSelect);
