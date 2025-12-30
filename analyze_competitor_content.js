
const XLSX = require('xlsx');

function analyzeTopics() {
    const files = [
        { name: "Bright Local", path: "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all bright local.xlsx" },
        { name: "Semrush", path: "C:\\Users\\MYC\\.gemini\\antigravity\\scratch\\mohamed-portfolio\\internal_all semrush - Copy.xlsx" }
    ];

    files.forEach(file => {
        console.log(`\n--- EXTRACTING TOPICS FROM: ${file.name} ---`);
        try {
            const wb = XLSX.readFile(file.path);
            const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

            // Dynamic Key Finding
            const keys = Object.keys(data[0] || {});
            const kTitle = keys.find(k => /title 1/i.test(k));
            const kH1 = keys.find(k => /h1-1/i.test(k));
            const kAddress = keys.find(k => /address/i.test(k));

            if (!kTitle) {
                console.log("Could not find Title column. Available keys:", keys.slice(0, 5));
                return;
            }

            // Extract generic topics (clean titles)
            const topics = data
                .map(r => ({
                    title: r[kTitle] || r[kH1] || "",
                    url: r[kAddress] || ""
                }))
                .filter(t => t.title && t.title.length > 10) // basics
                // Filter out non-blog pages if possible (usually contain /blog/ or similar, but let's just look at text)
                .filter(t => !t.title.includes("Login") && !t.title.includes("Contact") && !t.title.includes("404"));

            console.log(`Found ${topics.length} potential articles.`);
            console.log("Top 20 Samples:");

            // Sample diverse topics (random-ish or top)
            topics.slice(0, 20).forEach((t, i) => {
                console.log(`${i + 1}. ${t.title} \n   (URL: ${t.url})`);
            });

            // Keyword Frequency Analysis in Titles
            const wordMap = {};
            topics.forEach(t => {
                const clean = t.title.toLowerCase().replace(/[^a-z ]/g, '');
                clean.split(' ').forEach(w => {
                    if (w.length > 4 && !["about", "contact", "privacy", "policy", "terms"].includes(w)) {
                        wordMap[w] = (wordMap[w] || 0) + 1;
                    }
                });
            });

            const topWords = Object.entries(wordMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
            console.log("\nTop Recurring Themes (Keywords):");
            topWords.forEach(w => console.log(`- ${w[0]}: ${w[1]}`));

        } catch (e) {
            console.log(`Error reading ${file.name}: ${e.message}`);
        }
    });
}

analyzeTopics();
