import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { Mail, Linkedin, Calendar, Phone } from "lucide-react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/constants";

export const metadata = {
    title: "Contact Me | Mohamed Toudghi",
    description: "Get in touch for SEO audits, digital marketing consulting, or web optimization inquiries.",
};

export default function ContactPage() {
    return (
        <>
            <PageHeader
                title="Get In Touch"
                subtitle="Ready to grow your business? Fill out the form below or book a call."
            />

            <section className="py-20 bg-white">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info & Calendly */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 text-navy-600 hover:text-brand-purple transition-colors p-4 rounded-xl bg-navy-50 group">
                                    <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                        <Mail className="h-6 w-6 text-brand-purple" />
                                    </div>
                                    <span className="font-medium">{PERSONAL_INFO.email}</span>
                                </a>

                                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-navy-600 hover:text-brand-purple transition-colors p-4 rounded-xl bg-navy-50 group">
                                    <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                        <Linkedin className="h-6 w-6 text-brand-purple" />
                                    </div>
                                    <span className="font-medium">Connect on LinkedIn</span>
                                </a>

                                <div className="flex items-center gap-4 text-navy-600 p-4 rounded-xl bg-navy-50 group">
                                    <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                        <Phone className="h-6 w-6 text-brand-purple" />
                                    </div>
                                    <span className="font-medium">{PERSONAL_INFO.phone}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5" /> Book a Consultation
                            </h3>
                            <p className="text-navy-200 mb-6 text-sm">
                                Schedule a free 15-minute discovery call to discuss your project.
                            </p>
                            {/* Embed Placeholder */}
                            <div className="w-full bg-white/10 border border-white/20 rounded-lg h-12 flex items-center justify-center text-sm font-mono text-white/50 mb-4">
                                [Calendly Widget Placeholder]
                            </div>
                            <Button className="w-full bg-brand-purple text-white border-none hover:bg-purple-600">
                                Book Now
                            </Button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white border border-navy-100 p-8 md:p-10 rounded-3xl shadow-lg">
                        <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">Send a Message</h2>
                        <p className="text-navy-500 mb-8">I usually respond within 24 hours.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-navy-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-lg bg-navy-50 border border-navy-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-navy-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg bg-navy-50 border border-navy-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        placeholder="john@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="service" className="text-sm font-semibold text-navy-700">Service Needed</label>
                                <select
                                    id="service"
                                    defaultValue=""
                                    className="w-full px-4 py-3 rounded-lg bg-navy-50 border border-navy-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all appearance-none"
                                >
                                    <option value="" disabled>Select a service...</option>
                                    <option value="seo">Technical SEO</option>
                                    <option value="marketing">Digital Marketing Strategy</option>
                                    <option value="analytics">Analytics & Tracking</option>
                                    <option value="web">Website Optimization</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-navy-700">Message</label>
                                <textarea
                                    id="message"
                                    className="w-full px-4 py-3 rounded-lg bg-navy-50 border border-navy-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all min-h-[150px]"
                                    placeholder="Tell me about your project or goals..."
                                    required
                                ></textarea>
                            </div>

                            <Button type="submit" size="lg" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>

                </div>
            </section>
        </>
    );
}
