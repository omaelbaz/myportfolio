import { useTranslations } from 'next-intl';
import { HeroScene } from '@/components/3d/HeroScene';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/navigation';

export function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <HeroScene />
            </div>

            {/* Content */}
            <Container className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-start text-start">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-6 border border-primary/20">
                        {t('badge')}
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                        {t('description')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button asChild size="lg">
                            <Link href="/projects">{t('cta_primary')}</Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg">
                            <Link href="/contact">{t('cta_secondary')}</Link>
                        </Button>
                    </div>
                </div>

                {/* Empty column to let 3D scene shine through on right side */}
                <div className="hidden lg:block"></div>
            </Container>
        </section>
    );
}
