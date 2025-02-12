// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';

/**
 * いいねを作成
 * @param id メッセージID
 * @param userId ユーザーID
 * @returns 作成データ
 */
export async function createLike(id: string, userId: string) {
    const response = await fetch(`${COMMON_CONSTANTS.URL.CREATE_LIKE.replace(':id', id).replace(':userId', userId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('いいねの作成に失敗しました');
    }

    return response.json();
}
