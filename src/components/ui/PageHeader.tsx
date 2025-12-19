import clsx from "clsx";

interface PageHeaderProps {
    title: string;
    subtitle: string;
    supportingText?: string;
    className?: string;
    active?: boolean; // Just to match potential future props
}

export default function PageHeader({ title, subtitle, supportingText, className }: PageHeaderProps) {
    return (
        <section className={clsx("py-20 bg-navy-50 border-b border-navy-100", className)}>
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6 max-w-4xl">
                    {title}
                </h1>
                <p className="text-xl text-navy-800 max-w-3xl leading-relaxed mb-4 font-medium">
                    {subtitle}
                </p>
                {supportingText && (
                    <p className="text-lg text-navy-600 max-w-2xl leading-relaxed">
                        {supportingText}
                    </p>
                )}
            </div>
        </section>
    );
}
