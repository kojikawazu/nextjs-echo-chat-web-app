import React from 'react';
import { Heart } from 'lucide-react';
// types
import { RoomMessage, ChatRoom } from '@/app/types/types';
// contexts
import { useChatContext } from '@/app/contexts/ChatContext';
import { usePlusChatContext } from '@/app/contexts/PlusChatContext';

interface MessageButtonProps {
    message: RoomMessage;
    isOwn: boolean;
}

/**
 * メッセージボタン
 * @param props
 * @returns JSX.Element
 */
export const MessageButton: React.FC<MessageButtonProps> = ({ message, isOwn }) => {
    const { toggleLike } = useChatContext();
    const { rooms, currentUser } = usePlusChatContext();

    const sender = rooms.flatMap((room: ChatRoom) => room.users).find((user) => user.id === message.user_id);
    const senderName = sender?.name || '不明なユーザー';

    const hasLiked = message.liked_users.some((like) => like.userId === currentUser?.id);

    const likeCount = message.like_count;
    const likedUsers = message.liked_users.map((like) => {
        const user = rooms.flatMap((room) => room.users).find((u) => u.id === like.userId);
        return user?.name || '不明なユーザー';
    });

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-xs md:max-w-md rounded-lg overflow-hidden shadow-sm ${
                    isOwn
                        ? 'bg-primary-600 dark:bg-primary-700 text-white'
                        : 'bg-accent-50 dark:bg-accent-900/30 text-gray-900 dark:text-white'
                } transition-colors duration-200`}
            >
                <div
                    className={`px-4 py-1.5 text-xs font-medium ${
                        isOwn
                            ? 'bg-primary-700 dark:bg-primary-800 text-primary-100'
                            : 'bg-accent-100 dark:bg-accent-800/50 text-accent-900 dark:text-accent-100'
                    } transition-colors duration-200`}
                >
                    {senderName}
                </div>

                <div className="px-4 py-2">
                    <p className="text-sm break-words">{message.content}</p>
                    <div className="mt-2 flex items-center justify-between">
                        <span
                            className={`text-xs ${
                                isOwn ? 'text-primary-100' : 'text-accent-700 dark:text-accent-200'
                            }`}
                        >
                            {new Date(message.created_at).toLocaleTimeString()}
                        </span>
                        <button
                            onClick={() => toggleLike(message.message_id)}
                            className={`flex items-center space-x-1.5 rounded-full px-2 py-1 ${
                                isOwn
                                    ? 'text-primary-100 hover:bg-primary-700/50'
                                    : 'text-accent-700 dark:text-accent-200 hover:bg-accent-100 dark:hover:bg-accent-700/40'
                            } transition-colors duration-200`}
                            title={
                                likedUsers.length > 0
                                    ? `いいねしたユーザー: ${likedUsers.join(', ')}`
                                    : ''
                            }
                        >
                            <Heart
                                className={`h-4 w-4 ${hasLiked ? 'fill-current text-red-500' : ''} transition-colors duration-200`}
                            />
                            <span className="text-xs font-medium">{likeCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
