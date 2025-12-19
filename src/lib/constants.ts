export const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export const PERSONAL_INFO = {
    name: "Mohamed Toudghi",
    title: "SEO & Digital Marketing Specialist",
    email: "m.toudghi@aui.ma",
    phone: "+212 600 000 000", // Placeholder, user to update if needed or remove
    linkedin: "https://www.linkedin.com/in/mohamed-toudghi/", // Placeholder link format
    whatsapp: "https://wa.me/212600000000", // Placeholder
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
