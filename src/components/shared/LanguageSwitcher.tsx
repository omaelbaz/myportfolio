'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const LANGUAGES = [
    { code: 'en' as const, label: 'English', flag: 'EN' },
    { code: 'fr' as const, label: 'Français', flag: 'FR' },
    { code: 'ar' as const, label: 'العربية', flag: 'AR' },
];

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setOpen(false);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Change language"
                aria-expanded={open}
                className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 border cursor-pointer',
                    open
                        ? 'border-primary/50 text-primary bg-primary/10'
                        : 'border-white/15 text-slate-400 hover:text-white hover:border-white/30 bg-white/5'
                )}
            >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang.flag}</span>
                <ChevronDown
                    className={cn(
                        'w-3 h-3 transition-transform duration-300',
                        open && 'rotate-180'
                    )}
                />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute end-0 z-50 mt-2 w-44 rounded-xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-xl shadow-xl shadow-black/20 overflow-hidden"
                    >
                        <div className="py-1">
                            {LANGUAGES.map((lang) => {
                                const isActive = locale === lang.code;
                                const isRtl = locale === 'ar';
                                return (
                                    <button
                                        key={lang.code}
                                        onClick={() => switchLocale(lang.code)}
                                        className={cn(
                                            'w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer group',
                                            isActive
                                                ? 'text-primary bg-primary/5'
                                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                                        )}
                                        dir={isRtl ? 'rtl' : 'ltr'}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-mono font-bold w-6 text-center opacity-60">
                                                {lang.flag}
                                            </span>
                                            <span className={cn("font-medium", isRtl && "text-right")}>
                                                {lang.label}
                                            </span>
                                        </div>

                                        {/* Checkmark placeholder to maintain layout if needed, or just conditional render */}
                                        <div className="w-4 flex justify-end">
                                            {isActive && (
                                                <Check className="w-3.5 h-3.5 text-primary" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
