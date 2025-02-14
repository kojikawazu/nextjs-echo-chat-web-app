'use server';

import crypto from 'crypto';

// 暗号化アルゴリズム
const ALGORITHM = process.env.ALGORITHM || '';
// 暗号化キー
const SECRET_KEY = process.env.SECRET_KEY || '';
// 初期化ベクトルの長さ
const IV_LENGTH = process.env.IV_LENGTH || '';

if (SECRET_KEY.length !== 32) {
    throw new Error('ROOM_ID_SECRET_KEY must be exactly 32 characters');
}

/**
 * 暗号化
 * @param text 暗号化する文字列
 * @returns 暗号化された文字列（Base64）
 */
export async function encrypt(text: string): Promise<string> {
    if (!text) {
        throw new Error('text is required');
    }

    // `IV` を生成
    const iv = crypto.randomBytes(parseInt(IV_LENGTH));
    // `Cipher` を生成
    const cipher = crypto.createCipheriv(
        ALGORITHM,
        Buffer.from(SECRET_KEY, 'utf-8'),
        iv,
    ) as crypto.CipherGCM;
    // `Cipher` を暗号化
    let encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
    // `authTag` を取得
    const authTag = cipher.getAuthTag();

    // `IV:暗号文:認証タグ` を URL エンコード
    return encodeURIComponent(
        `${iv.toString('hex')}:${encrypted.toString('base64')}:${authTag.toString('hex')}`,
    );
}
