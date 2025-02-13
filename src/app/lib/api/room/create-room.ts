'use server';

import { auth } from '@clerk/nextjs/server';
// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';
// schema
import { RoomCreateFormValues } from '@/app/schema/chat-room-schema';

/**
 * チャットルームを作成
 * @param createdData 作成データ
 * @returns 作成データ
 */
export async function createRoom(createdData: RoomCreateFormValues) {
    try {
        // トークンを取得
        const { getToken } = await auth();
        const token = await getToken();

        const response = await fetch(`${COMMON_CONSTANTS.URL.CREATE_ROOM}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify({
                room_name: createdData.room_name,
            }),
        });

        if (!response.ok) {
            throw new Error(COMMON_CONSTANTS.MESSAGES.ROOM.ERROR_CREATE);
        }

        return response.json();
    } catch (error) {
        console.error(`${COMMON_CONSTANTS.MESSAGES.ROOM.ERROR_CREATE}:`, error);
        throw new Error(COMMON_CONSTANTS.MESSAGES.ROOM.ERROR_CREATE);
    }
}
