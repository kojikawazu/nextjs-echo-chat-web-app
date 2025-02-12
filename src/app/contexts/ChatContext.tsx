'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, Room, Message, Like } from '@/app/types/types';

interface ChatContextType {
    currentUser: User | null;
    rooms: Room[];
    activeRoom: Room | null;
    login: (username: string, password: string) => boolean;
    createRoom: (name: string) => void;
    joinRoom: (roomId: string) => void;
    sendMessage: (content: string) => void;
    toggleLike: (messageId: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

// デバッグ用のユーザー
const USERS: User[] = [
    { id: '1', name: 'demo', password: 'demo123' },
    { id: '2', name: 'test', password: 'test123' },
];

// デバッグ用の初期メッセージ
const INITIAL_ROOMS: Room[] = [
    {
        id: 'room1',
        name: '一般チャット',
        users: [USERS[0], USERS[1]],
        messages: [
            {
                id: 'msg1',
                userId: '1',
                content: 'こんにちは！一般チャットへようこそ！',
                timestamp: Date.now() - 3600000,
                likes: [{ userId: '2', timestamp: Date.now() - 1800000 }],
            },
            {
                id: 'msg2',
                userId: '2',
                content: 'はじめまして！よろしくお願いします😊',
                timestamp: Date.now() - 3000000,
                likes: [],
            },
            {
                id: 'msg3',
                userId: '1',
                content: '今日の天気はとても良いですね！',
                timestamp: Date.now() - 2400000,
                likes: [{ userId: '2', timestamp: Date.now() - 1200000 }],
            },
        ],
    },
    {
        id: 'room2',
        name: '雑談部屋',
        users: [USERS[1]],
        messages: [
            {
                id: 'msg4',
                userId: '2',
                content: '誰かいますか？',
                timestamp: Date.now() - 1800000,
                likes: [],
            },
            {
                id: 'msg5',
                userId: '1',
                content: 'はい、いますよ！何か話しましょう',
                timestamp: Date.now() - 1200000,
                likes: [{ userId: '2', timestamp: Date.now() - 600000 }],
            },
        ],
    },
];

/**
 * チャットプロバイダー
 * @param props
 * @returns チャットプロバイダー
 */
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 現在のユーザー
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    // 部屋
    const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
    // アクティブな部屋
    const [activeRoom, setActiveRoom] = useState<Room | null>(null);

    /**
     * ログイン
     * @param username ユーザー名
     * @param password パスワード
     * @returns ログイン成功かどうか
     */
    const login = useCallback((username: string, password: string): boolean => {
        const user = USERS.find((u) => u.name === username && u.password === password);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    }, []);

    /**
     * 部屋を作成
     * @param name 部屋名
     */
    const createRoom = useCallback((name: string) => {
        const newRoom: Room = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            messages: [],
            users: [],
        };
        setRooms((prev) => [...prev, newRoom]);
    }, []);

    /**
     * 部屋に参加
     * @param roomId 部屋ID
     */
    const joinRoom = useCallback(
        (roomId: string) => {
            if (!currentUser) return;

            setRooms((prevRooms) => {
                // 現在の部屋を更新
                let updatedRooms = prevRooms.map((room) => {
                    if (room.id === activeRoom?.id) {
                        return {
                            ...room,
                            users: room.users.filter((u) => u.id !== currentUser.id),
                        };
                    }
                    return room;
                });

                // 新しい部屋を追加
                updatedRooms = updatedRooms.map((room) => {
                    if (room.id === roomId) {
                        const isUserAlreadyJoined = room.users.some((u) => u.id === currentUser.id);
                        if (!isUserAlreadyJoined) {
                            return {
                                ...room,
                                users: [...room.users, currentUser],
                            };
                        }
                    }
                    return room;
                });

                // 新しい部屋をアクティブに設定
                const newActiveRoom = updatedRooms.find((r) => r.id === roomId) || null;
                // アクティブな部屋を更新
                setActiveRoom(newActiveRoom);
                // 更新された部屋を返す
                return updatedRooms;
            });
        },
        [currentUser, activeRoom],
    );

    /**
     * メッセージを送信
     * @param content メッセージ内容
     */
    const sendMessage = useCallback(
        (content: string) => {
            if (!currentUser || !activeRoom) return;

            const message: Message = {
                id: Math.random().toString(36).substr(2, 9),
                userId: currentUser.id,
                content,
                timestamp: Date.now(),
                likes: [],
            };

            setRooms((prevRooms) => {
                return prevRooms.map((room) => {
                    if (room.id === activeRoom.id) {
                        const updatedRoom = {
                            ...room,
                            messages: [...room.messages, message],
                        };
                        setActiveRoom(updatedRoom);
                        return updatedRoom;
                    }
                    return room;
                });
            });
        },
        [currentUser, activeRoom],
    );

    /**
     * いいねを切り替え
     * @param messageId メッセージID
     */
    const toggleLike = useCallback(
        (messageId: string) => {
            if (!currentUser || !activeRoom) return;

            setRooms((prevRooms) => {
                return prevRooms.map((room) => {
                    if (room.id === activeRoom.id) {
                        const updatedMessages = room.messages.map((message) => {
                            if (message.id === messageId) {
                                const hasLiked = message.likes.some(
                                    (like) => like.userId === currentUser.id,
                                );
                                let updatedLikes: Like[];

                                if (hasLiked) {
                                    updatedLikes = message.likes.filter(
                                        (like) => like.userId !== currentUser.id,
                                    );
                                } else {
                                    const newLike: Like = {
                                        userId: currentUser.id,
                                        timestamp: Date.now(),
                                    };
                                    updatedLikes = [...message.likes, newLike];
                                }

                                return {
                                    ...message,
                                    likes: updatedLikes,
                                };
                            }
                            return message;
                        });

                        const updatedRoom = {
                            ...room,
                            messages: updatedMessages,
                        };
                        setActiveRoom(updatedRoom);
                        return updatedRoom;
                    }
                    return room;
                });
            });
        },
        [currentUser, activeRoom],
    );

    return (
        <ChatContext.Provider
            value={{
                currentUser,
                rooms,
                activeRoom,
                login,
                createRoom,
                joinRoom,
                sendMessage,
                toggleLike,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
