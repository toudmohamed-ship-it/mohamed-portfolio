import { PERSONAL_INFO } from "@/lib/constants";
import { BASE_URL, jsonLd } from "@/lib/seo";
import { SERVICE_PAGES } from "@/lib/services";

const wiki = (name: string, page: string) => ({ "@type": "Thing", name, sameAs: `https://en.wikipedia.org/wiki/${page}` });

// Country only: Mohamed works remotely and has not settled on a city.
const ADDRESS = { "@type": "PostalAddress", addressCountry: "MA" };

// Site-wide entity graph: one Person (the central entity), the website he publishes and the business he runs.
// Other pages reference the Person by "@id" instead of repeating him. Only facts that appear on the site are used.
export default function SchemaMarkup() {
    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${BASE_URL}/#person`,
                name: PERSONAL_INFO.name,
                jobTitle: PERSONAL_INFO.title,
                description: "SEO consultant in Morocco, working remotely on technical SEO, local SEO and GA4 tracking for service businesses, B2B and SaaS.",
                url: BASE_URL,
                image: `${BASE_URL}/images/portrait.webp`,
                email: PERSONAL_INFO.email,
                telephone: PERSONAL_INFO.phone,
                address: ADDRESS,
                alumniOf: { "@type": "CollegeOrUniversity", name: "Al Akhawayn University", sameAs: "https://en.wikipedia.org/wiki/Al_Akhawayn_University" },
                knowsLanguage: ["ar", "en", "fr"],
                knowsAbout: [
                    wiki("Search engine optimization", "Search_engine_optimization"),
                    wiki("Local search engine optimisation", "Local_search_engine_optimisation"),
                    wiki("Google Analytics", "Google_Analytics"),
                    wiki("Google Search Console", "Google_Search_Console"),
                    wiki("Google Tag Manager", "Google_Tag_Manager"),
                    wiki("Schema.org", "Schema.org"),
                    wiki("Web performance", "Web_performance"),
                ],
                sameAs: [PERSONAL_INFO.linkedin],
            },
            {
                "@type": "WebSite",
                "@id": `${BASE_URL}/#website`,
                name: "Mohamed Toudghi",
                url: BASE_URL,
                inLanguage: ["en", "fr", "ar"],
                publisher: { "@id": `${BASE_URL}/#person` },
                about: { "@id": `${BASE_URL}/#person` },
            },
            {
                "@type": "ProfessionalService",
                "@id": `${BASE_URL}/#business`,
                name: "Mohamed Toudghi, SEO Consultant",
                url: BASE_URL,
                image: `${BASE_URL}/og-image.jpg`,
                logo: `${BASE_URL}/logo.png`,
                telephone: PERSONAL_INFO.phone,
                email: PERSONAL_INFO.email,
                address: ADDRESS,
                areaServed: ["MA", "GB", "US"],
                founder: { "@id": `${BASE_URL}/#person` },
                knowsLanguage: ["ar", "en", "fr"],
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "SEO services",
                    itemListElement: SERVICE_PAGES.map((s) => ({
                        "@type": "Offer",
                        itemOffered: { "@id": `${BASE_URL}/services/${s.slug}#service` },
                    })),
                },
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />;
}
