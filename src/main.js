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
        console.log("networkDiagnosticReport", report.content.networkDiagnosticReport);
        console.log("basicInfo", report.content.basicInfo);
        console.log("supportedFeatures", report.content.supportedFeatures);
        
        const networkResult = report?.content?.networkDiagnosticReport;
        
        if (!networkResult) {
            return false;
        }

        console.log("report", report);
        console.log("networkResult", networkResult);
        
        // Zoom.usとの通信可否を判定
        return isZoomAccessible(networkResult);
        
    } catch (error) {
        console.error('Zoom Probe SDK エラー:', error);
        return false;
    } finally {
        prober.cleanup();
    }
}

/**
 * Zoom.usとの通信が可能かどうかを判定
 * @param {Object} networkResult 
 * @returns {boolean} true = 通信可能, false = 通信不可
 */
function isZoomAccessible(networkResult) {
    console.log("reportをチェックするよ");
    return networkResult.protocols && 
           networkResult.protocols.some(protocol => protocol.isBlocked === false);
}

// CMS統合用のグローバルAPI
window.startToDiagnose = startToDiagnose;

export { startToDiagnose };