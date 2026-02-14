'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const t = useTranslations('Projects');

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-white/20 transition-colors duration-500"
        >
            {/* Abstract Cover */}
            <div
                className={`h-48 w-full bg-linear-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
            />

            {/* Hover Link Icons */}
            <div className="absolute top-4 end-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                    >
                        <Github className="w-4 h-4 text-white" />
                    </a>
                )}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                    <ExternalLink className="w-4 h-4 text-white" />
                </a>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    {project.title}
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
}
