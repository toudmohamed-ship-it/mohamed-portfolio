import { PERSONAL_INFO } from "@/lib/constants";

export default function SchemaMarkup() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: PERSONAL_INFO.name,
        jobTitle: PERSONAL_INFO.title,
        url: "https://www.mohamedtoudghi.com",
        sameAs: [
            PERSONAL_INFO.linkedin,
        ],
        email: PERSONAL_INFO.email,
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Mohamed Toudghi - SEO & Digital Marketing",
        image: "https://www.mohamedtoudghi.com/og-image.jpg",
        "@id": "https://www.mohamedtoudghi.com",
        url: "https://www.mohamedtoudghi.com",
        telephone: PERSONAL_INFO.phone,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Rabat",
            addressCountry: "MA",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 34.0209,
            longitude: -6.8416,
        },
        priceRange: "$$",
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
        </>
    );
}
