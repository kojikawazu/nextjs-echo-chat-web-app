import { RoomMessage } from '@/app/types/types';

/**
 * チャットメッセージデータ(Mock)
 */
export const mockMessages: RoomMessage[] = [
    {
        user_id: process.env.TEST_USER_ID || '',
        message_id: 'message-1',
        name: process.env.TEST_USER_NAME || '',
        content: 'Hello, world!',
        created_at: new Date(),
        like_count: 2,
        liked_users: [
            {
                userId: 'user-2',
                name: 'Jane Doe',
            },
            {
                userId: 'user-3',
                name: 'Tom Hanks',
            },
        ],
    },
    {
        user_id: 'user-2',
        message_id: 'message-2',
        name: 'Jane Doe',
        content: 'Thank you!',
        created_at: new Date(),
        like_count: 1,
        liked_users: [
            {
                userId: process.env.TEST_USER_ID || '',
                name: process.env.TEST_USER_NAME || '',
            },
        ],
    },
];
