import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = routing.locales;
    const defaultLocale = routing.defaultLocale;

    const routes: { path: string; changeFrequency: 'yearly' | 'monthly' | 'weekly'; priority: number }[] = [
        { path: '', changeFrequency: 'yearly', priority: 1.0 },
        { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
        { path: '/projects', changeFrequency: 'weekly', priority: 0.8 },
        { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    ];

    return routes.flatMap((route) =>
        locales.map((locale) => {
            const languages: Record<string, string> = {};
            for (const l of locales) {
                languages[l] = `${SITE_URL}/${l}${route.path}`;
            }
            languages['x-default'] = `${SITE_URL}/${defaultLocale}${route.path}`;

            return {
                url: `${SITE_URL}/${locale}${route.path}`,
                lastModified: new Date(),
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: {
                    languages,
                },
            };
        })
    );
}
