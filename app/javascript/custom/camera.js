let mapInitialized = false;

document.getElementById('map-btn').addEventListener('click', () => {
    const mapContainer = document.getElementById('map-container');

    if (mapContainer.style.display === 'none' || !mapContainer.style.display) {
    mapContainer.style.display = 'block';

    if (!mapInitialized) {
        initMap();
        mapInitialized = true;
    }

    document.getElementById('map-btn').innerText = 'カメラ連動マップを隠す';
    } else {
    mapContainer.style.display = 'none';
    document.getElementById('map-btn').innerText = 'カメラ連動マップを表示';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('map-container').style.display = 'none';
});

const cameraFocusMap = {
    "btn-north": { lat: 60.1282, lng: 18.6435 },
    "btn-south": { lat: -25.2744, lng: 133.7751 },
    "btn-east": { lat: 36.2048, lng: 138.2529 },
    "btn-west": { lat: 39.3999, lng: -8.2245 },
    "btn-southeast-asia": { lat: 13.7563, lng: 100.5018 },
    "btn-south-asia": { lat: 20.5937, lng: 78.9629 },
    "btn-africa": { lat: -1.2921, lng: 36.8219 },
    "btn-north-america": { lat: 37.0902, lng: -95.7129 },
    "btn-south-america": { lat: -14.2350, lng: -51.9253 },
    "btn-eastern-europe": { lat: 48.3794, lng: 31.1656 },
    "btn-central-asia": { lat: 48.0196, lng: 66.9237 },
    "btn-central-america": { lat: 8.538, lng: -80.7821 },
    "btn-middle-east": { lat: 23.8859, lng: 45.0792 },
    "btn-north-africa": { lat: 26.8206, lng: 30.8025 },
    "btn-arctic": { lat: 80.0, lng: 0.0 },
    "btn-antarctic": { lat: -75.25, lng: -0.07 },
    "btn-refresh" : { lat: 36.2048, lng: 138.2529 }
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