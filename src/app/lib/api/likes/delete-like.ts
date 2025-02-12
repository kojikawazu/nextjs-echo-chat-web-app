// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';

/**
 * いいねを削除
 * @param id メッセージID
 * @param userId ユーザーID
 * @returns 削除データ
 */
export async function deleteLike(id: string, userId: string) {
    const response = await fetch(`${COMMON_CONSTANTS.URL.DELETE_LIKE.replace(':id', id).replace(':userId', userId)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('いいねの削除に失敗しました');
    }

    return response.json();
}