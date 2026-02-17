'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Layout, Cpu, Globe, LucideIcon } from 'lucide-react';

interface ExpertiseItem {
    icon: LucideIcon;
    key: string;
}

const expertises: ExpertiseItem[] = [
    { icon: Code, key: 'title_1' },
    { icon: Layout, key: 'title_2' },
    { icon: Cpu, key: 'title_3' },
    { icon: Globe, key: 'title_4' },
];

export function Hero() {
    const t = useTranslations('Hero');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const top = element.offsetTop - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-dvh flex items-center overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 bg-grid opacity-30 pointer-events-none" />

            {/* Spotlight Glow behind text */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <Container className="relative z-10 h-full pt-20">
                <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-start text-start will-change-transform"
                    >
                        {/* Terminal Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono mb-8 border border-primary/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            {t('badge')}
                        </div>

                        {/* Headline */}
                        <h1 className={cn(
                            "text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight py-2 wrap-break-word",
                            isArabic && "leading-relaxed"
                        )}>
                            {(() => {
                                const title = t('title');
                                const firstSpaceIndex = title.indexOf(' ');
                                if (firstSpaceIndex === -1) return <span className="block text-white">{title}</span>;

                                const firstWord = title.substring(0, firstSpaceIndex);
                                const restOfTitle = title.substring(firstSpaceIndex + 1);

                                return (
                                    <>
                                        <span className="block text-white">{firstWord}</span>
                                        <span className="block bg-linear-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                            {restOfTitle}
                                        </span>
                                    </>
                                );
                            })()}
                        </h1>

                        {/* Key Expertise Grid */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                            {expertises.map((item, index) => (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.05 * index }}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800/60 transition-colors group will-change-transform"
                                >
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                                        {t(`expertises.${item.key}`)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="group relative overflow-hidden bg-white text-black hover:bg-slate-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] border-none">
                                <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="flex items-center gap-2 cursor-pointer">
                                    {t('cta_primary')}
                                    <ArrowRight className={cn(
                                        "w-4 h-4 transition-transform group-hover:translate-x-1",
                                        isArabic && "rotate-180 group-hover:-translate-x-1"
                                    )} />
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                                </a>
                            </Button>

                            <Button asChild variant="ghost" size="lg" className="text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="cursor-pointer">{t('cta_secondary')}</a>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Column: 3D Visuals */}
                    {/* Right Column: Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative w-full flex items-center justify-center lg:justify-end lg:h-full order-first lg:order-last mb-10 lg:mb-0 will-change-transform"
                    >
                        <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-4/5 lg:aspect-square">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 pointer-events-none" />

                            {/* Image Container with Premium Border & Shadow */}
                            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_-10px_rgba(6,182,212,0.25)]">
                                <Image
                                    src="/images/prf.png"
                                    alt="Omar Elbaz"
                                    fill
                                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />

                                {/* Gradient Overlay / Mask at bottom */}
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className={cn(
                                    "absolute -bottom-6 right-6 z-20 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl",
                                    isArabic && "flex-row-reverse left-6 right-auto"
                                )}
                            >
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-xs font-medium text-slate-200">{t('system_status')}</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
