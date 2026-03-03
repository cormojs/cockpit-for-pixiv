# AGENTS.md

## Project Overview

**cockpit for pixiv** は、pixiv のブラウジング体験を向上させる UserScript（Tampermonkey / Greasemonkey 用）です。pixiv のイラスト閲覧をより快適にするビューア機能を提供します。

## Architecture

### モノレポ構成 (`packages/`)

| パッケージ | 説明 |
|---|---|
| `packages/core` | メインの UserScript。React ベースのビューア UI |
| `packages/addon-download` | ダウンロード機能を追加するアドオン UserScript |
| `packages/site` | GitHub Pages 用のドキュメントサイト（Pug テンプレート） |

### Core パッケージの構造

```
packages/core/
├── index.tsx          # エントリーポイント。styled-components の設定と DOM マウント
├── constants.ts       # セレクタ定義、キーアサイン、ラベル等の定数
├── banner.js          # UserScript ヘッダー（@match, @grant 等のメタデータ）
├── app/
│   ├── App.tsx        # ルートコンポーネント
│   ├── GlobalStyle.tsx # グローバルCSS
│   └── theme.ts       # styled-components テーマ定義
├── components/        # 汎用 UI コンポーネント（Box, Button, Dialog, Modal 等）
├── features/          # 機能別モジュール（下記参照）
├── hooks/             # カスタムフック（useCache, useStorage, useForceUpdate）
└── externals/         # 外部連携（API クライアント、アドオンストア、ZIP ローダー等）
```

### Features（機能モジュール）

- **Router** - SPA ナビゲーション管理
- **Illust** - イラストデータの取得・管理（`useIllust` フック）
- **StandardView** - 通常サイズ表示（画像・うごイラ対応、遅延読み込み・リサイズ）
- **FullSizeView** - フルサイズ表示モード
- **Ugoira** - うごイラ（アニメーション GIF 的コンテンツ）の再生
- **Bookmark** - ブックマーク機能（タグ選択ダイアログ付き）
- **Pages** - ページネーション
- **ScrollSpy** - スクロール監視
- **IntersectionObserver** - 交差監視による要素の可視性管理
- **Caption** / **Description** - 作品説明表示
- **User** - ユーザー情報
- **RelatedWorks** - 関連作品
- **About** - アバウト情報
- **Addon** - アドオン拡張ポイント

## Tech Stack

- **言語**: TypeScript (strict mode)、JSX
- **UI**: React 16 + styled-components 5
- **スタイル**: `@styled-system/css` によるテーマベーススタイリング
- **HTTP**: ky（fetch ラッパー）
- **ビルド**: Webpack 4 + Babel（TypeScript は Babel でトランスパイル、tsc は型チェックのみ）
- **出力**: `docs/*.user.js`（UserScript 形式）
- **対象ブラウザ**: 最新 2 バージョンの Chrome

## Coding Conventions

- **フォーマット**: Prettier（シングルクォート、セミコロンなし）
- **Lint**: ESLint + `@typescript-eslint/parser`、`react-hooks` ルール、`jsx-a11y` ルール
- **コンポーネント**: 関数コンポーネント + Hooks パターン
- **スタイル**: styled-components の `css` prop と styled-system
- **エクスポート**: 各 feature は `index.ts` で re-export

## Build & Development

```sh
# 依存インストール
yarn install

# 開発ビルド（ウォッチモード）
npm start

# プロダクションビルド
npm run build

# 型チェック + Lint
npm run prebuild
```

## Important Notes

- UserScript として pixiv (`https://www.pixiv.net/*`) 上で動作する。小説ページは除外。
- `banner.js` にある `CP_SELECTORS` はユーザーがカスタマイズ可能な設定。それ以降のコードは編集禁止。
- アドオンシステム（`externals/addonStore.ts`）により、ダウンロードアドオン等を MessageChannel 経由で連携。
- テストフレームワークは導入されていない。
