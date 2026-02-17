'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { PROJECTS, type Project } from '@/lib/data';
import { cn } from '@/lib/utils';
// import { AnimatePresence } from 'framer-motion'; // Removed unused import

// Dynamic import for Modal to reduce initial bundle size
const ProjectModal = dynamic(() => import('@/components/ui/ProjectModal').then(mod => mod.ProjectModal), {
    ssr: false, // Modal is client-only interaction
});

export function Projects() {
    const t = useTranslations('Projects');
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Optimize handlers
    const handleProjectClick = useCallback((project: Project) => {
        if (project.isCaseStudy) {
            setSelectedProject(project);
        }
    }, []);

    const handleClose = useCallback(() => setSelectedProject(null), []);

    const handleNext = useCallback(() => {
        if (selectedProject) {
            const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
            if (currentIndex < PROJECTS.length - 1) {
                setSelectedProject(PROJECTS[currentIndex + 1]);
            }
        }
    }, [selectedProject]);

    const handlePrev = useCallback(() => {
        if (selectedProject) {
            const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
            if (currentIndex > 0) {
                setSelectedProject(PROJECTS[currentIndex - 1]);
            }
        }
    }, [selectedProject]);

    // Memoize usage of PROJECTS if needed, but it's constant.
    // However, findIndex results could be calculated outside render potentially if performace is critical, 
    // but for 6 items it's negligible.

    return (
        <section id="projects" className="py-32 relative">
            <Container>
                <div className="text-center mb-16">
                    <h2 className={cn(
                        "text-3xl md:text-4xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight py-2",
                        isArabic && "leading-relaxed"
                    )}>
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => handleProjectClick(project)}
                        />
                    ))}
                </div>
            </Container>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={handleClose}
                onNext={handleNext}
                onPrev={handlePrev}
                hasNext={selectedProject ? PROJECTS.findIndex(p => p.id === selectedProject.id) < PROJECTS.length - 1 : false}
                hasPrev={selectedProject ? PROJECTS.findIndex(p => p.id === selectedProject.id) > 0 : false}
            />
        </section>
    );
}
