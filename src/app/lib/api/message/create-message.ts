// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';
// schema
import { ChatMessageCreateFormValues } from '@/app/schema/chat-message-schema';

/**
 * チャットメッセージを作成
 * @param createdData 作成データ
 * @returns 作成データ
 */
export async function createMessage(createdData: ChatMessageCreateFormValues) {
    const response = await fetch(`${COMMON_CONSTANTS.URL.CREATE_MESSAGE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            message: createdData.message,
            room_id: createdData.room_id,
            user_id: createdData.user_id,
        }),
    });

    if (!response.ok) {
        throw new Error('チャットメッセージの作成に失敗しました');
    }

    return response.json();
}
