// Zoom Probe SDK Network Diagnostic API Library
import { Prober } from '@zoom/probesdk';

class ZoomDiagnostic {
    /**
     * ネットワーク診断を実行してOK/NGの結果を返します
     * @returns {Promise<boolean>} true = OK, false = NG
     */
    static async run() {
        const prober = new Prober();
        
        try {
            // you can ignore the URLs, so the default URLs that deployed in the ProbeSDK will be used
            const jsUrl = '';
            const wasmUrl = '';
            const config = { probeDuration: 120 * 1000, connectTimeout: 20 * 1000 };
            
            const report = await prober.startToDiagnose(jsUrl, wasmUrl, config, (stats) => {
                console.log(stats);
            });
            
            // a DiagnosticReport has main 3 structures we need to handle
            console.log(report.content.networkDiagnosticReport);
            console.log(report.content.basicInfo);
            console.log(report.content.supportedFeatures);
            
            const networkResult = report?.content?.networkDiagnosticReport;
            
            if (!networkResult) {
                return false;
            }
            
            return ZoomDiagnostic.evaluateNetworkResult(networkResult);
            
        } catch (error) {
            console.error('Zoom Probe SDK エラー:', error);
            return false;
        } finally {
            prober.cleanup();
        }
    }

    
    static evaluateNetworkResult(result) {
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
}

// CMS統合用のグローバルAPI
window.ZoomDiagnostic = ZoomDiagnostic;

export { ZoomDiagnostic };