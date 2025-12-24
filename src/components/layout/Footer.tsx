import { Link } from "@/i18n/routing";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import { Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-bg-primary border-t border-border-subtle py-24 md:py-32">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 md:gap-12">
                    {/* Brand */}
                    <div className="space-y-6 lg:col-span-2">
                        <h3 className="font-serif text-3xl font-bold text-text-primary tracking-tight group cursor-default">
                            Mohamed <span className="text-brand-purple">Toudghi</span>
                        </h3>
                        <p className="text-text-secondary text-base leading-relaxed max-w-sm">
                            High-performance SEO & Digital Marketing strategies that drive growth and maximize ROI for global brands.
                        </p>

                        {/* Social / Contact Icons Quick */}
                        <div className="flex items-center gap-4 pt-4">
                            {[
                                { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
                                { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
                                { icon: Phone, href: `https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`, label: "WhatsApp" }
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-brand-purple hover:bg-brand-purple/5 transition-all duration-300"
                                    aria-label={item.label}
                                >
                                    <item.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-text-primary text-xs uppercase tracking-[0.2em] mb-8">Explore</h4>
                        <ul className="space-y-4">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-text-secondary hover:text-brand-mint text-sm transition-colors block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Quick Links */}
                    <div>
                        <h4 className="font-bold text-text-primary text-xs uppercase tracking-[0.2em] mb-8">Specialties</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Technical SEO", id: "tech_seo" },
                                { label: "Local SEO", id: "local_seo" },
                                { label: "Analytics", id: "analytics" },
                                { label: "Performance", id: "wp_optimization" }
                            ].map((s) => (
                                <li key={s.id}>
                                    <Link href={`/services#${s.id}`} className="text-text-secondary hover:text-brand-mint text-sm transition-colors block">
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-text-primary text-xs uppercase tracking-[0.2em] mb-8">Information</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-text-secondary hover:text-brand-mint text-sm transition-colors block">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-secondary hover:text-brand-mint text-sm transition-colors block">
                                    Terms of Use
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-24 pt-12 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-text-secondary font-medium uppercase tracking-widest">
                    <p>© 2025 Mohamed Toudghi. Built with precision.</p>
                    <div className="flex items-center gap-8">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
                            Open for projects
                        </span>
                        <span>Casablanca, MA</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
