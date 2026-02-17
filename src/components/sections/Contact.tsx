'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Github, Linkedin, Loader2, Send, Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { FaPaperPlane } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { sendEmail } from '@/actions/sendEmail';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Custom X Icon
const XIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="currentColor"
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const SOCIALS = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/omaelbaz', username: '@omaelbaz' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/omaelbaz/', username: 'Omar Elbaz' },
    { name: 'X', icon: XIcon, href: 'https://x.com/omaelbaz', username: '@omaelbaz' },
];

export function Contact() {
    const t = useTranslations('Contact');
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const [pending, setPending] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('oelbaz010@gmail.com');
        setCopied(true);
        toast.success(t('emailCopied') || 'Email copied to clipboard!'); // Ensure key exists or fallback
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (formData: FormData) => {
        setPending(true);
        const senderEmail = formData.get('senderEmail');
        const message = formData.get('message');

        if (!senderEmail || !message) {
            toast.error(t('form.error') || 'Please fill in all fields.');
            setPending(false);
            return;
        }

        const result = await sendEmail(formData);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success(t('form.success') || 'Message sent successfully!');
            (document.getElementById('contact-form') as HTMLFormElement)?.reset();
        }
        setPending(false);
    };

    const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

            <Container className="relative z-10 max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className={cn(
                        "text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight py-2",
                        isArabic && "leading-relaxed"
                    )}>
                        {t('title')}
                    </h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid md:grid-cols-2 bg-slate-950/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Left Column: Form */}
                    <div className="p-8 md:p-12 order-2 md:order-1">
                        <form
                            id="contact-form"
                            action={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label htmlFor="senderEmail" className="block text-sm font-medium text-slate-300 ml-1 mb-3">
                                    {t('form.email')}
                                </label>
                                <input
                                    id="senderEmail"
                                    name="senderEmail"
                                    type="email"
                                    required
                                    maxLength={500}
                                    placeholder="your@email.com"
                                    className={cn(
                                        "w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 text-white focus:outline-hidden focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600",
                                        isArabic ? "py-4 leading-relaxed" : "py-3"
                                    )}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 ml-1 mb-3">
                                    {t('form.message')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    maxLength={5000}
                                    placeholder={t('form.messagePlaceholder') || "To create something exceptional together..."}
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-4 text-white leading-relaxed focus:outline-hidden focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-slate-600"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={pending}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    buttonVariants({ size: 'lg' }),
                                    "w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 border-0 flex items-center justify-center gap-2"
                                )}
                            >
                                {pending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t('form.sending')}
                                    </>
                                ) : (
                                    <>
                                        <span>{t('form.send')}</span>
                                        <FaPaperPlane className={cn("w-5 h-5", isArabic && "scale-x-[-1]")} />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    {/* Right Column: Contact Info */}
                    <div className="p-8 md:p-12 order-1 md:order-2 bg-linear-to-br from-primary/5 to-transparent flex flex-col justify-between md:border-s border-white/5 relative">
                        {/* Seamless divider for mobile */}
                        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent md:hidden" />

                        <div>
                            <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-8">
                                {t('contactInfo') || 'Contact Information'}
                            </h3>

                            <div
                                onClick={handleCopyEmail}
                                className="group flex items-center gap-4 p-4 -mx-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer mb-8"
                            >
                                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-400 mb-0.5">{t('form.email')}</p>
                                    <p className="text-lg font-mono text-white">oelbaz010@gmail.com</p>
                                </div>
                                <div className="p-2 text-slate-500 group-hover:text-white transition-colors">
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">
                                {t('socials') || 'Social Media'}
                            </h3>
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <social.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                        <span className="font-medium text-slate-300 group-hover:text-white transition-colors">
                                            {social.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-primary transition-all group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                                        <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                                            {social.username}
                                        </span>
                                        <ArrowIcon className="w-4 h-4" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
