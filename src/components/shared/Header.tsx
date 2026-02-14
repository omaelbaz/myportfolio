import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { Container } from "@/components/ui/Container";

export function Header() {
    const t = useTranslations('Navigation');
    const navItems = ['home', 'about', 'projects', 'contact'];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md supports-backdrop-filter:bg-slate-950/60">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Logo />

                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                href={item === 'home' ? '/' : `/${item}`}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {t(item)}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        {/* GitHub Icon or other actions can go here */}
                    </div>
                </div>
            </Container>
        </header>
    );
}
