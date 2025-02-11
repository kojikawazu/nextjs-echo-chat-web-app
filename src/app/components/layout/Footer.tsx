import React from 'react';
import { Heart } from 'lucide-react';

/**
 * フッター
 * @returns JSX.Element
 */
export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-dark-200 border-t border-gray-200 dark:border-dark-300 transition-colors duration-200">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>Made with</span>
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>by Chat Team</span>
                </div>
            </div>
        </footer>
    );
};
