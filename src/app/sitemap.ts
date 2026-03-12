import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = routing.locales;
    
    // Define the routes that need to be localized
    const routes = [
        { path: '', changeFrequency: 'yearly' as const, priority: 1.0 },
        { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.8 },
        { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.5 },
    ];

    return routes.flatMap((route) => {
        return locales.map((locale) => {
            const path = route.path === '' ? '' : route.path;
            const url = `${SITE_URL}/${locale}${path}`;

            // Generate alternate languages for this specific route
            const languages = locales.reduce((acc, l) => {
                acc[l] = `${SITE_URL}/${l}${path}`;
                return acc;
            }, {} as Record<string, string>);

            return {
                url,
                lastModified: new Date(),
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: {
                    languages,
                },
            };
        });
    });
}
