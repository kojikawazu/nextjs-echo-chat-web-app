'use server';

import { auth } from '@clerk/nextjs/server';
// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';
// utils
import { encrypt } from '@/app/utils/encrypt/encrypt';

/**
 * いいねを作成
 * @param id メッセージID
 * @returns 作成データ
 */
export async function createLike(id: string) {
    try {
        // トークンを取得
        const { getToken } = await auth();
        const token = await getToken();

        // id を暗号化
        const encryptedId = await encrypt(id);

        const response = await fetch(
            `${COMMON_CONSTANTS.URL.CREATE_LIKE.replace(':id', encryptedId)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error(COMMON_CONSTANTS.MESSAGES.LIKE.ERROR_CREATE);
        }

        return response.json();
    } catch (error) {
        console.error(`${COMMON_CONSTANTS.MESSAGES.LIKE.ERROR_CREATE}:`, error);
        throw new Error(COMMON_CONSTANTS.MESSAGES.LIKE.ERROR_CREATE);
    }
}
