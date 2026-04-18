// 地図の初期化
const map = L.map('map').setView([35.681236, 139.767125], 13);

// 国土地理院タイルレイヤー
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: '国土地理院'
}).addTo(map);

// GPXフォルダからデータをロード
const runners = ['mik2.gpx'];//, 'runner2.gpx', 'runner3.gpx'];
runners.forEach((file, index) => {
    new L.GPX(`./gpxdata/${file}`, {
        async: true,
        marker_options: {
            startIconUrl: './images/start.png',
            endIconUrl: './images/goal.png',
        }
    }).on('loaded', function(e) {
        const gpx = e.target;
        map.fitBounds(gpx.getBounds());
    }).addTo(map);
});

/*
// パフォーマンス監視用
const performanceMetrics = {
    startTime: Date.now(),
    pointsLoaded: 0,
    filesLoaded: 0,
    totalFiles: 0
};

// ===== Canvas レンダリングレイヤー =====
class GPXCanvasLayer extends L.CanvasLayer {
    constructor(options = {}) {
        super(options);
        this.gpxLayers = [];
        this.allBounds = null;
    }

    addGPX(gpxLayer) {
        this.gpxLayers.push(gpxLayer);
        if (this.allBounds === null) {
            this.allBounds = gpxLayer.getBounds();
        } else {
            this.allBounds.extend(gpxLayer.getBounds());
        }
        this.redraw();
    }

    drawLayer() {
        if (!this.canvas) return;
        
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 各GPXレイヤーの軌跡をCanvas描画
        this.gpxLayers.forEach((gpxLayer, idx) => {
            const latLngs = gpxLayer.getLatLngs();
            if (latLngs.length < 2) return;

            ctx.strokeStyle = ['#0066FF', '#FF6600', '#00CC00', '#FF0000'][idx % 4];
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = 0.8;

            ctx.beginPath();
            let isFirstPoint = true;

            latLngs.forEach(latLng => {
                const point = map.latLngToContainerPoint(latLng);
                
                if (isFirstPoint) {
                    ctx.moveTo(point.x, point.y);
                    isFirstPoint = false;
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });

            ctx.stroke();
            ctx.globalAlpha = 1.0;
        });
    }
}

// Canvas描画レイヤーを作成
const canvasLayer = new GPXCanvasLayer().addTo(map);

// ===== GPXファイル読込 =====
const runners = ['mik2.gpx']; // 複数ファイル対応可能

performanceMetrics.totalFiles = runners.length;

// チャンクスサイズ：一度に処理するポイント数
const CHUNK_SIZE = 1000;

runners.forEach((file, index) => {
    const gpx = new L.GPX(`./gpxdata/${file}`, {
        async: true,
        marker_options: {
            startIconUrl: './images/start.png',
            endIconUrl: './images/goal.png',
        },
        polyline_options: {
            weight: 0,  // Canvas描画なので不要
            opacity: 0,
            interactive: false
        }
    }).on('loaded', function(e) {
        const gpxData = e.target;
        const latLngs = gpxData.getLatLngs();

        // パフォーマンスメトリクス更新
        performanceMetrics.pointsLoaded += latLngs.length;
        performanceMetrics.filesLoaded += 1;

        // Canvas描画レイヤーにGPXデータを追加
        canvasLayer.addGPX(gpxData);

        // すべてのファイル読込完了時
        if (performanceMetrics.filesLoaded === performanceMetrics.totalFiles) {
            // 全体を表示するようにズーム調整
            if (canvasLayer.allBounds) {
                map.fitBounds(canvasLayer.allBounds, {
                    padding: [50, 50],
                    maxZoom: 16
                });
            }

            // パフォーマンスログ出力
            const loadTime = Date.now() - performanceMetrics.startTime;
            console.log(`✅ GPXデータ読込完了`);
            console.log(`   読込時間: ${loadTime}ms`);
            console.log(`   ポイント数: ${performanceMetrics.pointsLoaded.toLocaleString()}`);
            console.log(`   ファイル数: ${performanceMetrics.filesLoaded}`);
        }

        // マーカーの描画（スタート・ゴール）
        gpxData.addTo(map);

    }).addTo(map);
});

// ===== マップ操作時のパフォーマンス最適化 =====
map.on('moveend', () => {
    canvasLayer.redraw();
});

map.on('zoomend', () => {
    canvasLayer.redraw();
});
*/
// ===== 将来用：Google Apps Scriptチェックポイント =====
/*
function loadCheckpoints() {
    fetch('https://script.google.com/macros/s/YOUR_DEPLOYED_GAS_URL/exec')
        .then(res => res.json())
        .then(data => {
            const cpGroup = L.featureGroup();
            data.forEach(cp => {
                const color = cp.order === 's' ? 'red' : 
                            cp.order === 'g' ? 'green' : 'blue';
                const marker = L.circleMarker([cp.lat, cp.lon], {
                    color: color,
                    radius: 6,
                    weight: 2,
                    opacity: 0.8
                }).bindPopup(cp.name);
                cpGroup.addLayer(marker);
            });
            cpGroup.addTo(map);
        });
}
*/
