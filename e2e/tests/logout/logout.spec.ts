import { test, expect } from '@playwright/test';

const storageStatePath = 'storageState.json';

test.describe('Logout test', () => {
    test('logout success', async ({ page, context }) => {
        // チャットページに移動
        await page.goto('/');
        // 2000ms待機
        await page.waitForTimeout(2000);

        // ログアウトボタンをクリック
        await page.getByRole('button', { name: 'ログアウト' }).click();

        // ログアウト処理が完了するまで待機
        await page.waitForTimeout(2000);

        // URLが変更されていることを確認
        await expect(page).toHaveURL('/sign-in');
        // 認証情報の確認
        await expect(page.getByText(`ようこそ、${process.env.TEST_USER_NAME}さん`)).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'ログアウト' })).not.toBeVisible();
        
        // 認証状態を `storageState.json` に保存
        await context.storageState({ path: storageStatePath });
    });
});