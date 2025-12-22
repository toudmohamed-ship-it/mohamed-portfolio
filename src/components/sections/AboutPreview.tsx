"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function AboutPreview() {
    const t = useTranslations('HomePage.AboutPreview');

    return (
        <section className="py-20 bg-navy-50">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto md:mx-0">
                        <Image
                            src="/images/profile.png"
                            alt="Mohamed Toudghi"
                            width={500}
                            height={600}
                            className="w-full h-auto"
                        />
                    </div>
                    {/* Decor */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-purple/10 rounded-full blur-2xl -z-10" />
                </div>

                <div className="order-1 md:order-2 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900">
                        {t('title')}
                    </h2>
                    <div className="space-y-4 text-lg text-navy-600 leading-relaxed">
                        <p>
                            {t('description')}
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link href="/about">
                            <Button variant="outline" className="group">
                                {t('cta')}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
