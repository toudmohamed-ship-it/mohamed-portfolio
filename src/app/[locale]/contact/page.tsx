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

            <section className="py-24 md:py-40 bg-bg-primary relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full -z-0" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-mint/5 blur-[120px] rounded-full -z-0" />

                <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    {/* Contact Info */}
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-serif font-bold text-text-primary tracking-tight">{t('info.title')}</h2>
                            <div className="space-y-4">
                                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-6 text-text-secondary hover:text-text-primary transition-all p-6 rounded-3xl glass group border-border-subtle">
                                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-border-subtle group-hover:bg-brand-purple group-hover:text-white transition-all">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em] mb-1">{t('info.email_label')}</span>
                                        <span className="text-lg font-bold text-text-primary">{PERSONAL_INFO.email}</span>
                                    </div>
                                </a>

                                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 text-text-secondary hover:text-text-primary transition-all p-6 rounded-3xl glass group border-border-subtle">
                                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-border-subtle group-hover:bg-brand-purple group-hover:text-white transition-all">
                                        <Linkedin className="h-6 w-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em] mb-1">LinkedIn</span>
                                        <span className="text-lg font-bold text-text-primary">{t('info.linkedin_label')}</span>
                                    </div>
                                </a>

                                <div className="flex items-center gap-6 text-text-secondary p-6 rounded-3xl glass group border-border-subtle">
                                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-border-subtle">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.1em] mb-1">{t('info.phone_label')}</span>
                                        <span className="text-lg font-bold text-text-primary">{PERSONAL_INFO.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hint */}
                        <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-2xl p-6 flex gap-4 items-center">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-mint"></span>
                            </span>
                            <p className="text-text-secondary text-sm font-medium">I usually respond within 2-4 business hours.</p>
                        </div>
                    </div>

                    {/* Contact Form Container */}
                    <div className="relative">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </>
    );
}
