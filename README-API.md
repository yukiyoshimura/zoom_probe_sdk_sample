# Zoom Diagnostic API Library

CMS統合用のZoom Probe SDK JavaScript ライブラリです。

## 使用方法

### 基本的な使用方法
```html
<script src="zoom-diagnostic.iife.js"></script>
<script>
// シンプルなOK/NG判定
ZoomDiagnostic.run().then(result => {
    console.log(result ? 'OK' : 'NG');
});
</script>
```

### 詳細結果の取得
```javascript
// 詳細な診断結果を取得
ZoomDiagnostic.runDetailed().then(result => {
    console.log('成功:', result.success);
    console.log('遅延:', result.latency + 'ms');
    console.log('詳細:', result.details);
});
```

## ファイル

- `zoom-diagnostic.iife.js` - メインライブラリ (105KB)
- `prober.js` - Zoom Probe SDK WebAssembly loader
- `prober.wasm` - WebAssembly バイナリ

## WordPress / CMS での実装例

```html
<!-- HTMLページに埋め込み -->
<div id="zoom-diagnostic">
    <button onclick="runZoomDiagnostic()">ネットワーク診断</button>
    <div id="diagnostic-result"></div>
</div>

<script src="path/to/zoom-diagnostic.iife.js"></script>
<script>
async function runZoomDiagnostic() {
    const resultEl = document.getElementById('diagnostic-result');
    resultEl.innerHTML = '診断中...（最大2分）';
    
    try {
        const isOk = await window.ZoomDiagnostic.run();
        resultEl.innerHTML = isOk ? '<span style="color: green;">OK</span>' : '<span style="color: red;">NG</span>';
    } catch (error) {
        resultEl.innerHTML = '<span style="color: red;">エラー</span>';
    }
}
</script>
```