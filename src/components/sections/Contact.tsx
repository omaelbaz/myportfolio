'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Copy, Check, Github, Linkedin, Twitter } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const EMAIL = 'hello@omarelbaz.dev';

const SOCIALS = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/omarelbaz' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/omarelbaz' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/omarelbaz' },
];

export function Contact() {
    const t = useTranslations('Contact');
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = EMAIL;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Bottom glow */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />

            <Container className="relative z-10 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <p className="text-slate-400 mt-4 text-lg">{t('subtitle')}</p>
                </div>

                <div className="backdrop-blur-xl bg-slate-900/50 p-8 md:p-12 rounded-3xl text-center border border-white/10">
                    {/* Email Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                    </div>

                    {/* Email Address */}
                    <p className="text-2xl md:text-4xl font-mono font-bold tracking-tighter text-white mb-8 break-all">
                        {EMAIL}
                    </p>

                    {/* Copy Button */}
                    <Button
                        onClick={handleCopy}
                        size="lg"
                        className="min-w-[180px]"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 me-2" />
                                {t('copied')}
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 me-2" />
                                {t('copy_email')}
                            </>
                        )}
                    </Button>

                    {/* Social Links */}
                    <div className="flex gap-4 justify-center mt-10">
                        {SOCIALS.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all duration-300"
                                aria-label={social.name}
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
