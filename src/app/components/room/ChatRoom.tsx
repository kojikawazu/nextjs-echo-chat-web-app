'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
// consts
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';
// types
import { RoomMessage } from '@/app/types/types';
// contexts
import { useChatContext } from '@/app/contexts/ChatContext';
import { usePlusChatContext } from '@/app/contexts/PlusChatContext';
// schema
import {
    chatMessageCreateSchema,
    ChatMessageCreateFormValues,
} from '@/app/schema/chat-message-schema';
// api
import { createMessage } from '@/app/lib/api/message/create-message';
// components
import { MessageButton } from '@/app/components/room/MessageButton';

/**
/**
 * チャットルーム
 * @returns JSX.Element
 */
export const ChatRoom: React.FC = () => {
    // clerk
    const { user, isLoaded } = useUser();
    // contexts
    const { sendMessage } = useChatContext();
    const { currentUser, activeRoom, joinRoom } = usePlusChatContext();
    // states
    const [messages, setMessages] = useState<RoomMessage[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isLoaded) return;
        if (!activeRoom) return;
        fetchMessages();
    }, [isLoaded, activeRoom]);

    const fetchMessages = async () => {
        if (!activeRoom) return;
        setIsCreating(true);

        try {
            const response = await fetch(
                `${COMMON_CONSTANTS.URL.FETCH_MESSAGES.replace(':id', activeRoom.id)}`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // フォーム
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ChatMessageCreateFormValues>({
        resolver: zodResolver(chatMessageCreateSchema),
        defaultValues: {
            message: '',
            room_id: activeRoom?.id,
            user_id: currentUser?.id,
        },
    });

    // メッセージ作成ハンドラー
    const handleCreateMessage = (data: ChatMessageCreateFormValues) => {
        if (data) {
            createMutation.mutate(data);
            reset();
        }
    };

    // メッセージ作成用のミューテーション
    const createMutation = useMutation({
        mutationFn: (createdData: ChatMessageCreateFormValues) => createMessage(createdData),
        onSuccess: () => {
            console.log('メッセージ作成成功');
            fetchMessages();
        },
        onError: () => {
            console.log('メッセージ作成失敗');
        },
    });

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
                {messages &&
                    messages.length > 0 &&
                    messages.map((message, index) => (
                        <MessageButton
                            key={index}
                            message={message}
                            isOwn={message.user_id === currentUser?.id}
                        />
                    ))}
                <div ref={messagesEndRef} />
            </div>

            <form
                className="p-4 bg-white dark:bg-dark-200 border-t border-gray-200 dark:border-dark-300 transition-colors duration-200"
                onSubmit={handleSubmit(handleCreateMessage)}
            >
                <div className="flex space-x-2">
                    {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message.message}</p>
                    )}
                    <input
                        type="text"
                        id="message"
                        {...register('message')}
                        className="flex-1 rounded-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
                        placeholder="メッセージを入力..."
                    />
                    <input type="hidden" {...register('room_id')} value={activeRoom.id} />
                    <input type="hidden" {...register('user_id')} value={currentUser?.id} />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-200 transition-colors duration-200"
                        disabled={isCreating}
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    );
};
