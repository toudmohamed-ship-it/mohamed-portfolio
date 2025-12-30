
const XLSX = require('xlsx');
const path = require('path');

const files = [
    "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all bright local.xlsx",
    "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all semrush - Copy.xlsx"
];

files.forEach(filePath => {
    console.log(`\n--- Analyzing ${path.basename(filePath)} ---`);
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON to inspect
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Array of arrays

        if (data.length > 0) {
            console.log(`Rows: ${data.length}`);
            console.log("Columns:", data[0]); // Header row
            console.log("\nFirst 5 rows (data):");
            // Print next 5 rows
            for (let i = 1; i < Math.min(6, data.length); i++) {
                console.log(data[i]);
            }
        } else {
            console.log("Sheet is empty.");
        }
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
    }
});
