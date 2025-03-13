import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
    test('Footer is displayed', async ({ page }) => {
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);
        // フッターが表示されていることを確認
        await expect(page.getByText(/Made.*with.*by.*Chat.*Team/)).toBeVisible();
    });
});
