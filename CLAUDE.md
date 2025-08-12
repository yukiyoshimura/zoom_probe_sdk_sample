# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

これは `zoom_probe_sdk_sample` リポジトリで、Zoom Probe SDKを使用したネットワーク診断ツールです。WordPressなどのCMSから読み込み可能な静的ファイルとして提供されます。

## プロジェクト要件

### 機能要件
- Zoom Probe SDKを使用したネットワーク診断のみ（音声・画面テストは不要）
- 診断結果の表示：
  - 正常時：「OK」を表示
  - 異常時：「NG」を表示
- シンプルでわかりやすいUI

### 技術要件
- devcontainer環境での開発
- 起動時のnpm install自動実行
- 静的ファイルビルド対応
- WordPress等CMSからの読み込み対応

## 開発環境

### devcontainer
- `.devcontainer/devcontainer.json`で開発環境を定義
- 起動時に`npm install`を自動実行

### コマンド
```bash
# 開発サーバー起動
npm run dev

# 静的ファイルビルド（CMS組み込み用）
npm run build

# 依存関係インストール
npm install
```

## リポジトリ構造

```
/
├── .devcontainer/          # devcontainer設定
├── src/                    # ソースコード
│   ├── index.html         # メインHTML
│   ├── main.js            # Zoom Probe SDK統合
│   └── style.css          # スタイル
├── dist/                  # ビルド出力（静的ファイル）
├── package.json           # Node.js設定
└── README.md              # プロジェクトドキュメント
```

## アーキテクチャ

### ネットワーク診断フロー
1. Zoom Probe SDK初期化
2. ネットワーク接続テスト実行
3. 結果判定（OK/NG）
4. UI更新

### CMS組み込み
- `npm run build`で生成される静的ファイルをWordPress等で読み込み
- 単一HTMLファイル + CSS/JSの構成
- CDNまたは直接アップロード対応