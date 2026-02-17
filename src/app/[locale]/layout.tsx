import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Roboto_Condensed, Cairo } from "next/font/google";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/Toaster";
import { GoogleAnalytics } from '@next/third-parties/google';
import { getTranslations } from 'next-intl/server';
import { JsonLd } from "@/components/shared/JsonLd";
import { SITE_URL } from "@/lib/constants";
import "../globals.css";

// Configure fonts
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      template: '%s | Omar Elbaz',
      default: t('title'),
    },
    description: t('description'),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        fr: '/fr',
        ar: '/ar',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: SITE_URL,
      siteName: 'Omar Elbaz Portfolio',
      images: [
        {
          url: '/images/prf.png', // Fallback to profile image, ideally replace with 1200x630 og-image.png
          width: 800,
          height: 800,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/prf.png'],
    },
    keywords: ['Omar Elbaz', 'عمر الباز', 'Full Stack Engineer', 'Next.js', 'React', 'SaaS Architect', 'Casablanca', 'Morocco'],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/images/fav.png',
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Handle RTL for Arabic
  const isArabic = locale === 'ar';
  const direction = isArabic ? 'rtl' : 'ltr';

  // Select font based on locale
  // We use the variable for Tailwind, but also apply the className for global font application
  const fontClass = isArabic ? cairo.className : robotoCondensed.className;
  const fontVariable = isArabic ? cairo.variable : robotoCondensed.variable;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${fontClass} ${fontVariable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <Toaster />
      </body>
    </html>
  );
}
