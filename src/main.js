// Zoom Probe SDK Network Diagnostic API Library
import { Prober } from '@zoom/probesdk';

/**
 * ネットワーク診断を実行してOK/NGの結果を返します
 * @returns {Promise<boolean>} true = OK, false = NG
 */
async function startToDiagnose() {
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
        
        return true;
        
    } catch (error) {
        console.error('Zoom Probe SDK エラー:', error);
        return false;
    } finally {
        prober.cleanup();
    }
}

// CMS統合用のグローバルAPI
window.startToDiagnose = startToDiagnose;

export { startToDiagnose };