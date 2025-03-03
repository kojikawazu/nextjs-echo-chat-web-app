'use server';

import { auth } from '@clerk/nextjs/server';
// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';
// utils
import { encrypt } from '@/app/utils/encrypt/encrypt';

/**
 * いいねを削除
 * @param id メッセージID
 * @returns 削除データ
 */
export async function deleteLike(id: string) {
    try {
        // トークンを取得
        const { getToken } = await auth();
        const token = await getToken();

        // id を暗号化
        const encryptedId = await encrypt(id);

        const response = await fetch(
            `${COMMON_CONSTANTS.URL.DELETE_LIKE.replace(':id', encryptedId)}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            throw new Error(COMMON_CONSTANTS.MESSAGES.LIKE.ERROR_DELETE);
        }

        return response.json();
    } catch (error) {
        console.error(`${COMMON_CONSTANTS.MESSAGES.LIKE.ERROR_DELETE}:`, error);
        throw new Error(COMMON_CONSTANTS.MESSAGES.LIKE.ERROR_DELETE);
    }
}
