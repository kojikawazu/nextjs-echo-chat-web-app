import { ChatRoom } from "@/app/types/types";

/**
 * チャットルームデータ(Mock)
 */
export const mockRooms: ChatRoom[] = [
    {
        id: 'room-1',
        name: 'Room A',
        createdAt: new Date(),
        updatedAt: new Date(),
        users: [
            { id: process.env.TEST_USER_ID || '', name: process.env.TEST_USER_NAME || ''},
            { id: 'user-2', name: 'Jane Doe' },
        ],
    },
    {
        id: 'room-2',
        name: 'Room B',
        createdAt: new Date(),
        updatedAt: new Date(),
        users: [{ id: 'user-3', name: 'Tom Hanks' }],
    },
];
