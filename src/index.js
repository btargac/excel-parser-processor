import xlsx from 'node-xlsx';
import path from 'path';

const workSheetsFromFile = xlsx.parse(`${path.join(__dirname, '../')}resimlinkleri.xlsx`);

console.log(workSheetsFromFile);
