import { expect, test } from '@playwright/test';

test.describe('Authentication Header (login)', () => {
    test.beforeEach(async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);
    });

    test('Authentication Header test', async ({ page }) => {
        // 表示確認（ユーザー名とログアウトボタン）
        await expect(page.getByText(`ようこそ、${process.env.TEST_USER_NAME}さん`)).toBeVisible();
        await expect(page.getByRole('button', { name: 'ログアウト' })).toBeVisible();
    });
});
