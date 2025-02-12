'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserResource } from '@clerk/types';
// types
import { MiniAuthUser } from '@/app/types/auth-users';
import { MiniMessageLikes } from '@/app/types/chat-likes';
import { ChatRoom, RoomMessage } from '@/app/types/types';
// api
import { fetchRooms } from '@/app/lib/api/room/fetch-rooms';

interface PlusChatContextType {
    currentUser: UserResource | null | undefined;
    rooms: ChatRoom[];
    activeRoom: ChatRoom | null;
    isLoading: boolean;
    joinRoom: (roomId: string) => void;
    fetcher: () => void;
    toggleLike: (messageId: string, message: RoomMessage) => RoomMessage;
}

/**
 * ユーザーを小さいユーザーに変換
 * @param user ユーザー
 * @returns 小さいユーザー
 */
const convertToMiniAuthUser = (user: UserResource | null | undefined): MiniAuthUser | null => {
    if (!user) return null;
    return {
        id: user.id,
        name: user.fullName || 'Unknown User',
    };
};

const PlusChatContext = createContext<PlusChatContextType | null>(null);

/**
 * PlusChatProvider
 * @param props
 * @returns PlusChatProvider
 */
export const PlusChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // clerk
    const { user, isLoaded } = useUser();
    // state
    // 現在のユーザー
    const [currentUser, setCurrentUser] = useState<UserResource | null | undefined>(null);
    // 部屋
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    // アクティブな部屋
    const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
    // ローディング
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded) return;
        // ユーザー情報をセット
        setCurrentUser(user);
        fetcher();
    }, [isLoaded, currentUser]);

    /**
     * 部屋を取得
     */
    const fetcher = async () => {
        if (currentUser) {
            try {
                const responseJson = await fetchRooms();
                setRooms(responseJson);

                // アクティブな部屋がない場合、最初の部屋をアクティブに設定
                if (!activeRoom && responseJson.length > 0) {
                    setActiveRoom(responseJson[0]);
                }
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    /**
     * 部屋に参加
     * @param roomId 部屋ID
     */
    const joinRoom = useCallback(
        (roomId: string) => {
            if (!currentUser) return;

            // `UserResource` を `MiniAuthUser` に変換
            const miniUser = convertToMiniAuthUser(currentUser);
            if (!miniUser) return;

            setRooms((prevRooms) => {
                // 現在の部屋を更新
                let updatedRooms = prevRooms.map((room) => {
                    if (room.id === activeRoom?.id) {
                        return {
                            ...room,
                            users: room.users.filter((u) => u.id !== miniUser.id),
                        };
                    }
                    return room;
                });

                // 新しい部屋を追加
                updatedRooms = updatedRooms.map((room) => {
                    if (room.id === roomId) {
                        const isUserAlreadyJoined = room.users.some((u) => u.id === miniUser.id);
                        if (!isUserAlreadyJoined) {
                            return {
                                ...room,
                                users: [...room.users, miniUser],
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
     * いいねを切り替え
     * @param messageId メッセージID
     */
    const toggleLike = useCallback(
        (messageId: string, message: RoomMessage): RoomMessage => {
            if (!currentUser || !activeRoom || !message) return message;

            const likedUsers = message.liked_users ?? [];
            const hasLiked = likedUsers.some((like) => like.userId === currentUser.id);
            let updatedLikes: MiniMessageLikes[] = [];

            if (hasLiked) {
                updatedLikes = likedUsers.filter((like) => like.userId !== currentUser.id);
            } else {
                const newLike: MiniMessageLikes = {
                    userId: currentUser.id,
                    name: currentUser.fullName || 'Unknown User',
                };
                updatedLikes = [...likedUsers, newLike];
            }

            const updatedMessage = {
                ...message,
                liked_users: updatedLikes,
            };

            console.log('message', updatedMessage);
            return updatedMessage;
        },
        [currentUser, activeRoom],
    );

    return (
        <PlusChatContext.Provider
            value={{ currentUser, rooms, activeRoom, isLoading, joinRoom, fetcher, toggleLike }}
        >
            {children}
        </PlusChatContext.Provider>
    );
};

export const usePlusChatContext = () => {
    const context = useContext(PlusChatContext);
    if (!context) {
        throw new Error('usePlusChatContext must be used within a PlusChatProvider');
    }
    return context;
};
