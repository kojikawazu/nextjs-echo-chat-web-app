import { test, expect } from '@playwright/test';

const storageStatePath = 'storageState.json';

test.describe.serial('Login test', () => {
    test('redirect to login page', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);
        // ログインページにリダイレクトされていることを確認
        await expect(page).toHaveURL(/.*sign-in.*/);
    });

    test('login failed (Invalid credentials email)', async ({ page }) => {
        // ログインページに遷移
        await page.goto('/sign-in');
        // 2000ms待機
        await page.waitForTimeout(2000);

        // メールアドレス & パスワードを入力
        await page.fill('input[name="identifier"]', 'test@example.com');
        await page.fill('input[name="password"]', '');

        // ログインボタンをクリック
        await page
            .getByRole('button', { name: 'Continue' })
            .waitFor({ state: 'visible', timeout: 10000 });
        await page.getByRole('button', { name: 'Continue' }).click();

        // 1000ms待機
        await page.waitForTimeout(1000);

        // エラーメッセージが表示されていることを確認
        await expect(page.getByText(/No account found.*/)).toBeVisible();
    });

    test('login failed (Invalid credentials password)', async ({ page }) => {
        // ログインページに遷移
        await page.goto('/sign-in');
        // 2000ms待機
        await page.waitForTimeout(2000);

        // メールアドレス & パスワードを入力
        await page.fill(
            'input[name="identifier"]',
            process.env.TEST_USER_EMAIL || 'test@example.com',
        );
        await page.fill('input[name="password"]', 'password123');

        // ログインボタンをクリック
        await page
            .getByRole('button', { name: 'Continue' })
            .waitFor({ state: 'visible', timeout: 10000 });
        await page.getByRole('button', { name: 'Continue' }).click();

        // 1000ms待機
        await page.waitForTimeout(1000);

        // 認証情報の確認
        await expect(
            page.getByText(`ようこそ、${process.env.TEST_USER_NAME}さん`),
        ).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'ログアウト' })).not.toBeVisible();
    });

    test('login failed (No account found)', async ({ page }) => {
        // ログインページに遷移
        await page.goto('/sign-in');
        // 2000ms待機
        await page.waitForTimeout(2000);

        // メールアドレス & パスワードを入力
        await page.fill('input[name="identifier"]', 'test@example.com');
        await page.fill('input[name="password"]', 'password123');

        // ログインボタンをクリック
        await page
            .getByRole('button', { name: 'Continue' })
            .waitFor({ state: 'visible', timeout: 10000 });
        await page.getByRole('button', { name: 'Continue' }).click();

        // 2000ms待機
        await page.waitForTimeout(2000);

        // エラーメッセージが表示されていることを確認
        await expect(page.getByText(/No account found.*/)).toBeVisible();
    });

    test('login success', async ({ page, context }) => {
        // ログインページに遷移
        await page.goto('/sign-in');
        // 2000ms待機
        await page.waitForTimeout(2000);

        // メールアドレス & パスワードを入力
        await page.fill(
            'input[name="identifier"]',
            process.env.TEST_USER_EMAIL || 'test@example.com',
        );
        await page.fill('input[name="password"]', process.env.TEST_USER_PASSWORD || 'password123');

        // ログインボタンをクリック
        await page
            .getByRole('button', { name: 'Continue' })
            .waitFor({ state: 'visible', timeout: 10000 });
        await page.getByRole('button', { name: 'Continue' }).click();

        // 2000ms待機
        await page.waitForTimeout(2000);

        // URLが変更されていることを確認
        await expect(page).toHaveURL('/');
        // ログイン成功したことを確認
        await expect(page.getByText(`ようこそ、${process.env.TEST_USER_NAME}さん`)).toBeVisible();
        await expect(page.getByRole('button', { name: 'ログアウト' })).toBeVisible();

        // 認証状態を `storageState.json` に保存
        await context.storageState({ path: storageStatePath });
    });

    test('login after redirect to chat page', async ({ page }) => {
        // 認証後ページに遷移
        await page.goto('/');
        // 3000ms待機
        await page.waitForTimeout(3000);

        // 認証後ページが表示されていることを確認
        await expect(page).toHaveURL('/');
    });
});
