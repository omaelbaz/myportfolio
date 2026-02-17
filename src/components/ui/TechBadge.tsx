import { useTranslations } from 'next-intl';

interface TechBadgeProps {
    tag: string;
    roleKey?: string;
}

export function TechBadge({ tag, roleKey }: TechBadgeProps) {
    const t = useTranslations('Projects');

    return (
        <div className="group/tooltip relative">
            <span className="block cursor-help rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-sm text-slate-300 transition-colors hover:border-primary/50 hover:text-white">
                {tag}
            </span>
            {roleKey && (
                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-xs text-white opacity-0 shadow-xl transition-opacity group-hover/tooltip:opacity-100">
                    {t(roleKey)}
                    <div className="absolute left-1/2 top-full -mt-1 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                </div>
            )}
        </div>
    );
}
