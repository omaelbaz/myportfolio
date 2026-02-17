import { Person, WithContext } from 'schema-dts';
import { SITE_URL } from '@/lib/constants';

export function JsonLd() {
    const jsonLd: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Omar Elbaz',
        alternateName: 'عمر الباز',
        url: SITE_URL,
        image: `${SITE_URL}/images/prf.png`,
        sameAs: [
            'https://www.linkedin.com/in/omaelbaz',
            'https://github.com/omaelbaz',
        ],
        jobTitle: 'Senior Full Stack Engineer',
        worksFor: {
            '@type': 'Organization',
            name: 'Freelance / Stealth Startup', // Adjust as needed
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Casablanca',
            addressCountry: 'MA',
        },
        description: 'Senior Full Stack Engineer specializing in React, Next.js, and Scalable SaaS Architectures. Based in Casablanca, Morocco.',
        knowsAbout: ['Next.js', 'React', 'TypeScript', 'Node.js', 'AWS', 'SaaS Architecture', 'AI Solutions'],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
