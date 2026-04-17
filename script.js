// 地図の初期化
const map = L.map('map').setView([35.681236, 139.767125], 13);
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: '国土地理院'
}).addTo(map);
/*
// GPXフォルダからデータをロード
const runners = ['mik.gpx'];
runners.forEach((file, index) => {
    new L.GPX(`./gpxdata/${file}`, {
        async: true,
        marker_options: {
            startIconUrl: './images/start.png',
            endIconUrl: './images/goal.png',
        },
        polyline_options: {
            color: 'blue',
            opacity: 0.7,
            weight: 3,
            lineCap: 'round'
        }
    }).on('loaded', function(e) {
        const gpx = e.target;
        // ズームレベルを調整（大きめに設定）
        map.fitBounds(gpx.getBounds(), { padding: [50, 50] });
    }).addTo(map);
    */

// GPXフォルダからデータをロード
const runners = ['mik2.gpx']; //, 'runner2.gpx', 'runner3.gpx'];
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
// チェックポイントの表示
fetch('https://script.google.com/macros/s/YOUR_DEPLOYED_GAS_URL/exec')
    .then(res => res.json())
    .then(data => {
        data.forEach(cp => {
            const color = cp.order === 's' ? 'red' : cp.order === 'g' ? 'green' : 'blue';
            const marker = cp.order === 's' ? L.polygon([[cp.lat, cp.lon]], {color: 'red'}) :
                          cp.order === 'g' ? L.circle([cp.lat, cp.lon], {color: 'green', radius: 10}) :
                          L.circleMarker([cp.lat, cp.lon], {color: 'blue', radius: 8});
            marker.bindPopup(cp.name).addTo(map);
        });
    });
    */
