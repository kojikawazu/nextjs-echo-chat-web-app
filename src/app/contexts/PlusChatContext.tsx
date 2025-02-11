'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserResource } from '@clerk/types';
// types
import { MiniAuthUser } from '@/app/types/auth-users';
import { ChatRoom } from '@/app/types/types';
// consts
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';

interface PlusChatContextType {
    currentUser: UserResource | null | undefined;
    rooms: ChatRoom[];
    activeRoom: ChatRoom | null;
    isLoading: boolean;
    joinRoom: (roomId: string) => void;
}

const convertToMiniAuthUser = (user: UserResource | null | undefined): MiniAuthUser | null => {
    if (!user) return null;
    return {
        id: user.id,
        name: user.fullName || 'Unknown User',
    };
};

const PlusChatContext = createContext<PlusChatContextType | null>(null);

export const PlusChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // clerk
    const { user, isLoaded } = useUser();
    // state
    const [currentUser, setCurrentUser] = useState<UserResource | null | undefined>(null);
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded) return;

        // ユーザー情報をセット
        setCurrentUser(user);

        const fetchRooms = async () => {
            if (currentUser) {
                try {
                    const response = await fetch(`${COMMON_CONSTANTS.URL.FETCH_ROOMS}`);

                    if (!response.ok) {
                        throw new Error('Failed to fetch rooms');
                    }

                    const data = await response.json();
                    setRooms(data);
                } catch (error) {
                    console.error('Error fetching rooms:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchRooms();
    }, [isLoaded, currentUser]);

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

    return (
        <PlusChatContext.Provider value={{ currentUser, rooms, activeRoom, isLoading, joinRoom }}>
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
