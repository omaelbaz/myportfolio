'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { TESTIMONIALS_DATA, TestimonialUser } from '@/lib/testimonialsData';

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((index) => {
                // Calculate fill percentage for this star
                // e.g. rating 4.2:
                // index 0: 4.2 - 0 = 4.2 -> 100%
                // index 3: 4.2 - 3 = 1.2 -> 100%
                // index 4: 4.2 - 4 = 0.2 -> 20%
                const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));

                return (
                    <div key={index} className="relative w-3.5 h-3.5">
                        {/* Empty Star Background (Gray/Outline) */}
                        <Star
                            className="w-full h-full text-white/20 absolute inset-0"
                            strokeWidth={1.5}
                        />

                        {/* Filled Star Overlay (Yellow) */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fillPercentage}%` }}
                        >
                            <Star
                                className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const TestimonialCard = ({ data, isArabic }: { data: TestimonialUser, isArabic: boolean }) => (
    <div className="shrink-0 w-[300px] md:w-[400px] p-6 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/5 hover:border-primary/20 transition-colors mx-4">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-slate-800">
                    <Image
                        src={data.avatar}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-white font-medium text-sm">
                        {data.name}
                    </h4>
                    <p className="text-slate-500 text-xs">{data.role}</p>
                </div>
            </div>
            <Quote className="w-6 h-6 text-primary/20" />
        </div>

        <div className="flex items-center gap-2 mb-3">
            <StarRating rating={data.rating} />
            <span className="text-xs text-slate-500 font-mono pt-0.5">{data.rating.toFixed(1)}</span>
        </div>

        <p
            className={cn(
                "text-slate-300 text-sm",
                // UI Fix: Padding and line-height for Arabic to prevent clipping
                isArabic ? "leading-loose py-4" : "leading-relaxed"
            )}
            dir={isArabic ? "rtl" : "ltr"}
        >
            "{data.text}"
        </p>
    </div>
);

export function Testimonials() {
    const t = useTranslations('Testimonials');
    const locale = useLocale();
    const isArabic = locale === 'ar';
    const [testimonials, setTestimonials] = useState<TestimonialUser[]>([]);

    useEffect(() => {
        // Select the correct data array based on locale
        // Fallback to 'en' if strict key check fails (though we control keys)
        const pool = TESTIMONIALS_DATA[locale] || TESTIMONIALS_DATA['en'];

        // Shuffle Logic: on mount, randomly select 3 items.
        // We do this client-side on mount to ensure hydration matches (or we accept rapid shift on mount, 
        // using useEffect ensures we don't break hydration. Ideally could be server side but randomized needs care).
        // Since we are client component, useEffect is fine.

        const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);
        setTestimonials(shuffled);
    }, [locale]);

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <Container className="mb-12 text-center">
                <h2 className={cn(
                    "text-3xl md:text-5xl font-bold bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight py-2",
                    isArabic && "leading-relaxed"
                )}>
                    {t('title')}
                </h2>
            </Container>

            {/* Marquee Container */}
            <div className="relative flex overflow-hidden mask-image-gradient min-h-[250px]">
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-linear-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-linear-to-l from-background to-transparent pointer-events-none" />

                {testimonials.length === 0 ? (
                    // Minimal loading state if needed, though typically fast with local data
                    <div className="w-full flex justify-center items-center h-full"> </div>
                ) : (
                    <motion.div
                        className="flex"
                        animate={{ x: isArabic ? ["0%", "50%"] : ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40,
                        }}
                    >
                        {/* Double the array for seamless loops */}
                        {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
                            <TestimonialCard
                                key={`${item.id}-${idx}`}
                                data={item}
                                isArabic={isArabic}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
