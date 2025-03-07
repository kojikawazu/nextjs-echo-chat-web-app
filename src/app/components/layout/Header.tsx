'use client';

import React from 'react';
import { MessageCircle, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useUser } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs';

/**
 * ヘッダー
 * @returns JSX.Element
 */
export const Header: React.FC = () => {
    // theme
    const { theme, setTheme } = useTheme();
    // user
    const { user } = useUser();
    // clerk
    const { signOut } = useClerk();

    return (
        <header className="bg-white dark:bg-dark-200 shadow-sm transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        <MessageCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            チャットアプリ
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors duration-200"
                            aria-label={theme === 'dark' ? 'ライトモード' : 'ダークモード'}
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-600" />
                            )}
                        </button>

                        <SignedIn>
                            {user && (
                                <>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        ようこそ、{user.firstName}さん
                                    </span>
                                    <button
                                        className="inline-flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                                        onClick={() => signOut({ redirectUrl: '/sign-in' })}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="text-sm">ログアウト</span>
                                    </button>
                                </>
                            )}
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    );
};
