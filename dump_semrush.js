
const XLSX = require('xlsx');
const file = "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all semrush - Copy.xlsx";
const wb = XLSX.readFile(file);
const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
console.log(JSON.stringify(data.slice(0, 5), null, 2));
