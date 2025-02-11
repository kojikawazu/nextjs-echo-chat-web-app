'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

/**
 * クライアントサイド限定の `ThemeProvider`
 * @param children 子要素
 * @returns JSX.Element
 */
export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <>{children}</>;

    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            {children}
        </ThemeProvider>
    );
}
