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
        name: "Mohamed Toudghi, SEO Consultant",
        image: "https://www.mohamedtoudghi.com/og-image.jpg",
        "@id": "https://www.mohamedtoudghi.com",
        url: "https://www.mohamedtoudghi.com",
        telephone: PERSONAL_INFO.phone,
        // Country only: Mohamed works remotely and has not settled on a city.
        address: {
            "@type": "PostalAddress",
            addressCountry: "MA",
        },
        logo: "https://www.mohamedtoudghi.com/logo.png",
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
