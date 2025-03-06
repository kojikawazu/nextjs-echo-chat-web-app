# テストマニュアル

## テストの導入

### パッケージのインストール

```bash
# jestテスト
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest node-mocks-http
npm install -D @types/jest

# e2eテスト
# (インストール済の場合、スキップすること)
npm install -D @playwright/test
npx playwright install
npx playwright install-deps
```

### 初期設定

```bash
# jestテスト
npx ts-jest config:init
touch jest.setup.ts
```

```bash
# e2eテスト
touch playwright.config.ts
mkdir -p e2e/tests
```

## テスト実行

```bash
# jestテスト
npm run test
```

```bash
# e2eテスト
npm run test:e2e
```