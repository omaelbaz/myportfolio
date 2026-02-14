import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { Container } from "@/components/ui/Container";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl supports-backdrop-filter:bg-background/20">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Logo />

                    <nav className="hidden md:flex items-center gap-6">
                        {/* Desktop Navigation Links can go here later */}
                    </nav>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        {/* Mobile Menu Trigger can go here later */}
                    </div>
                </div>
            </Container>
        </header>
    );
}
