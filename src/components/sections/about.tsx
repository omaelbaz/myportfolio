'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import {
    Code, Server, Layout, Database, Terminal, Cloud, Cpu, Layers,
    type LucideIcon
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { useRef, useState, type MouseEvent } from 'react';

/* ─── Tech Stack Data with Brand Colors ─── */
interface TechItem {
    name: string;
    icon: LucideIcon;
    color: string;
    category: string;
}

const STACK: TechItem[] = [
    { name: 'React', icon: Code, color: '#61DAFB', category: 'Frontend' },
    { name: 'Next.js', icon: Layout, color: '#FFFFFF', category: 'Frontend' },
    { name: 'Tailwind', icon: Layers, color: '#38B2AC', category: 'Frontend' },
    { name: 'TypeScript', icon: Terminal, color: '#3178C6', category: 'Language' },
    { name: 'Node.js', icon: Server, color: '#339933', category: 'Backend' },
    { name: 'PostgreSQL', icon: Database, color: '#336791', category: 'Backend' },
    { name: 'Docker', icon: Cpu, color: '#2496ED', category: 'DevOps' },
    { name: 'AWS', icon: Cloud, color: '#FF9900', category: 'Cloud' },
];

/* ─── 3D Tilt Card ─── */
function TiltCard({ tech, index }: { tech: TechItem; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    // Mouse position for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3D tilt values
    const rotateX = useSpring(0, { stiffness: 250, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 250, damping: 20 });

    const spotlightBackground = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${tech.color}15, transparent 80%)`;
    const borderGlow = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, ${tech.color}40, transparent 80%)`;

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);

        // 3D tilt (subtle, max ±12deg)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        rotateX.set(((y - centerY) / centerY) * -12);
        rotateY.set(((x - centerX) / centerX) * 12);
    }

    function handleMouseLeave() {
        setHovered(false);
        rotateX.set(0);
        rotateY.set(0);
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className="group relative rounded-xl sm:rounded-2xl p-px cursor-pointer"
        >
            {/* Animated border glow */}
            <motion.div
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: borderGlow }}
            />

            {/* Card inner */}
            <div className="relative rounded-xl sm:rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/6 overflow-hidden h-full">
                {/* Spotlight radial */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: spotlightBackground }}
                />

                <div className="relative z-10 p-4 sm:p-5 md:p-6 flex flex-col items-center text-center gap-3 sm:gap-4 h-full justify-center">
                    {/* Icon */}
                    <div
                        className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl border transition-all duration-500"
                        style={{
                            borderColor: hovered ? `${tech.color}30` : 'rgba(255,255,255,0.06)',
                            backgroundColor: hovered ? `${tech.color}10` : 'rgba(255,255,255,0.03)',
                        }}
                    >
                        <tech.icon
                            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-500"
                            style={{
                                color: hovered ? tech.color : '#64748b',
                                filter: hovered ? `drop-shadow(0 0 8px ${tech.color}60)` : 'none',
                            }}
                            strokeWidth={1.5}
                        />
                    </div>

                    {/* Name */}
                    <span
                        className="font-mono text-xs sm:text-sm font-medium transition-colors duration-500"
                        style={{ color: hovered ? tech.color : '#94a3b8' }}
                    >
                        {tech.name}
                    </span>

                    {/* Category pill */}
                    <span
                        className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono px-1.5 py-0.5 sm:px-2 rounded-full transition-all duration-500 opacity-80"
                        style={{
                            color: hovered ? tech.color : '#475569',
                            backgroundColor: hovered ? `${tech.color}10` : 'rgba(255,255,255,0.03)',
                        }}
                    >
                        {tech.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Spotlight Grid Container ─── */
function SpotlightGrid() {
    const gridRef = useRef<HTMLDivElement>(null);
    const spotlightX = useMotionValue(-100);
    const spotlightY = useMotionValue(-100);

    const gridSpotlight = useMotionTemplate`radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(6,182,212,0.04), transparent 80%)`;

    function handleGridMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        spotlightX.set(e.clientX - rect.left);
        spotlightY.set(e.clientY - rect.top);
    }

    return (
        <div
            ref={gridRef}
            onMouseMove={handleGridMouseMove}
            className="relative"
        >
            {/* Grid-level ambient glow */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: gridSpotlight }}
            />

            {/* Responsive Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 relative z-10">
                {STACK.map((tech, index) => (
                    <TiltCard key={tech.name} tech={tech} index={index} />
                ))}
            </div>
        </div>
    );
}

/* ─── About Section ─── */
export function About() {
    const t = useTranslations('About');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    return (
        <section id="about" className="py-20 sm:py-24 relative overflow-hidden">
            {/* Background ambient blobs */}
            <div className="absolute top-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

            <Container>
                {/* Bio Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
                >
                    <h2 className={cn(
                        "text-3xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight py-2",
                        isArabic && "leading-relaxed"
                    )}>
                        {t('title')}
                    </h2>
                    <p className={cn(
                        "text-base sm:text-lg text-slate-400 leading-relaxed px-4 sm:px-0",
                        isArabic && "leading-loose font-semibold"
                    )}>
                        {t('description')}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-12 sm:gap-16 mt-10 sm:mt-12 pt-8 border-t border-white/10">
                        <div className="text-center">
                            <span className="text-3xl sm:text-4xl font-bold text-primary block mb-1">5+</span>
                            <span className="text-[10px] sm:text-xs text-slate-500 font-mono uppercase tracking-widest">
                                {t('stats_exp')}
                            </span>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl sm:text-4xl font-bold text-primary block mb-1">25+</span>
                            <span className="text-[10px] sm:text-xs text-slate-500 font-mono uppercase tracking-widest">
                                {t('stats_projects')}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/10" />
                    <span className={cn(
                        "text-[10px] sm:text-xs font-mono uppercase text-slate-500",
                        isArabic ? "tracking-normal font-bold" : "tracking-[0.3em]"
                    )}>
                        {t('tech_arsenal')}
                    </span>
                    <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/10" />
                </motion.div>

                {/* Spotlight Grid */}
                <SpotlightGrid />
            </Container>
        </section>
    );
}
