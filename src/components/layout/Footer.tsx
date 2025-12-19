import Link from "next/link";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import { Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-navy-50 py-16 mt-auto">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4 col-span-1 md:col-span-1">
                        <h3 className="font-serif text-2xl font-bold text-navy-900">
                            Mohamed Toudghi
                        </h3>
                        <p className="text-navy-600 text-sm leading-relaxed font-medium">
                            SEO & Digital Marketing Specialist
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-navy-900 mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-navy-600 hover:text-brand-purple text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-navy-900 mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-navy-600 text-sm">
                                <Mail size={18} className="shrink-0 mt-0.5" />
                                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-brand-purple">
                                    {PERSONAL_INFO.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-navy-600 text-sm">
                                <Linkedin size={18} className="shrink-0 mt-0.5" />
                                <a
                                    href={PERSONAL_INFO.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-purple"
                                >
                                    LinkedIn Profile
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-navy-600 text-sm">
                                <Phone size={18} className="shrink-0 mt-0.5" />
                                <a
                                    href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-purple"
                                >
                                    WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal / Extra */}
                    <div>
                        <h4 className="font-bold text-navy-900 mb-6">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-navy-600 hover:text-brand-purple text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-navy-600 hover:text-brand-purple text-sm">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-8 text-xs text-navy-400">
                            © 2025 Mohamed Toudghi. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
