import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/ui/ContactForm";
import { PERSONAL_INFO, OPEN_FOR_WORK } from "@/lib/constants";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedUrl, pageAlternates, metaTitle } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ContactPage.metadata' });
    const c = await getTranslations({ locale, namespace: 'ContactPage.closed' });

    return {
        title: metaTitle(OPEN_FOR_WORK ? t('title') : c('meta_title')),
        description: OPEN_FOR_WORK ? t('description') : c('meta_description'),
        openGraph: {
            title: OPEN_FOR_WORK ? t('og_title') : c('meta_title'),
            description: OPEN_FOR_WORK ? t('og_description') : c('meta_description'),
            url: localizedUrl(locale, '/contact'),
        },
        alternates: pageAlternates(locale, '/contact'),
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'ContactPage' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
    const steps = t.raw('steps.items') as string[];

    const channels = [
        { label: t('info.email_label'), value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
        { label: "WhatsApp", value: PERSONAL_INFO.phone, href: PERSONAL_INFO.whatsapp, external: true },
        { label: "LinkedIn", value: t('info.linkedin_label'), href: PERSONAL_INFO.linkedin, external: true },
    ];

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[{ label: tCrumbs('home'), href: '/' }, { label: tCrumbs('contact') }]}
                eyebrow={t('header.eyebrow')}
                title={OPEN_FOR_WORK ? t('header.title') : t('closed.title')}
                lead={OPEN_FOR_WORK ? t('header.subtitle') : t('closed.subtitle')}
            />

            <section className="container-custom py-14 md:py-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16 items-start">
                <div className="flex flex-col gap-12">
                    {OPEN_FOR_WORK && <section id="mini-audit" aria-labelledby="mini-audit-title" className="scroll-mt-24 bg-sage border border-sage-mid rounded-[20px] p-6 md:p-7 flex flex-col gap-4">
                        <h2 id="mini-audit-title" className="m-0 text-2xl font-semibold">{t('mini_audit.title')}</h2>
                        <ul className="list-none m-0 p-0 flex flex-col gap-3">
                            {(t.raw('mini_audit.points') as string[]).map((point) => (
                                <li key={point} className="flex gap-3 items-start text-[16px] text-ink-soft">
                                    <svg className="shrink-0 mt-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E6B57" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <p className="m-0 text-[15px] text-muted">{t('mini_audit.note')}</p>
                    </section>}

                    <div className="flex flex-col gap-4">
                        <h2 className="m-0 text-2xl font-semibold">{t('info.title')}</h2>
                        <ul className="list-none m-0 p-0 border-t border-line">
                            {channels.map((c) => (
                                <li key={c.label}>
                                    <a
                                        href={c.href}
                                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        className="row-link flex items-center justify-between gap-4 py-5 border-b border-line rounded-xl text-ink no-underline hover:text-ink"
                                    >
                                        <span className="flex flex-col gap-0.5 min-w-0">
                                            <span className="font-mono text-xs text-muted">{c.label}</span>
                                            <span className="text-[17px] font-medium truncate" dir="ltr">{c.value}</span>
                                        </span>
                                        <span className="arrow text-xl" aria-hidden="true">→</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {OPEN_FOR_WORK && <div className="flex flex-col gap-5">
                        <h2 className="m-0 text-2xl font-semibold">{t('steps.title')}</h2>
                        <ol className="list-none m-0 p-0 flex flex-col gap-5">
                            {steps.map((step, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <span aria-hidden="true" className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[15px] ${i === 0 ? 'bg-forest text-white' : 'bg-white border-[1.5px] border-forest text-forest'}`}>{i + 1}</span>
                                    <span className="pt-1.5 text-ink-soft text-[17px]">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>}
                </div>

                <ContactForm />
            </section>
        </>
    );
}
