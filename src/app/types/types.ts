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
