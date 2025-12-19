import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/ui/ContactForm";
import { Mail, Linkedin, Phone } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

export const metadata = {
    title: "Contact | Get a Free SEO Consultation",
    description: "Get in touch for SEO audits, digital marketing consulting, or web optimization inquiries. Free 15-minute discovery call available. Based in Morocco, serving international clients.",
    keywords: ["Contact SEO Specialist", "Free SEO Consultation", "SEO Audit Request", "Digital Marketing Inquiry", "Hire SEO Expert Morocco"],
    openGraph: {
        title: "Contact Mohamed Toudghi | Free SEO Consultation",
        description: "Ready to improve your website's SEO? Get in touch for a free consultation. Expert SEO services for businesses worldwide.",
        images: ['/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://mohamed-toudghi.com/contact',
    },
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


                        {/* Calendly Section - Hidden until booking link is available
                        <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5" /> Book a Consultation
                            </h3>
                            <p className="text-navy-200 mb-6 text-sm">
                                Schedule a free 15-minute discovery call to discuss your project.
                            </p>
                            <div className="w-full bg-white/10 border border-white/20 rounded-lg h-12 flex items-center justify-center text-sm font-mono text-white/50 mb-4">
                                [Calendly Widget Placeholder]
                            </div>
                            <Button className="w-full bg-brand-purple text-white border-none hover:bg-purple-600">
                                Book Now
                            </Button>
                        </div>
                        */}
                    </div>


                    {/* Contact Form */}
                    <ContactForm />

                </div>
            </section>
        </>
    );
}
