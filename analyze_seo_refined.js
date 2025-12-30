
const XLSX = require('xlsx');

function analyzeSemrush(filePath) {
    console.log(`\n--- Analyzing Semrush: ${filePath} ---`);
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet); // Objects

    // metrics: Keyword, Search Volume, Keyword Difficulty, Position, URL
    // specific key names might vary, so I'll print the first row keys first if unsure, 
    // but based on standard semrush: 'Keyword', 'Search Volume', 'Position', 'KD %', 'Review'

    if (data.length === 0) return;

    // Normalize keys just in case (optional, but good for robustness)
    // Finding exact keys
    const keys = Object.keys(data[0]);
    const keyMap = {
        keyword: keys.find(k => k.toLowerCase().includes('keyword')),
        volume: keys.find(k => k.toLowerCase().includes('volume')),
        kd: keys.find(k => k.toLowerCase().includes('difficulty') || k.toLowerCase().includes('kd')),
        position: keys.find(k => k.toLowerCase().includes('position')),
        url: keys.find(k => k.toLowerCase().includes('url'))
    };

    console.log("Mapped Keys:", keyMap);

    // Sort by Volume
    const sortedByVol = [...data].sort((a, b) => (b[keyMap.volume] || 0) - (a[keyMap.volume] || 0));

    console.log("\nTop 10 Keywords by Volume:");
    sortedByVol.slice(0, 10).forEach(row => {
        console.log(`KD: ${row[keyMap.keyword]} | Vol: ${row[keyMap.volume]} | Pos: ${row[keyMap.position]} | KD: ${row[keyMap.kd]}`);
    });

    // Striking Distance (Pos 11-30)
    const striking = data.filter(r => r[keyMap.position] >= 11 && r[keyMap.position] <= 30);
    console.log(`\nStriking Distance Keywords (Pos 11-30): ${striking.length} found. Top 5:`);
    striking.sort((a, b) => (b[keyMap.volume] || 0) - (a[keyMap.volume] || 0)).slice(0, 5).forEach(row => {
        console.log(`KW: ${row[keyMap.keyword]} | Vol: ${row[keyMap.volume]} | Pos: ${row[keyMap.position]}`);
    });
}

function analyzeBrightLocal(filePath) {
    console.log(`\n--- Analyzing BrightLocal: ${filePath} ---`);
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    if (data.length === 0) return;

    const keys = Object.keys(data[0]);
    console.log("BrightLocal Keys:", keys);

    // Usually has 'Keyword', 'Google Rank', 'Search Volume'
    const keyMap = {
        keyword: keys.find(k => k.toLowerCase().includes('keyword')),
        rank: keys.find(k => k.toLowerCase().includes('google rank') || k.toLowerCase().includes('rank')),
        volume: keys.find(k => k.toLowerCase().includes('search volume') || k.toLowerCase().includes('volume'))
    };

    // Sort by Rank (Ascending)
    const sortedByRank = [...data].sort((a, b) => (a[keyMap.rank] || 100) - (b[keyMap.rank] || 100));

    console.log("\nTop 10 Local Rankings:");
    sortedByRank.slice(0, 10).forEach(row => {
        console.log(`KW: ${row[keyMap.keyword]} | Rank: ${row[keyMap.rank]} | Vol: ${row[keyMap.volume]}`);
    });
}

try {
    analyzeBrightLocal("C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all bright local.xlsx");
} catch (e) {
    console.log("Error processing BrightLocal:", e.message);
}

try {
    analyzeSemrush("C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all semrush - Copy.xlsx");
} catch (e) {
    console.log("Error processing Semrush:", e.message);
}
