'use client';

import { useState } from 'react';
import { UserResource } from '@clerk/types';
// types
import { ChatRoom, RoomMessage } from '@/app/types/types';
import { MiniMessageLikes } from '@/app/types/chat-likes';
// api
import { createLike } from '@/app/lib/api/likes/create-like';
import { deleteLike } from '@/app/lib/api/likes/delete-like';

interface UseMessageLikeProps {
    currentUser: UserResource | null | undefined;
    activeRoom: ChatRoom | null;
    initialMessage: RoomMessage;
}

/**
 * メッセージのいいねを管理するフック
 * @param currentUser 現在のユーザー
 * @param activeRoom アクティブなチャットルーム
 * @param initialMessage 初期メッセージ
 */
export const useMessageLike = ({
    currentUser,
    activeRoom,
    initialMessage,
}: UseMessageLikeProps) => {
    // states
    const [message, setMessage] = useState<RoomMessage>(initialMessage);
    // いいね数
    const [likeCount, setLikeCount] = useState(message?.like_count ?? 0);
    // いいねしたユーザー
    const [likedUsers, setLikedUsers] = useState<MiniMessageLikes[]>(message?.liked_users ?? []);
    // いいねしたかどうか
    const [hasLiked, setHasLiked] = useState(
        message?.liked_users.some((like) => like.userId === currentUser?.id) ?? false,
    );

    /**
     * いいねを切り替え
     */
    const toggleLike = async () => {
        if (!currentUser || !activeRoom || !message) return;

        const likedUsers = message.liked_users ?? [];
        const hasLiked = likedUsers.some(
            (like: MiniMessageLikes) => like.userId === currentUser.id,
        );
        let updatedLikes: MiniMessageLikes[] = [];

        try {
            if (hasLiked) {
                await deleteLike(message.message_id, currentUser.id);
                
                updatedLikes = likedUsers.filter(
                (like: MiniMessageLikes) => like.userId !== currentUser.id,
            );
        } else {
            await createLike(message.message_id, currentUser.id);

            const newLike: MiniMessageLikes = {
                userId: currentUser.id,
                name: currentUser.fullName || 'Unknown User',
                };
                updatedLikes = [...likedUsers, newLike];
            }
        } catch (error) {
            console.error('いいねの切り替えに失敗しました:', error);
            return;
        }

        // メッセージを更新
        setMessage({
            ...message,
            liked_users: updatedLikes,
        });
        // いいね数を更新
        setLikeCount(updatedLikes.length);
        // いいねしたかどうかを更新
        setHasLiked(!hasLiked);
        // いいねしたユーザーを更新
        setLikedUsers(updatedLikes);
    };

    return { toggleLike, message, likeCount, likedUsers, hasLiked };
};
