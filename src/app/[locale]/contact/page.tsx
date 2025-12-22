import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/ui/ContactForm";
import { Mail, Linkedin, Phone } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ContactPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('og_title'),
            description: t('og_description'),
            images: ['/og-image.jpg'],
        },
        alternates: {
            canonical: `https://www.mohamedtoudghi.com/${locale === 'en' ? '' : locale + '/'}contact`,
        },
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'ContactPage' });

    return (
        <>
            <PageHeader
                title={t('header.title')}
                subtitle={t('header.subtitle')}
            />

            <section className="py-20 bg-white">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info & Calendly */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">{t('info.title')}</h2>
                            <div className="space-y-6">
                                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 text-navy-600 hover:text-brand-purple transition-colors p-4 rounded-xl bg-navy-50 group">
                                    <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                        <Mail className="h-6 w-6 text-brand-purple" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-navy-400 font-semibold uppercase tracking-wider">{t('info.email_label')}</span>
                                        <span className="font-medium text-navy-900">{PERSONAL_INFO.email}</span>
                                    </div>
                                </a>

                                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-navy-600 hover:text-brand-purple transition-colors p-4 rounded-xl bg-navy-50 group">
                                    <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                        <Linkedin className="h-6 w-6 text-brand-purple" />
                                    </div>
                                    <span className="font-medium">{t('info.linkedin_label')}</span>
                                </a>

                                <div className="flex items-center gap-4 text-navy-600 p-4 rounded-xl bg-navy-50 group">
                                    <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                        <Phone className="h-6 w-6 text-brand-purple" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-navy-400 font-semibold uppercase tracking-wider">{t('info.phone_label')}</span>
                                        <span className="font-medium text-navy-900">{PERSONAL_INFO.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <ContactForm />

                </div>
            </section>
        </>
    );
}
