// 追加：各ボタンにイベントリスナーを設定
document.addEventListener("DOMContentLoaded", function () {
const cameraFocusMap = {
    "btn-north": { lat: 60.1282, lng: 18.6435 },         // スウェーデン
    "btn-south": { lat: -25.2744, lng: 133.7751 },       // オーストラリア
    "btn-east": { lat: 36.2048, lng: 138.2529 },         // 日本
    "btn-west": { lat: 39.3999, lng: -8.2245 },          // ポルトガル
    "btn-southeast-asia": { lat: 13.7563, lng: 100.5018 }, // タイ
    "btn-south-asia": { lat: 20.5937, lng: 78.9629 },     // インド
    "btn-africa": { lat: -1.2921, lng: 36.8219 },         // ケニア
    "btn-north-america": { lat: 37.0902, lng: -95.7129 }, // アメリカ合衆国
    "btn-south-america": { lat: -14.2350, lng: -51.9253 },// ブラジル
    "btn-eastern-europe": { lat: 48.3794, lng: 31.1656 }, // ウクライナ
    "btn-central-asia": { lat: 48.0196, lng: 66.9237 },   // カザフスタン
    "btn-central-america": { lat: 8.538, lng: -80.7821 }, // パナマ
    "btn-middle-east": { lat: 23.8859, lng: 45.0792 },    // サウジアラビア
    "btn-north-africa": { lat: 26.8206, lng: 30.8025 },   // エジプト
    "btn-arctic": { lat: 80.0, lng: 0.0 },                // 北極圏
    "btn-antarctic": { lat: -80.0, lng: 0.0 }             // 南極圏
};

Object.entries(cameraFocusMap).forEach(([btnId, coords]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
    btn.addEventListener("click", function () {
        if (!map) {
        console.error("マップが初期化されていません");
        return;
        }
        map.panTo(coords);
        map.setZoom(4);
    });
    }
});
});