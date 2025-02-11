'use client';

import React, { useState } from 'react';
import { MessageCircle, AlertCircle, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
// contexts
import { useChatContext } from '@/app/contexts/ChatContext';

/**
 * ログイン
 * @returns JSX.Element
 */
export const Login: React.FC = () => {
    // router
    const router = useRouter();
    // states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // contexts
    const { login } = useChatContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (username.trim() && password.trim()) {
            const success = login(username, password);
            if (!success) {
                setError('ユーザー名またはパスワードが正しくありません');
            }

            router.push('/');
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-dark-100 transition-colors duration-200">
            <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-dark-200 rounded-xl shadow-lg transition-colors duration-200">
                <div className="flex flex-col items-center">
                    <MessageCircle className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        チャットにログイン
                    </h2>
                    {error && (
                        <div className="mt-4 flex items-center text-sm text-red-600 dark:text-red-400">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                ユーザー名
                            </label>
                            <input
                                id="username"
                                type="text"
                                required
                                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
                                placeholder="ユーザー名を入力"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                パスワード
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
                                placeholder="パスワードを入力"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-200 transition-colors duration-200"
                    >
                        <span className="flex items-center">
                            <LogIn className="h-5 w-5 mr-2" />
                            ログイン
                        </span>
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>デモアカウント:</p>
                    <p>ユーザー名: demo / パスワード: demo123</p>
                    <p>ユーザー名: test / パスワード: test123</p>
                </div>
            </div>
        </div>
    );
};
