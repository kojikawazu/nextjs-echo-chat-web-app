import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
    test.beforeEach(async ({ page }) => {
        // 未認証の場合、ログインページにリダイレクトされる
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);
    });

    test('Footer is displayed', async ({ page }) => {
        // フッターが表示されていることを確認
        await expect(page.getByText(/Made.*with.*by.*Chat.*Team/)).toBeVisible();
    });
});