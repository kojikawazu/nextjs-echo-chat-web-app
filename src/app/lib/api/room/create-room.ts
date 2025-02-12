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
    const response = await fetch(`${COMMON_CONSTANTS.URL.CREATE_ROOM}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            room_name: createdData.room_name,
        }),
    });

    if (!response.ok) {
        throw new Error('チャットルームの作成に失敗しました');
    }

    return response.json();
}
