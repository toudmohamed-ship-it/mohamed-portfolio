export const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

// Portfolio mode (10 Nov 2026): false hides every call to action that asks for work ("Book a call",
// free mini-audit, final call-to-action sections, "how a project starts") until Mohamed has his
// employer's written approval. The contact page, its form, email, WhatsApp and LinkedIn stay.
// Set to true to switch them all back on. Pages, URLs and SEO content stay the same either way.
export const OPEN_FOR_WORK = false;

export const PERSONAL_INFO = {
    name: "Mohamed Toudghi",
    title: "SEO & Growth Specialist",
    email: "toudmohamed@gmail.com",
    phone: "+212 618 623 792",
    linkedin: "https://www.linkedin.com/in/mohamedtoudghi/",
    whatsapp: "https://wa.me/212618623792"
};

export const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        href: PERSONAL_INFO.linkedin,
        icon: "linkedin",
    },
    {
        name: "Email",
        href: `mailto:${PERSONAL_INFO.email}`,
        icon: "mail",
    },
];
