export interface Project {
    id: string;
    title: string;
    descKey: string;
    tags: string[];
    link: string;
    github?: string;
    color: string;
}

export const PROJECTS: Project[] = [
    {
        id: 'ai-saas',
        title: 'AI SaaS Platform',
        descKey: 'desc_1',
        tags: ['Next.js', 'OpenAI', 'Prisma', 'Stripe'],
        link: '#',
        github: '#',
        color: 'from-violet-600 to-purple-900',
    },
    {
        id: 'fintech-dash',
        title: 'Fintech Dashboard',
        descKey: 'desc_2',
        tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
        link: '#',
        github: '#',
        color: 'from-cyan-500 to-blue-900',
    },
    {
        id: 'ecom-headless',
        title: 'E-Commerce Headless',
        descKey: 'desc_3',
        tags: ['Next.js', 'Shopify', 'Tailwind', 'GraphQL'],
        link: '#',
        github: '#',
        color: 'from-emerald-500 to-teal-900',
    },
];
