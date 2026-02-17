export interface Project {
    id: string;
    titleKey: string; // Changed from title to titleKey for localization
    descKey: string;
    tags: string[];
    link: string;
    github?: string;
    color: string;
    image: string; // Added image path
    isCaseStudy?: boolean;
    details?: {
        problemKey: string;
        solutionKey: string;
        impactKey: string;
    };
    techRoles?: Record<string, string>; // Maps tech name to translation key
}

export const PROJECTS: Project[] = [
    {
        id: 'aura-ai',
        titleKey: 'title_aura',
        descKey: 'desc_aura',
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Stripe', 'Framer Motion'],
        link: '#',
        // github: '#', // hidden due to NDA
        color: 'from-amber-400 to-orange-600', // Warm/Gold tone high-energy
        image: '/images/projects/aura.jpg',
        isCaseStudy: true,
        details: {
            problemKey: 'problem_aura',
            solutionKey: 'solution_aura',
            impactKey: 'impact_aura',
        },
        techRoles: {
            'OpenAI API': 'role_openai',
            'Next.js 14': 'role_nextjs',
            'Stripe': 'role_stripe'
        }
    },
    {
        id: 'arabai-academy',
        titleKey: 'title_arabai',
        descKey: 'desc_arabai',
        tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
        link: 'https://arabaiacademy.com/',
        // github: '#', // hidden due to NDA
        color: 'from-sky-400 to-blue-600',
        image: '/images/projects/arabaiacademy.JPG',
        isCaseStudy: true,
        details: {
            problemKey: 'problem_arabai',
            solutionKey: 'solution_arabai',
            impactKey: 'impact_arabai',
        },
        techRoles: {
            'Next.js': 'role_nextjs',
            'Tailwind CSS': 'role_tailwind',
            'Framer Motion': 'role_framer'
        }
    },
    {
        id: 'alandroid-net',
        titleKey: 'title_alandroid',
        descKey: 'desc_alandroid',
        tags: ['Next.js', 'Tailwind CSS', 'Headless CMS', 'SEO'],
        link: 'https://alandroidnet.com/',
        // github: '#', // hidden due to NDA
        color: 'from-green-500 to-emerald-700', // Green/Android theme
        image: '/images/projects/alandroidnet.jpg',
        isCaseStudy: true,
        details: {
            problemKey: 'problem_alandroid',
            solutionKey: 'solution_alandroid',
            impactKey: 'impact_alandroid',
        },
        techRoles: {
            'Next.js': 'role_nextjs',
            'Tailwind CSS': 'role_tailwind',
            'Headless CMS': 'role_headless',
            'SEO': 'role_seo'
        }
    },
];

// Testimonials are now generated dynamically in the component using messages/*.json pool
// and RandomUser API for diversity.

