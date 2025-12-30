
const XLSX = require('xlsx');

const files = [
    "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all bright local.xlsx",
    "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all semrush - Copy.xlsx"
];

files.forEach(filePath => {
    console.log(`\n--- Headers for: ${filePath} ---`);
    try {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);

        if (data.length > 0) {
            console.log(JSON.stringify(Object.keys(data[0]), null, 2));
        } else {
            console.log("Empty sheet.");
        }
    } catch (e) { console.log(e.message); }
});
