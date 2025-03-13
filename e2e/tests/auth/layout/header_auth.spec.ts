import { expect, test } from '@playwright/test';
        
test.describe('Authentication Header (login)', () => {
    test('Authentication Header test', async ({ page }) => {
        // チャットページに移動
        await page.goto('/');

        // 認証処理が完了するまで待機
        await page.waitForTimeout(2000);

        // 表示確認（ユーザー名とログアウトボタン）
        await expect(page.getByText(`ようこそ、${process.env.TEST_USER_NAME}さん`)).toBeVisible();
        await expect(page.getByRole('button', { name: 'ログアウト' })).toBeVisible();
    });
});
