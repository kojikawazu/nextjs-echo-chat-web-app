import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
// constants
import { COMMON_CONSTANTS } from '@/app/utils/consts/commons';

/**
 * チャットメッセージを作成
 * @param req リクエスト
 * @returns レスポンス
 */
export async function POST(req: Request) {
    try {
        // トークンを取得
        const { getToken } = await auth();
        const token = await getToken();

        // トークンがない場合、401エラーを返す
        if (!token) {
            console.error('Unauthorized');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // リクエストボディを取得
        const requestBody = await req.json();
        // チャットメッセージを作成
        const response = await fetch(`${COMMON_CONSTANTS.URL.CREATE_MESSAGE}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.error('Failed to create message');
            throw new Error(COMMON_CONSTANTS.MESSAGES.MESSAGE.ERROR_CREATE);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`${COMMON_CONSTANTS.MESSAGES.MESSAGE.ERROR_CREATE}:`, error);
        return NextResponse.json({ error: COMMON_CONSTANTS.MESSAGES.MESSAGE.ERROR_CREATE }, { status: 500 });
    }
}
