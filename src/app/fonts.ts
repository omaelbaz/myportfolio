import { Inter, JetBrains_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

export const fontSans = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});

export const fontMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const fontArabic = IBM_Plex_Sans_Arabic({
    variable: "--font-arabic",
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    subsets: ["arabic"],
});
