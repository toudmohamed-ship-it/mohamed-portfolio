export default function TrustStrip() {
    const companies = [
        "duPont Registry",
        "Webloo",
        "FF Inventory",
        "Landlord Safety Cert",
        "FRMF",
    ];

    return (
        <section className="py-12 border-y border-navy-100 bg-white">
            <div className="container-custom">
                <p className="text-center text-sm font-semibold text-navy-400 uppercase tracking-widest mb-8">
                    Experience across teams and organizations including
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {companies.map((company) => (
                        <div key={company} className="text-xl md:text-2xl font-serif font-bold text-navy-300 select-none">
                            {company}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
