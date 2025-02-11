import { MiniAuthUser } from '@/app/types/auth-users';
import { MiniMessageLikes } from '@/app/types/chat-likes';

export interface User {
    id: string;
    name: string;
    password: string;
}

export interface Like {
    userId: string;
    timestamp: number;
}

export interface Message {
    id: string;
    userId: string;
    content: string;
    timestamp: number;
    likes: Like[];
}

/**
 * ルーム
 */
export interface Room {
    id: string;
    name: string;
    messages: Message[];
    users: User[];
}

// -------------------------------------------------------------------------------------------------

export interface ChatRoom {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    users: MiniAuthUser[];
}

export interface RoomUser {
    name: string;
    userId: string;
}

export interface RoomMessage {
    user_id: string;
    message_id: string;
    name: string;
    content: string;
    created_at: Date;
    like_count: number;
    liked_users: MiniMessageLikes[];
}
