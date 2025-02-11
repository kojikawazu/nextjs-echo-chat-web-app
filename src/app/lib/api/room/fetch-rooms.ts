// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';

/**
 * チャットルームリストを取得
 * @returns チャットルーム
 */
export async function fetchRooms() {
    const response = await fetch(`${COMMON_CONSTANTS.URL.FETCH_ROOMS}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('チャットルームの取得に失敗しました');
    }

    return response.json();
}
