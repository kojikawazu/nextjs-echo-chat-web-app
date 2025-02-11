'use client';

import { SignIn } from '@clerk/nextjs';
import { dark as darkTheme, experimental__simple as simpleTheme } from '@clerk/themes';
import { useTheme } from 'next-themes';

/**
 * Clerkのサインインページ
 * @returns JSX.Element
 */
export default function ClerkSignIn() {
    const { resolvedTheme } = useTheme();

    return (
        <div className="flex justify-center items-center">
            <div className="p-8 dark:text-white">
                <SignIn
                    appearance={{
                        baseTheme: resolvedTheme === 'dark' ? darkTheme : simpleTheme,
                        elements: {
                            signInRoot: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg',
                            card: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                            socialButtons: 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600',
                            socialButtonsBlockButton: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border dark:border-gray-600',
                            formFieldInput: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-gray-500',
                            formFieldLabel: 'text-gray-700 dark:text-gray-300',
                            formFieldErrorText: 'text-red-500 dark:text-red-400',
                            formFieldHintText: 'text-gray-500 dark:text-gray-400',
                            formFieldSuccessText: 'text-green-500 dark:text-green-400',
                            formButtonPrimary:
                                'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-colors duration-200',
                            footer: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-t border-gray-300 dark:border-gray-700',
                            footerActionText: 'text-primary-600 dark:text-primary-400',
                            header: 'text-gray-900 dark:text-gray-100',
                            headerTitle: 'text-gray-900 dark:text-white text-lg font-semibold',
                            headerSubtitle: 'text-gray-700 dark:text-gray-300',
                            main: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                            dividerText: 'text-gray-500 dark:text-gray-400',
                        },
                    }}
                />
            </div>
        </div>
    );
}

