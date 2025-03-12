import { test, expect } from '@playwright/test';

test.describe('Authentication Header', () => {
    test.beforeEach(async ({ page, context }) => {
        // 認証済みテストの場合は storageState.json を適用ß
        if (await context.storageState()) {
            console.log('認証済みテスト（storageState.json が適用されています）');
        }
    });

    test('Authentication Header test', async ({ page }) => {
        await page.goto('/');

        // 認証処理が完了するまで待機
        await page.waitForTimeout(2000);

        // 表示確認（ユーザー名とログアウトボタン）
        await expect(page.getByText(`ようこそ、${process.env.TEST_USER_NAME}さん`)).toBeVisible();
        await expect(page.getByRole('button', { name: 'ログアウト' })).toBeVisible();
    });
});
