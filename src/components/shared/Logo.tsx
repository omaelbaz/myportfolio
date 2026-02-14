import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="group flex items-center gap-2">
            <span className="font-mono text-lg font-bold tracking-tighter text-foreground">
                omaelbaz
                <span className="animate-pulse text-primary">_</span>
            </span>
        </Link>
    );
}
