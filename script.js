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
    }).addTo(map);
});


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
