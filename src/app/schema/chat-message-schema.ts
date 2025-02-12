import { z } from 'zod';

/**
 * チャットメッセージ生成フォームのスキーマ
 */
export const chatMessageCreateSchema = z.object({
    message: z.string().min(1, 'メッセージは1文字以上必要です'),
    room_id: z.string().min(1, 'ルームIDは1文字以上必要です'),
    user_id: z.string().min(1, 'ユーザーIDは1文字以上必要です'),
});

/**
 * チャットメッセージ生成フォームの型
 */
export type ChatMessageCreateFormValues = z.infer<typeof chatMessageCreateSchema>;
