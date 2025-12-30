
const XLSX = require('xlsx');

function getSafe(row, key) {
    if (!row || !key) return undefined;
    return row[key];
}

function analyze() {
    // 1. Semrush Data (Keywords)
    console.log("--- SEMRUSH KEYWORDS (Top Opportunities) ---");
    const semrushFile = "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all semrush - Copy.xlsx";
    try {
        const wb = XLSX.readFile(semrushFile);
        const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

        // Dynamic Key Finding
        const keys = Object.keys(data[0] || {});
        const kKeyword = keys.find(k => /keyword/i.test(k));
        const kVol = keys.find(k => /volume/i.test(k));
        const kPos = keys.find(k => /position/i.test(k));
        const kKD = keys.find(k => /difficulty|kd/i.test(k));
        const kUrl = keys.find(k => /url/i.test(k));

        console.log(`Keys mapped: KW='${kKeyword}', Vol='${kVol}', Pos='${kPos}'`);

        // Filter and Sort
        const opportunities = data
            .map(r => ({
                kw: r[kKeyword],
                vol: r[kVol],
                pos: r[kPos],
                kd: r[kKD],
                url: r[kUrl]
            }))
            .filter(r => r.vol > 50) // Filter low volume
            .sort((a, b) => b.vol - a.vol);

        console.log(`Total keywords with Vol > 50: ${opportunities.length}`);
        console.log("Top 15 High Volume Keywords:");
        opportunities.slice(0, 15).forEach(o => {
            console.log(`[${o.pos}] ${o.kw} (Vol: ${o.vol}, KD: ${o.kd}) -> ${o.url}`);
        });

        // Topic Clusters (simple grouping)
        const clusters = {};
        opportunities.forEach(o => {
            const words = o.kw.split(' ');
            const mainWord = words.length > 1 ? words[1] : words[0]; // naive clustering
            if (!clusters[mainWord]) clusters[mainWord] = 0;
            clusters[mainWord]++;
        });

    } catch (e) { console.log("Semrush Error: " + e.message); }

    // 2. Crawl Data (Current Structure)
    console.log("\n--- SITE CRAWL STRUCTURE (Current Content) ---");
    const crawlFile = "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all bright local.xlsx";
    try {
        const wb = XLSX.readFile(crawlFile);
        const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

        const keys = Object.keys(data[0] || {});
        const kAddress = keys.find(k => /address/i.test(k));
        const kTitle = keys.find(k => /title 1/i.test(k)); // specific to frog
        const kH1 = keys.find(k => /h1-1/i.test(k));
        const kWordCount = keys.find(k => /word count/i.test(k));

        const pages = data.map(r => ({
            url: r[kAddress],
            title: r[kTitle],
            h1: r[kH1],
            words: r[kWordCount]
        })).filter(p => p.url && !p.url.includes('.js') && !p.url.includes('.css') && !p.url.includes('.png'));

        console.log("Top 10 Content Pages (by Word Count):");
        pages.sort((a, b) => b.words - a.words).slice(0, 10).forEach(p => {
            console.log(`URL: ${p.url}\n  Title: ${p.title}\n  H1: ${p.h1}\n  Words: ${p.words}\n`);
        });

    } catch (e) { console.log("Crawl Error: " + e.message); }
}

analyze();
