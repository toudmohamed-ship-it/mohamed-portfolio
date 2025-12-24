import { useTranslations } from 'next-intl';

export default function TrustStrip() {
    const t = useTranslations('HomePage.TrustStrip');

    const companies = [
        "duPont Registry",
        "Webloo",
        "FF Inventory",
        "Landlord Safety Cert",
        "FRMF",
    ];

    return (
        <section className="py-16 border-y border-border-subtle bg-transparent">
            <div className="container-custom">
                <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">
                    {t('label')}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                    {companies.map((company) => (
                        <div key={company} className="text-xl md:text-3xl font-serif font-bold text-text-primary tracking-tight select-none cursor-default">
                            {company}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
