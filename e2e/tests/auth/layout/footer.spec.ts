import { test, expect } from '@playwright/test';

test.describe('Footer test', () => {
    test.beforeEach(async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);
    });

    test('Footer is displayed', async ({ page }) => {
        // フッターが表示されていることを確認
        await expect(page.getByText(/Made.*with.*by.*Chat.*Team/)).toBeVisible();
    });
});
