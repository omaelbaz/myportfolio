import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: [
        // Match all pathnames EXCEPT for:
        // - /api (API routes)
        // - /_next (Next.js internals)
        // - /_vercel (Vercel internals)
        // - all files with an extension (e.g. favicon.ico, image.jpg)
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ]
};
