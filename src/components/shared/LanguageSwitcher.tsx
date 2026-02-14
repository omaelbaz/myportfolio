'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { Button } from "@/components/ui/Button";
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-1" role="group" aria-label="Language switcher">
            {(['en', 'fr', 'ar'] as const).map((lang) => (
                <Button
                    key={lang}
                    variant="ghost"
                    size="sm"
                    onClick={() => switchLocale(lang)}
                    aria-label={`Switch to ${lang === 'en' ? 'English' : lang === 'fr' ? 'French' : 'Arabic'}`}
                    className={cn(
                        "h-8 w-8 p-0 text-xs uppercase font-mono transition-all",
                        locale === lang
                            ? "bg-primary text-primary-foreground font-bold"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {lang}
                </Button>
            ))}
        </div>
    );
}
