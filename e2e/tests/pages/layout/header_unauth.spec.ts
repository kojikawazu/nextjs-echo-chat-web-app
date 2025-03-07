import { test, expect } from '@playwright/test';

test.describe('Unauthenticated Header', () => {
    test.beforeEach(async ({ page }) => {
        // 未認証の場合、ログインページにリダイレクトされる
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);
    });

    test('Header is displayed', async ({ page }) => {
        // ヘッダーが表示されていることを確認
        await expect(page.getByRole('heading', { name: 'チャットアプリ' })).toBeVisible();

        // ダークモードのボタンが表示されていることを確認
        await expect(page.getByRole('button', { name: 'ダークモード' })).toBeVisible();        
    });

    test('Dark mode button is displayed', async ({ page }) => {
        // ダークモードのボタンをクリック
        await page.getByRole('button', { name: 'ダークモード' }).click();

        // 500ms待機
        await page.waitForTimeout(500);

        // ライトモードのボタンが表示されていることを確認
        await expect(page.getByRole('button', { name: 'ライトモード' })).toBeVisible();
        // ライトモードのボタンをクリック
        await page.getByRole('button', { name: 'ライトモード' }).click();

        // 500ms待機
        await page.waitForTimeout(500);

        // ダークモードのボタンが表示されていることを確認
        await expect(page.getByRole('button', { name: 'ダークモード' })).toBeVisible();
    });
});