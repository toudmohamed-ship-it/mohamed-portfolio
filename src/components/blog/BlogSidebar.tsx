import Button from "../ui/Button";
import { MessageCircle } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface BlogSidebarProps {
    locale: string;
}

export default async function BlogSidebar({ locale }: BlogSidebarProps) {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'BlogPage' });

    return (
        <div className="space-y-12 sticky top-32">
            {/* CTA Card */}
            <div className="glass p-8 rounded-[2rem] border-border-subtle overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 blur-3xl -z-0 group-hover:bg-brand-purple/20 transition-all" />

                <h3 className="text-2xl font-serif font-bold text-text-primary mb-4 relative z-10 leading-tight">
                    {t('sidebar.cta_title')}
                </h3>
                <p className="text-text-secondary mb-8 relative z-10 text-sm leading-relaxed">
                    {t('sidebar.cta_desc')}
                </p>

                <div className="relative z-10">
                    <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-brand-purple hover:bg-brand-purple/80 text-white rounded-2xl h-14 font-bold uppercase tracking-widest text-xs">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {t('sidebar.cta_button') || "Chat on WhatsApp"}
                        </Button>
                    </a>
                </div>
            </div>

            {/* Newsletter or other widgets could go here */}
        </div>
    );
}
