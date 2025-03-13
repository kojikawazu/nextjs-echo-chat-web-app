'use server';

import { auth } from '@clerk/nextjs/server';
// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';
import { mockRooms } from '../../../../../e2e/tests/auth/mocks/data/mock-room-data';

/**
 * チャットルームリストを取得
 * @returns チャットルーム
 */
export async function fetchRooms() {
    if (process.env.TEST_NODE_ENV === 'test') {
        return mockRooms;
    }

    try {
        // トークンを取得
        const { getToken } = await auth();
        const token = await getToken();

        const response = await fetch(`${COMMON_CONSTANTS.URL.FETCH_ROOMS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(COMMON_CONSTANTS.MESSAGES.ROOM.ERROR_FETCH);
        }

        return response.json();
    } catch (error) {
        console.error(COMMON_CONSTANTS.MESSAGES.ROOM.ERROR_FETCH, error);
        throw new Error(COMMON_CONSTANTS.MESSAGES.ROOM.ERROR_FETCH);
    }
}
