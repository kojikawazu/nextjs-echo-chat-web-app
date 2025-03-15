import { test, expect } from '@playwright/test';

const storageStatePath = 'storageState.json';

test.describe('Login page', () => {
    test.beforeEach(async ({ page }) => {
        // 未認証の場合、ログインページにリダイレクトされる
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);
    });

    // ログインページのe2eテスト
    test('Login page is displayed', async ({ page, context }) => {
        // ログインページにリダイレクトされていることを確認
        await expect(page).toHaveURL(/.*sign-in.*/);

        // フォーム内の見出しをチェック
        await expect(
            page.getByRole('heading', { name: 'Sign in to nextjs-echo-chat-app' }),
        ).toBeVisible();
        await expect(page.getByText('Welcome back! Please sign in to continue')).toBeVisible();
        // フォーム内のテキストをチェック
        await expect(page.getByText('Email address')).toBeVisible();
        // フォーム内のボタンをチェック
        await expect(page.getByRole('button', { name: /Continue/ })).toBeVisible();

        // 認証状態を `storageState.json` に保存
        await context.storageState({ path: storageStatePath });
    });
});
