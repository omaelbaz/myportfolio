import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';

export function Footer() {
    const t = useTranslations('Footer');
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 py-8 bg-slate-950">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 pl-12 md:pl-0">
                    <p>© {year} {t('copyright_name')}. {t('rights')}</p>
                    <p className="font-mono text-xs">{t('built_with')}</p>
                </div>
            </Container>
        </footer>
    );
}
