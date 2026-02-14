'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code, Server, Layout, Database, Terminal, Cloud, Cpu, Layers } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const STACK = [
    { name: 'Next.js', icon: Layout, category: 'Frontend' },
    { name: 'React', icon: Code, category: 'Frontend' },
    { name: 'Tailwind', icon: Layers, category: 'Frontend' },
    { name: 'TypeScript', icon: Terminal, category: 'Language' },
    { name: 'Node.js', icon: Server, category: 'Backend' },
    { name: 'PostgreSQL', icon: Database, category: 'Backend' },
    { name: 'Docker', icon: Cpu, category: 'DevOps' },
    { name: 'AWS', icon: Cloud, category: 'Cloud' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100
        }
    }
};

export function About() {
    const t = useTranslations('About');

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Column 1: Biography */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                {t('title')}
                            </h2>
                            <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed text-start">
                                <p>{t('description')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                            <div>
                                <span className="text-4xl font-bold text-primary block mb-2">5+</span>
                                <span className="text-sm text-slate-500 font-mono uppercase tracking-wider">{t('stats_exp')}</span>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-primary block mb-2">20+</span>
                                <span className="text-sm text-slate-500 font-mono uppercase tracking-wider">{t('stats_projects')}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 2: Tech Arsenal */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background pointer-events-none z-10 lg:hidden" />
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                        >
                            {STACK.map((tech) => (
                                <motion.div
                                    key={tech.name}
                                    variants={itemVariants}
                                    className="group relative bg-slate-900/50 border border-white/5 p-4 rounded-xl hover:border-primary/50 transition-all duration-300 overflow-hidden backdrop-blur-sm"
                                >
                                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex flex-col items-center text-center gap-3">
                                        <tech.icon className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                                        <span className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors">
                                            {tech.name}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
