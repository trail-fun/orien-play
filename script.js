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

    // 1. 軌跡の全座標 (緯度経度配列) を取得
//  const layers = e.target.getLayers();

//        layers.forEach(layer => {
//  console.log("緯度経度:",layer.getLatLngs());//layer.getLatLngs();
        // layerが線（Polyline）の場合、その全座標を取り出す
//    if (layer instanceof L.Polyline) {
//      const coords = layer.getLatLngs(); 
      // coords は [{lat: ..., lng: ...}, ...] という配列になります
//      console.log("全座標データ:", coords);
//      }
//    });
const time = e.element.getElementsByTagName('time')[0].textContent;
const trackPoints = e.element.getElementsByTagName('trkpt');
console.log("trkpt:",trackPoints[0]);
console.log("length:",trackPoints.length);
console.log(typeof trackPoints === "object"); // true

    const locations = [];

    for (let i = 0; i < trackPoints.length; i++) {
    const pt = trackPoints[i];
    locations.push({
        lat: parseFloat(pt.getAttribute("lat")),
        lon: parseFloat(pt.getAttribute("lon")),
//        ele: pt.getElementsByTagName("ele")[0] ? parseFloat(pt.getElementsByTagName("ele")[0].textContent) : null,
        time: pt.getElementsByTagName("time")[0] ? pt.getElementsByTagName("time")[0].textContent : null
    });
    }
//console.log(locations);

// locations配列から coordinates (経度, 緯度) と time (ミリ秒) を抽出
const coords = locations.map(loc => [loc.lon, loc.lat]);
const times = locations.map(loc => {
    // GPXの時刻文字列をミリ秒単位の数値（タイムスタンプ）に変換
    return loc.time ? new Date(loc.time).getTime() : null;
}).filter(t => t !== null); // 時刻データがない地点を除外する場合


        
   // サンプルトラック（GeoJSON：MultiPoint＋time配列）
    const demoTracks = [{
      type: 'Feature',
      geometry: {
        type: 'MultiPoint',
        coordinates: [
            [locations[0].lon,locations[0].lat],
            [locations[50].lon,locations[50].lat],
            [locations[100].lon,locations[100].lat],
            [locations[150].lon,locations[150].lat],
            [locations[200].lon,locations[200].lat],
            [locations[250].lon,locations[250].lat],
            [locations[300].lon,locations[300].lat],
            [locations[350].lon,locations[350].lat],
            [locations[400].lon,locations[400].lat],
            [locations[450].lon,locations[450].lat]

            //          [132.480359, 34.402538],
//          [132.486721, 34.40312],
//          [132.488101, 34.410693],
//          [132.488736, 34.415688]
        ]
      },
      properties: {
        time: [
          Date.now() - 90000,
          Date.now() - 80000,
          Date.now() - 70000,
          Date.now() - 60000,
          Date.now() - 50000,
          Date.now() - 40000,
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


    }).addTo(map);
});

/*
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
