'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
// contexts
import { useChatContext } from '@/app/contexts/ChatContext';
import { usePlusChatContext } from '@/app/contexts/PlusChatContext';
/**
 * ルームリスト
 * @returns JSX.Element
 */
export const RoomList: React.FC = () => {
    // contexts
    const { createRoom } = useChatContext();
    const { rooms, activeRoom, joinRoom } = usePlusChatContext();
    // states
    const [newRoomName, setNewRoomName] = useState('');

    const handleCreateRoom = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRoomName.trim()) {
            createRoom(newRoomName);
            setNewRoomName('');
        }
    };

    return (
        <div className="w-72 bg-gray-50 dark:bg-dark-200 border-r border-gray-200 dark:border-dark-300 transition-colors duration-200">
            <div className="p-4">
                <form onSubmit={handleCreateRoom} className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            className="w-full px-4 py-2 pr-10 bg-white dark:bg-dark-100 border border-gray-300 dark:border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 dark:text-white transition-colors duration-200"
                            placeholder="新しい部屋を作成..."
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-600 dark:text-gray-300"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                </form>

                <div className="space-y-2">
                    {rooms.map((room) => (
                        <button
                            key={room.id}
                            onClick={() => joinRoom(room.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                                activeRoom?.id === room.id
                                    ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-900 dark:text-primary-100'
                                    : 'hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-900 dark:text-gray-100'
                            }`}
                        >
                            <div className="font-medium">{room.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {room.users.length} 人が参加中
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
