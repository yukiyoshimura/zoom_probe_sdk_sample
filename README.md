# Zoom Probe SDK Sample - Network Diagnostic Tool

Zoom Probe SDKを使用したネットワーク診断ツールです。WordPressなどのCMSから読み込み可能な静的ファイルとして提供されます。

## 機能

- Zoom Probe SDKを使用したネットワーク診断
- シンプルなOK/NG表示
- WordPress等CMSへの組み込み対応

## 開発環境セットアップ

### VS Code Dev Containers使用

```bash
# VS Codeでリポジトリを開く
# Dev Containersの拡張機能で「Reopen in Container」を選択
# 自動的にnpm installが実行されます
```

### ローカル環境

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ブラウザでhttp://localhost:3000を開く
```

## ビルド

```bash
# 静的ファイル生成
npm run build

# distディレクトリに静的ファイルが生成されます
```

## CMS組み込み方法

### WordPress組み込み例

1. `npm run build`で静的ファイルを生成
2. `dist`ディレクトリの内容をWordPressサーバーにアップロード
3. HTMLページに以下を追加：

```html
<!-- WordPress投稿またはページに追加 -->
<div id="zoom-diagnostic-container">
    <iframe src="/path/to/dist/index.html" 
            width="100%" 
            height="500px" 
            frameborder="0">
    </iframe>
</div>
```

### 直接埋め込み例

```html
<!-- HTMLページに直接埋め込み -->
<link rel="stylesheet" href="/path/to/dist/css/style.css">
<div id="zoom-diagnostic-app"></div>
<script src="/path/to/dist/js/main.js"></script>
<script>
    // アプリケーション初期化
    new ZoomNetworkDiagnostic();
</script>
```

## プロジェクト構造

```
/
├── .devcontainer/          # Dev Containers設定
├── src/                    # ソースコード
│   ├── index.html         # メインHTML
│   ├── main.js            # Zoom Probe SDK統合
│   └── style.css          # スタイル
├── dist/                  # ビルド出力
├── package.json           # 依存関係
├── vite.config.js         # ビルド設定
└── README.md              # このファイル
```

## 注意事項

- 実際のZoom Probe SDKの実装は、main.js内の`simulateZoomProbeTest`関数を実際のSDK呼び出しに置き換えてください
- 現在はシミュレーション実装となっています
- 本番環境では適切なZoom APIキーとエンドポイントの設定が必要です