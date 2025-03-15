import { test, expect } from '@playwright/test';
import { mockMessages } from '../../mocks/data/mock-message-data';

test.describe('Home page test', () => {
    test('Home page is displayed', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);
    });

    test('Room List is displayed', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);

        // 部屋作成テキストが表示されていることを確認
        await expect(page.getByPlaceholder(/新しい部屋を作成.*/)).toBeVisible();
        // 部屋作成ボタンが表示されていることを確認
        await expect(page.getByRole('button', { name: '部屋作成' })).toBeVisible();

        // ルームリストが表示されたことを確認
        await expect(page.getByRole('button', { name: 'Room A' })).toBeVisible();
        await expect(page.getByRole('button', { name: '2 人が参加中' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Room B' })).toBeVisible();
        await expect(page.getByRole('button', { name: '1 人が参加中' })).toBeVisible();

        // 初期時、Room Aのチャットルームに色がついていることを確認
        await expect(page.getByRole('button', { name: 'Room A' })).toHaveClass(
            /.*bg-primary-100 dark:bg-primary-900\/50 text-primary-900 dark:text-primary-100.*/,
        );
        await expect(page.getByRole('button', { name: 'Room B' })).not.toHaveClass(
            /.*bg-primary-100 dark:bg-primary-900\/50 text-primary-900 dark:text-primary-100.*/,
        );
    });

    test('Chat Room is displayed', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);

        // チャットルームが表示されていることを確認
        await expect(page.getByRole('heading', { name: 'Room A' })).toBeVisible();
        await expect(page.getByRole('paragraph').filter({ hasText: '2 人が参加中' })).toBeVisible();

        // 自分が参加していることを確認
        await expect(page.getByText(mockMessages[0].name, { exact: true })).toBeVisible();
        await expect(page.getByText(mockMessages[0].content)).toBeVisible();
        await expect(page.getByText(/\d{1,2}:\d{2}:\d{2} [AP]M/).first()).toBeVisible();
        await expect(page.getByRole('button', { name: 'いいね', exact: true })).toBeVisible();
        await expect(
            page.locator(
                'button:has(span:text-is("' + mockMessages[0].like_count.toString() + '"))',
            ),
        ).toBeVisible();

        // 相手が参加していることを確認
        await expect(page.getByText(mockMessages[1].name, { exact: true })).toBeVisible();
        await expect(page.getByText(mockMessages[1].content)).toBeVisible();
        await expect(page.getByText(/\d{1,2}:\d{2}:\d{2} [AP]M/).nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'いいね解除', exact: true })).toBeVisible();
        await expect(
            page.locator(
                'button:has(span:text-is("' + mockMessages[1].like_count.toString() + '"))',
            ),
        ).toBeVisible();

        // チャットテキストが表示されていることを確認
        await expect(page.getByPlaceholder('メッセージを入力...')).toBeVisible();
        // メッセージ送信ボタンが表示されていることを確認
        await expect(page.getByRole('button', { name: 'メッセージ送信' })).toBeVisible();
    });

    test('Create room is Clickable', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);

        // ルームリストが表示されたことを確認
        await page.getByPlaceholder(/新しい部屋を作成.*/).fill('Room C');
        await page.getByRole('button', { name: '部屋作成' }).click();

        // 1000ms待機
        await page.waitForTimeout(1000);

        // Mockデータが追加されていることを確認
        // TODO:
    });

    test('Create room is Clickable (Invalid)', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);

        // ルームリストが表示されたことを確認
        await page.getByPlaceholder(/新しい部屋を作成.*/).fill('');
        await page.getByRole('button', { name: '部屋作成' }).click();
        // 1000ms待機
        await page.waitForTimeout(1000);

        await expect(page.getByText('ルーム名は1文字以上必要です')).toBeVisible();
    });

    test('Room List is Clickable', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);

        // ルームリストをクリック
        await page.getByRole('button', { name: 'Room B' }).click();
        // 1000ms待機
        await page.waitForTimeout(1000);

        // Room Bのチャットルームに色が変わったことを確認
        await expect(page.getByRole('button', { name: 'Room A' })).not.toHaveClass(
            /.*bg-primary-100 dark:bg-primary-900\/50 text-primary-900 dark:text-primary-100.*/,
        );
        await expect(page.getByRole('button', { name: 'Room B' })).toHaveClass(
            /.*bg-primary-100 dark:bg-primary-900\/50 text-primary-900 dark:text-primary-100.*/,
        );
        // Room Bのチャットルームに切り替わったことを確認
        await expect(page.getByRole('heading', { name: 'Room B' })).toBeVisible();
        await expect(page.getByRole('paragraph').filter({ hasText: '2 人が参加中' })).toBeVisible();
    });

    test('Create message is Clickable', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);

        // メッセージの入力
        await page.getByPlaceholder('メッセージを入力...').fill('test message');
        // メッセージ送信ボタンをクリック
        await page.getByRole('button', { name: 'メッセージ送信' }).click();
        // 1000ms待機
        await page.waitForTimeout(1000);

        // Mockデータが追加されていることを確認
        // TODO:
    });

    test('Create message is Clickable (Invalid)', async ({ page }) => {
        // Homeページに遷移
        await page.goto('/');
        // 1000ms待機
        await page.waitForTimeout(1000);

        // メッセージの入力
        await page.getByPlaceholder('メッセージを入力...').fill('');
        // メッセージ送信ボタンをクリック
        await page.getByRole('button', { name: 'メッセージ送信' }).click();
        // 1000ms待機
        await page.waitForTimeout(1000);

        // エラーメッセージが表示されていることを確認
        await expect(page.getByText('メッセージは1文字以上必要です')).toBeVisible();
    });
});
