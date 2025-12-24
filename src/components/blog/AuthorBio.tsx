import { Linkedin, Globe, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AuthorBio() {
    return (
        <div className="glass p-8 md:p-12 rounded-[3rem] border-border-subtle relative overflow-hidden group hover:border-brand-purple/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/5 blur-[120px] -z-0 group-hover:bg-brand-purple/10 transition-colors duration-700" />

            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                <div className="relative shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] overflow-hidden border-2 border-brand-purple/20 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                        <div className="w-full h-full bg-gradient-to-br from-brand-purple/30 to-brand-mint/30 flex items-center justify-center">
                            <span className="text-5xl font-serif font-bold text-brand-purple">M</span>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-bg-primary border border-border-subtle rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 size={16} className="text-brand-mint" />
                    </div>
                </div>

                <div className="flex-grow space-y-6 text-center md:text-left">
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-brand-mint uppercase tracking-[0.3em] opacity-80">Author & Strategist</span>
                        <h3 className="text-3xl font-serif font-bold text-text-primary tracking-tight">Mohamed Toudghi</h3>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold text-text-secondary uppercase tracking-widest opacity-60">
                            <span className="flex items-center gap-2">
                                <MapPin size={12} className="text-brand-purple" />
                                Morocco
                            </span>
                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                            <span>Scale-up Specialist</span>
                        </div>
                    </div>

                    <p className="text-text-secondary leading-relaxed max-w-2xl text-lg italic opacity-90">
                        "I help businesses in Morocco and beyond dominate search results through data-driven SEO strategies, technical precision, and a deep understanding of local search behavior."
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
                        <a href="https://linkedin.com/in/mohamedtoudghi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary hover:text-brand-purple transition-all duration-300 group/link">
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover/link:border-brand-purple/30 transition-colors">
                                <Linkedin size={18} />
                            </div>
                            LinkedIn
                        </a>
                        <a href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary hover:text-brand-mint transition-all duration-300 group/link">
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover/link:border-brand-mint/30 transition-colors">
                                <Globe size={18} />
                            </div>
                            Portfolio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
