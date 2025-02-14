'use server';

import { auth } from '@clerk/nextjs/server';
// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';
// utils
import { encrypt } from '@/app/utils/encrypt/encrypt';

/**
 * チャットメッセージリストを取得
 * @param roomId チャットルームID
 * @returns チャットメッセージ
 */
export async function fetchMessages(roomId: string) {
    try {
        // トークンを取得
        const { getToken } = await auth();
        const token = await getToken();

        // roomId を暗号化
        const encryptedRoomId = await encrypt(roomId);

        const response = await fetch(
            `${COMMON_CONSTANTS.URL.FETCH_MESSAGES.replace(':id', encryptedRoomId)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error(COMMON_CONSTANTS.MESSAGES.FETCH.ERROR_FETCH);
        }

        return response.json();
    } catch (error) {
        console.error(COMMON_CONSTANTS.MESSAGES.FETCH.ERROR_FETCH, error);
        throw new Error(COMMON_CONSTANTS.MESSAGES.FETCH.ERROR_FETCH);
    }
}
