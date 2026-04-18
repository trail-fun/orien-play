// 地図の初期化
const map = L.map('map').setView([35.681236, 139.767125], 13);

// 国土地理院タイルレイヤー
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: '国土地理院'
}).addTo(map);

// GPXフォルダからデータをロード
const runners = ['mik.gpx'];//, 'runner2.gpx', 'runner3.gpx'];
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
        
        // 全ての座標ポイントを配列として取得
        const trackPoints = gpx.getLatLngs();
        // Leaflet.GPXは [ [ [lat, lng], [lat, lng] ] ] のような多重配列を返すことが多いため平坦化(flat)すると扱いやすいです
        const flatPoints = trackPoints.flat(Infinity);
        
        // 例：最初の1点目の緯度を取得
        if (flatPoints.length > 0) {
            console.log("最初のポイントの緯度:", flatPoints[0].lat);
            console.log("最初のポイントの経度:", flatPoints[0].lng);
        }

    }).addTo(map);
});


   // サンプルトラック（GeoJSON：MultiPoint＋time配列）
    const demoTracks = [{
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
          [132.480359, 34.402538],
          [132.486721, 34.40312],
          [132.488101, 34.410693],
          [132.488736, 34.415688]
        ]
      },
      properties: {
        time: [
          Date.now() - 30000,
          Date.now() - 20000,
          Date.now() - 10000,
          Date.now()
        ]
      }
    }];

    // 再生オプション
    const playbackOptions = {
      playControl:   true,    // 再生ボタン
      dateControl:   true,    // 日時表示
      sliderControl: true,    // スライダー
      orientIcons:   true,    // 進行方向アイコン
      speed:         1.0      // 実時間
    };

    // Playbackインスタンス生成
    new L.Playback(map, demoTracks, null, playbackOptions);

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
