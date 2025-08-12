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
           // TODO 現状だと、Zoom.usとの通信可否を正しく判定できていないのでレスポンスから判定するようにする

//    # Zoom関連のドメインを全てブロック
// 127.0.0.1 zoom.us
// 127.0.0.1 www.zoom.us
// 127.0.0.1 api.zoom.us
// 127.0.0.1 web.zoom.us
// 127.0.0.1 cdn.zoom.us
// 127.0.0.1 static.zoom.us

// # 地域別Zoomドメイン
// 127.0.0.1 us04web.zoom.us
// 127.0.0.1 us05web.zoom.us
// 127.0.0.1 us06web.zoom.us
// 127.0.0.1 ap01web.zoom.us
// 127.0.0.1 ap02web.zoom.us
// 127.0.0.1 eu01web.zoom.us
// 127.0.0.1 eu02web.zoom.us

// # CDNドメイン
// 127.0.0.1 d24cgw3uvb9a9h.cloudfront.net
// 127.0.0.1 source.zoom.us

// # Zoomgov（政府機関向け）
// 127.0.0.1 zoomgov.com
// 127.0.0.1 web.zoomgov.com
}

// CMS統合用のグローバルAPI
window.startToDiagnose = startToDiagnose;

export { startToDiagnose };