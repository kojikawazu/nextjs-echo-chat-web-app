// components
import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';
// contexts
import ClientThemeProvider from '@/app/contexts/ClientThemeProvider';

/**
 * 認証レイアウト
 * @param children 子要素
 * @returns JSX.Element
 */
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClientThemeProvider>
            <div className="min-h-screen flex flex-col dark:bg-dark-100 transition-colors duration-200">
                <Header />
                {children}
                <Footer />
            </div>
        </ClientThemeProvider>
    );
}
