import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

interface PageHeaderProps {
    eyebrow?: string;
    title: string;
    lead?: string;
    crumbs: Crumb[];
    locale: string;
    children?: React.ReactNode;
}

// Shared header for inner pages: breadcrumbs, a small mono label, the H1 and one lead paragraph. Left-aligned, no motion on the H1.
export default function PageHeader({ eyebrow, title, lead, crumbs, locale, children }: PageHeaderProps) {
    return (
        <section className="relative border-b border-line bg-paper overflow-hidden">
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-50 [background-image:radial-gradient(#D9D3C7_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_75%)]"
            />
            <div className="container-custom relative pt-10 md:pt-14 pb-14 md:pb-20 flex flex-col gap-6">
                <Breadcrumbs items={crumbs} locale={locale} />
                <div className="flex flex-col gap-5 max-w-[760px] pt-4">
                    {eyebrow && <p className="in d1 m-0 font-mono text-[13px] text-forest tracking-wide">{eyebrow}</p>}
                    <h1 className="m-0 text-[36px] sm:text-5xl lg:text-[56px] leading-[1.08] font-semibold tracking-[-0.03em]">{title}</h1>
                    {lead && <p className="in d2 m-0 text-lg md:text-[19px] text-muted max-w-[620px]">{lead}</p>}
                </div>
                {children}
            </div>
        </section>
    );
}
