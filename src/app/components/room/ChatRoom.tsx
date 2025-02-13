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
    const { isLoaded } = useUser();
    // contexts
    const { currentUser, activeRoom } = usePlusChatContext();
    // states
    // メッセージ
    const [messages, setMessages] = useState<RoomMessage[]>([]);
    // メッセージ作成中
    const [isCreating, setIsCreating] = useState(false);
    // メッセージの最下部
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // WebSocket の接続用
    const ws = useRef<WebSocket | null>(null);

    // メッセージを取得
    useEffect(() => {
        if (!isLoaded || !activeRoom) return;
        fetchMessages();

        // WebSocket 接続
        ws.current = new WebSocket(COMMON_CONSTANTS.URL.WS);

        ws.current.onopen = () => {
            console.log(COMMON_CONSTANTS.WEBSOCKET.CONNECTING);

            // ルームIDを送信
            ws.current?.send(
                JSON.stringify({
                    type: 'join',
                    data: {
                        room_id: activeRoom.id,
                        user_id: currentUser?.id,
                    },
                }),
            );

            console.log(COMMON_CONSTANTS.WEBSOCKET.CONNECT);
        };

        ws.current.onmessage = (event) => {
            console.log(COMMON_CONSTANTS.WEBSOCKET.RECEIVED);
            try {
                const data = JSON.parse(event.data);
                if (data.type === "message") {
                    const data = JSON.parse(event.data);
                    const receivedMessage: RoomMessage = {
                        user_id: data.data.user_id,
                        message_id: data.data.message_id,
                        name: data.data.name,
                        content: data.data.content,
                        created_at: data.data.created_at,
                        like_count: 0,
                        liked_users: [],
                    };
                    setMessages((prev) => [...prev, receivedMessage]);
                }
            } catch (error) {
                console.error(COMMON_CONSTANTS.WEBSOCKET.ERROR_RECEIVED);
            }
        };
        

        ws.current.onclose = () => {
            console.log(COMMON_CONSTANTS.WEBSOCKET.DISCONNECT);
        };

        return () => {
            ws.current?.close();
        };
    }, [isLoaded, activeRoom]);

    // メッセージを取得
    useEffect(() => {
        if (!isLoaded) return;
        if (!activeRoom) return;
        fetchMessages();
    }, [isLoaded, activeRoom]);

    /**
     * メッセージを取得
     */
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

    /**
     * メッセージの最下部にスクロール
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    /**
     * メッセージの最下部にスクロール
     */
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

    /**
     * メッセージ作成ハンドラー
     * @param data メッセージ作成データ
     */
    const handleCreateMessage = (data: ChatMessageCreateFormValues) => {
        if (data) {
            createMutation.mutate(data);
            reset();
        }
    };

    /**
     * メッセージ作成用のミューテーション
     */
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
                            initialMessage={message}
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
