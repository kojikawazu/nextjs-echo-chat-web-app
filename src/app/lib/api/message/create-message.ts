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
    try {
        const response = await fetch(`${COMMON_CONSTANTS.URL.API_MESSAGE_CREATE}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: createdData.message,
                room_id: createdData.room_id,
            }),
        });

        if (!response.ok) {
            throw new Error(COMMON_CONSTANTS.MESSAGES.MESSAGE.ERROR_CREATE);
        }

        return response.json();
    } catch (error) {
        console.error(`${COMMON_CONSTANTS.MESSAGES.MESSAGE.ERROR_CREATE}:`, error);
        throw new Error(COMMON_CONSTANTS.MESSAGES.MESSAGE.ERROR_CREATE);
    }
}
