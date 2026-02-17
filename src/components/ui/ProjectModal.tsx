import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink, Github, Zap, Target, Lightbulb, Share2, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Project } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { useState, useCallback } from 'react'; // Added useCallback optimization
import { toast } from 'sonner';
import { TechBadge } from '@/components/ui/TechBadge'; // Import reusable component

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

export function ProjectModal({ project, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }: ProjectModalProps) {
    const t = useTranslations('Projects');
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const [isCopied, setIsCopied] = useState(false);

    // Optimize handlers with useCallback (best practice for passing to children triggers)
    const handleShare = useCallback(() => {
        if (!project) return;
        navigator.clipboard.writeText(project.link || window.location.href);
        setIsCopied(true);
        toast.success(isArabic ? 'تم نسخ الرابط!' : 'Link copied to clipboard!');
        setTimeout(() => setIsCopied(false), 2000);
    }, [project, isArabic]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
                        {/* Navigation Arrows (Floating) */}
                        {hasPrev && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
                                className={cn(
                                    "absolute top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md pointer-events-auto hidden md:flex",
                                    isArabic ? "right-4 lg:right-12" : "left-4 lg:left-12"
                                )}
                                aria-label="Previous Project"
                            >
                                <ChevronLeft className={cn("w-6 h-6", isArabic && "rotate-180")} />
                            </button>
                        )}
                        {hasNext && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onNext?.(); }}
                                className={cn(
                                    "absolute top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md pointer-events-auto hidden md:flex",
                                    isArabic ? "left-4 lg:left-12" : "right-4 lg:right-12"
                                )}
                                aria-label="Next Project"
                            >
                                <ChevronRight className={cn("w-6 h-6", isArabic && "rotate-180")} />
                            </button>
                        )}

                        <motion.div
                            key={project.id} // Re-render animation on project change
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl relative"
                        >
                            {/* Header Actions */}
                            <div className={cn(
                                "absolute top-4 z-50 flex gap-2",
                                isArabic ? "left-4" : "right-4"
                            )}>
                                {/* Share Button */}
                                <button
                                    onClick={handleShare}
                                    className="p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                                    title="Share Project"
                                >
                                    {isCopied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                                </button>
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Hero Image - Optimized with sizes and priority */}
                            <div className="relative h-64 md:h-80 w-full shrink-0">
                                <Image
                                    src={project.image}
                                    alt={t(project.titleKey)}
                                    fill
                                    priority // LCP Optimization
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent" />

                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                                    >
                                        {t(project.titleKey)}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-slate-300 text-lg md:text-xl max-w-2xl"
                                    >
                                        {t(project.descKey)}
                                    </motion.p>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Left Column: Case Study Details */}
                                <div className="lg:col-span-2 space-y-8">
                                    {project.details && (
                                        <>
                                            {/* Problem */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-rose-400">
                                                    <Target className="w-5 h-5" />
                                                    <h3 className="text-lg font-bold uppercase tracking-wider">{t('label_problem')}</h3>
                                                </div>
                                                <p className="text-slate-300 leading-relaxed text-lg">
                                                    {t(project.details.problemKey)}
                                                </p>
                                            </div>

                                            {/* Solution */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-emerald-400">
                                                    <Lightbulb className="w-5 h-5" />
                                                    <h3 className="text-lg font-bold uppercase tracking-wider">{t('label_solution')}</h3>
                                                </div>
                                                <p className="text-slate-300 leading-relaxed text-lg">
                                                    {t(project.details.solutionKey)}
                                                </p>
                                            </div>

                                            {/* Impact */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-amber-400">
                                                    <Zap className="w-5 h-5" />
                                                    <h3 className="text-lg font-bold uppercase tracking-wider">{t('label_impact')}</h3>
                                                </div>
                                                <p className="text-slate-300 leading-relaxed text-lg font-medium">
                                                    {t(project.details.impactKey)}
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {!project.details && (
                                        <p className="text-slate-500 italic">No case study details available for this project yet.</p>
                                    )}
                                </div>

                                {/* Right Column: Tech & Links */}
                                <div className="space-y-8">
                                    {/* Tech Stack - Using Reusable Component */}
                                    <div>
                                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-white/10 pb-2">
                                            {t('label_tech_stack')}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <TechBadge
                                                    key={tag}
                                                    tag={tag}
                                                    roleKey={project.techRoles?.[tag]}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors group"
                                        >
                                            <span className="font-bold">{t('liveDemo')}</span>
                                            <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </a>
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors group"
                                            >
                                                <span className="font-bold">{t('sourceCode')}</span>
                                                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
