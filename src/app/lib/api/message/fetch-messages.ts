'use server';

import { auth } from '@clerk/nextjs/server';
// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';

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

        const response = await fetch(
            `${COMMON_CONSTANTS.URL.FETCH_MESSAGES.replace(':id', roomId)}`,
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
