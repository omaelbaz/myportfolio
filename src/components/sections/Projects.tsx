'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { PROJECTS } from '@/lib/data';

export function Projects() {
    const t = useTranslations('Projects');

    return (
        <section id="projects" className="py-32 relative">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
