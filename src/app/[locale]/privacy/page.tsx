import PageHeader from "@/components/ui/PageHeader";
import { PERSONAL_INFO } from "@/lib/constants";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageAlternates, localizedUrl } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PrivacyPage' });
    return {
        title: t('title'),
        description: t('description'),
        openGraph: { title: t('title'), description: t('description'), url: localizedUrl(locale, '/privacy'), images: ['/og-image.jpg'] },
        alternates: pageAlternates(locale, '/privacy'),
    };
}

// Describes what the site actually does: Formspree for the contact form, GA4 loaded after interaction, Vercel hosting.
export default async function PrivacyPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'PrivacyPage' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
    const sections = t.raw('sections') as { title: string; body: string }[];

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[{ label: tCrumbs('home'), href: '/' }, { label: t('title') }]}
                title={t('title')}
                lead={t('updated')}
            />
            <section className="container-custom py-14 md:py-20">
                <div className="blog-content max-w-[720px]">
                    {sections.map((s) => (
                        <div key={s.title}>
                            <h2>{s.title}</h2>
                            <p>{s.body}</p>
                        </div>
                    ))}
                    <h2>{t('contact_title')}</h2>
                    <p>
                        {t('contact_body')} <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
                    </p>
                </div>
            </section>
        </>
    );
}
