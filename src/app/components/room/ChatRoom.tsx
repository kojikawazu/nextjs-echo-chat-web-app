'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
// contexts
import { useChatContext } from '@/app/contexts/ChatContext';
// components
import { MessageBubble } from '@/app/components/room/MessageButton';

/**
 * チャットルーム
 * @returns JSX.Element
 */
export const ChatRoom: React.FC = () => {
    const { activeRoom, sendMessage, currentUser } = useChatContext();
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeRoom?.messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage('');
        }
    };

    if (!activeRoom) return null;

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-dark-100 transition-colors duration-200">
            <div className="bg-white dark:bg-dark-200 shadow-sm border-b border-gray-200 dark:border-dark-300 transition-colors duration-200">
                <div className="px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {activeRoom.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activeRoom.users.length} 人が参加中
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeRoom.messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isOwn={message.userId === currentUser?.id}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form
                onSubmit={handleSubmit}
                className="p-4 bg-white dark:bg-dark-200 border-t border-gray-200 dark:border-dark-300 transition-colors duration-200"
            >
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
                        placeholder="メッセージを入力..."
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-200 transition-colors duration-200"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    );
};
