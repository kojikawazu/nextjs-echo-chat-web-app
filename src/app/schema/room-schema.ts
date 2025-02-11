import { z } from 'zod';

/**
 * チャットルーム生成フォームのスキーマ
 */
export const roomCreateSchema = z.object({
    room_name: z.string().min(1, 'ルーム名は1文字以上必要です'),
});

/**
 * チャットルーム生成フォームの型
 */
export type RoomCreateFormValues = z.infer<typeof roomCreateSchema>;
