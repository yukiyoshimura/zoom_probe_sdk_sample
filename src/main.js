// Zoom Probe SDK Network Diagnostic Tool
import { Prober } from '@zoom/probesdk';

class ZoomNetworkDiagnostic {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.startButton = document.getElementById('startDiagnostic');
        this.loadingState = document.getElementById('loadingState');
        this.resultDisplay = document.getElementById('resultDisplay');
        this.resultStatus = document.getElementById('resultStatus');
        this.resultDetails = document.getElementById('resultDetails');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => {
            this.startDiagnostic();
        });
    }

    async startDiagnostic() {
        this.showLoading();
        
        try {
            const result = await this.runNetworkTest();
            this.showResult(result);
        } catch (error) {
            console.error('Diagnostic error:', error);
            this.showResult({
                success: false,
                error: error.message
            });
        }
    }

    async runNetworkTest() {
        // Zoom Probe SDK を使用したネットワークテスト
        // 実際のZoom Probe SDKの実装に置き換える必要があります
        
        try {
            // シミュレーション: 実際のZoom Probe SDK呼び出し
            const testResult = await this.simulateZoomProbeTest();
            
            return {
                success: testResult.success,
                details: testResult.details,
                latency: testResult.latency,
                bandwidth: testResult.bandwidth,
                connectivity: testResult.connectivity
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                details: 'ネットワーク接続に問題が発生しました。'
            };
        }
    }

    async simulateZoomProbeTest() {
        // 実際のZoom Probe SDK実装
        const prober = new Prober();
        
        try {
            // ネットワーク診断設定（デフォルト推奨値）
            const config = {
                probeDuration: 120 * 1000,   // 120秒（公式推奨）
                connectTimeout: 20 * 1000    // 20秒（公式推奨）
                // domainは指定しない（デフォルトを使用）
            };
            
            // 診断実行
            const report = await prober.startToDiagnose('', '', config, (stats) => {
                console.log('診断進行中:', stats);
            });
            
            // 結果の解析
            const networkResult = report?.content?.networkDiagnosticReport;
            const basicInfo = report?.content?.basicInfo;
            const supportedFeatures = report?.content?.supportedFeatures;
            
            console.log('Network Diagnostic Result:', networkResult);
            console.log('Basic Info:', basicInfo);
            console.log('Supported Features:', supportedFeatures);
            
            // 診断結果が空の場合
            if (!networkResult) {
                return {
                    success: false,
                    latency: null,
                    bandwidth: null,
                    connectivity: 'Unknown',
                    details: '診断は完了しましたが、結果データが取得できませんでした。ネットワーク環境またはZoom接続に問題がある可能性があります。',
                    rawResult: report
                };
            }
            
            const isSuccess = this.evaluateNetworkResult(networkResult);
            
            return {
                success: isSuccess,
                latency: networkResult?.statistics?.rtt || null,
                bandwidth: networkResult?.statistics?.bandwidth || null,
                connectivity: isSuccess ? 'Good' : 'Poor',
                details: isSuccess 
                    ? 'ネットワーク接続は正常です。Zoomサービスへの接続に問題ありません。'
                    : 'ネットワーク接続に問題があります。インターネット接続を確認してください。',
                rawResult: networkResult,
                basicInfo: basicInfo,
                supportedFeatures: supportedFeatures
            };
            
        } catch (error) {
            console.error('Zoom Probe SDK エラー:', error);
            throw new Error(`ネットワーク診断に失敗しました: ${error.message}`);
        } finally {
            // リソースのクリーンアップ
            prober.cleanup();
        }
    }
    
    evaluateNetworkResult(result) {
        // ネットワーク診断結果の評価ロジック
        if (!result || !result.statistics) return false;
        
        const stats = result.statistics;
        
        // RTT（往復遅延）が300ms以下で良好とする
        const rttOk = !stats.rtt || stats.rtt < 300;
        
        // パケットロス率が5%以下で良好とする
        const packetLossOk = !stats.packetLoss || stats.packetLoss < 0.05;
        
        // ジッターが50ms以下で良好とする
        const jitterOk = !stats.jitter || stats.jitter < 50;
        
        return rttOk && packetLossOk && jitterOk;
    }

    showLoading() {
        this.startButton.disabled = true;
        this.loadingState.classList.remove('hidden');
        this.resultDisplay.classList.add('hidden');
    }

    showResult(result) {
        this.loadingState.classList.add('hidden');
        this.resultDisplay.classList.remove('hidden');
        this.startButton.disabled = false;

        if (result.success) {
            this.resultStatus.textContent = 'OK';
            this.resultStatus.className = 'result-status ok';
            this.resultDetails.innerHTML = `
                <strong>診断結果:</strong> ${result.details}<br>
                <strong>遅延:</strong> ${result.latency}ms<br>
                <strong>帯域幅:</strong> ${result.bandwidth}Mbps<br>
                <strong>接続状態:</strong> ${result.connectivity}
            `;
        } else {
            this.resultStatus.textContent = 'NG';
            this.resultStatus.className = 'result-status ng';
            this.resultDetails.innerHTML = `
                <strong>診断結果:</strong> ${result.details || result.error}<br>
                <strong>対処法:</strong> インターネット接続を確認し、再度診断を実行してください。
            `;
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new ZoomNetworkDiagnostic();
});

// WordPress等のCMSでの読み込み用のグローバル関数
window.ZoomNetworkDiagnostic = ZoomNetworkDiagnostic;