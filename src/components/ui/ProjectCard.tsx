import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
    project: Project;
    index: number;
    onClick?: () => void;
}

export const ProjectCard = memo(function ProjectCard({ project, index, onClick }: ProjectCardProps) {
    const t = useTranslations('Projects');

    return (
        <motion.div
            layoutId={`project-${project.id}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-white/20 transition-colors duration-500 will-change-transform cursor-pointer"
        >
            {/* Image Cover */}
            <div className="relative h-64 w-full overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={`${t(project.titleKey)} - High-performance web application built with Next.js and React`}
                        fill
                        placeholder="empty" // Use "blur" if blurDataURL is available
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div
                        className={`h-full w-full bg-linear-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                    />
                )}
                {/* Overlay gradient for better text contrast if needed, or just aesthetic */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Case Study Badge */}
                {project.isCaseStudy && (
                    <div className="absolute top-4 start-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 z-20">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{t('case_study')}</span>
                    </div>
                )}
            </div>

            {/* Hover Link Icons */}
            <div className="absolute top-4 end-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" onClick={(e) => e.stopPropagation()}>
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                        aria-label="GitHub Repository"
                    >
                        <Github className="w-4 h-4 text-white" />
                    </a>
                )}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                    aria-label="Live Demo"
                >
                    <ExternalLink className="w-4 h-4 text-white" />
                </a>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    {t(project.titleKey)}
                </h3>
                <p className="text-slate-400 mb-4 line-clamp-2 text-start">
                    {t(project.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs bg-white/5 text-slate-300 px-2 py-1 rounded font-mono"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
});
