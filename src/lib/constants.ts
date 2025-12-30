export const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export const PERSONAL_INFO = {
    name: "Mohamed Toudghi",
    title: "SEO & Digital Marketing Specialist",
    email: "toudmohamed@gmail.com",
    phone: "+212 618 623 792",
    linkedin: "https://www.linkedin.com/in/mohamed-toudghi-53a43825b/",
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
