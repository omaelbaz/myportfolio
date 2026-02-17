'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Container } from '@/components/ui/Container';

const NAV_ITEMS = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
];

function useScrollSpy(ids: string[], offset = 100) {
    const [activeId, setActiveId] = useState('home');

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY + offset;

        // If near top, always mark home
        if (window.scrollY < 100) {
            setActiveId('home');
            return;
        }

        for (let i = ids.length - 1; i >= 0; i--) {
            const el = document.getElementById(ids[i]);
            if (el && el.offsetTop <= scrollY) {
                setActiveId(ids[i]);
                return;
            }
        }
    }, [ids, offset]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return activeId;
}

export function Header() {
    const t = useTranslations('Navigation');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const activeSection = useScrollSpy(['home', 'about', 'projects', 'contact']);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            const top = el.offsetTop - 80; // navbar height offset
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? 'bg-[#020617]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/10'
                : 'bg-transparent'
                }`}
        >
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="flex items-center gap-0 select-none group"
                    >
                        <span className="text-lg font-mono font-bold tracking-tight text-white">
                            {t('brand_logo')}
                        </span>
                        <span className="text-lg font-mono font-bold text-primary cursor-blink">_</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.key;
                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${isActive
                                        ? 'text-primary'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    {t(item.key)}
                                    {/* Active underline indicator */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block">
                            <LanguageSwitcher />
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden relative p-2 text-slate-400 hover:text-white transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            <AnimatePresence mode="wait">
                                {mobileOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100dvh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="md:hidden fixed inset-0 top-16 bg-[#020617]/95 backdrop-blur-md z-40 overflow-hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
                            {NAV_ITEMS.map((item, index) => {
                                const isActive = activeSection === item.key;
                                return (
                                    <motion.a
                                        key={item.key}
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.08 }}
                                        className={`text-2xl font-medium transition-colors ${isActive
                                            ? 'text-primary'
                                            : 'text-slate-300 hover:text-primary'
                                            }`}
                                    >
                                        {t(item.key)}
                                    </motion.a>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="pt-4 border-t border-white/10"
                            >
                                <LanguageSwitcher />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
