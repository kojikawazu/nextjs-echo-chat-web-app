import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
// provider
import { QueryProvider } from '@/app/provider/QueryProvider';
// contexts
import { ChatProvider } from '@/app/contexts/ChatContext';
import { PlusChatProvider } from '@/app/contexts/PlusChatContext';
// styles
import './globals.css';

export const metadata: Metadata = {
    title: 'Echo Chat App',
    description: 'Echo Chat App',
};

/**
 * レイアウト
 * @param children 子要素
 * @returns JSX.Element
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>
                <ClerkProvider afterSignOutUrl="/">
                    <QueryProvider>
                        <PlusChatProvider>
                            <ChatProvider>{children}</ChatProvider>
                        </PlusChatProvider>
                    </QueryProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
