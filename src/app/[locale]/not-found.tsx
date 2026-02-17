'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white relative overflow-hidden">
            {/* Glitch Effect Background */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="relative z-10 text-center px-4">
                <div className="mb-8 flex justify-center">
                    <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20 animate-pulse">
                        <AlertTriangle className="w-16 h-16 text-red-500" />
                    </div>
                </div>

                <h1 className="text-6xl md:text-9xl font-bold font-mono tracking-tighter mb-4 text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">
                    404
                </h1>

                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    {t('title')}
                </h2>

                <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                    {t('description')}
                </p>

                <Link href="/">
                    <Button size="lg" className="group">
                        <Home className="w-4 h-4 me-2 group-hover:scale-110 transition-transform" />
                        {t('back_home')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
