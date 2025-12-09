let map = null;
let markers = [];

// document.getElementById("by").addEventListener("change", selectTown);

const greenIcon = L.icon({
  iconUrl: "../assets/img/logo.webp",
  iconSize: [50, 37],
});
// iconAnchor: [16, 32],
//shadowUrl: "../assets/img/logo.webp",

// Central data source
const locations = [
  {
    id: "aalborg",
    name: "Aalborg",
    lat: 57.0488,
    lon: 9.9217,
    zoom: 13
  },
  {
    id: "aarhus-vestergade",
    name: "Vestergade",
    lat: 56.1589,
    lon: 10.2046,
    zoom: 15
  },
  {
    id: "aarhus-fredensgade",
    name: "Fredensgade",
    lat: 56.162939,
    lon: 10.203921,
    zoom: 15
  },
  {
    id: "kolding",
    name: "Kolding",
    lat: 55.4904,
    lon: 9.4722,
    zoom: 13
  },
  {
    id: "odense",
    name: "Odense",
    lat: 55.4038,
    lon: 10.4024,
    zoom: 13
  }
];

// const locationCoords = {
//   "aarhus-fredensgade": { lat: 56.16294, lng: 10.20392, zoom: 15 },
//   "aarhus-vestergade": { lat: 56.1589, lng: 10.2046, zoom: 15 },
//   "odense": { lat: 55.4038, lng: 10.4024, zoom: 13 },
//   "kolding": { lat: 55.4904, lng: 9.4722, zoom: 13 },
//   "aalborg": { lat: 57.0488, lng: 9.9217, zoom: 13 }
// };

function makeMap(lat, lon, zoom = 6) {
  if (!map) {
    map = L.map("map").setView([lat, lon], zoom);


    //map in black and white
    //L.tileLayer("https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add markers once
    locations.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lon], { icon: greenIcon })
        .addTo(map)
        .bindPopup(loc.name);

      markers.push(marker);
    });
  }

  map.flyTo([lat, lon], zoom, {
    duration: 8,
    easeLinearity: 1,
  });
}


function selectTown() {
  const value = document.getElementById("by").value;

  if (value === "currentPos") {
    navigator.geolocation?.getCurrentPosition(pos => {
      makeMap(pos.coords.latitude, pos.coords.longitude, 13);
    });
    return;
  }

  const location = locations.find(l => l.id === value);
  if (!location) return;

  makeMap(location.lat, location.lon, location.zoom);
}


// Init with Aarhus (Vestergade)
makeMap(56.162939, 10.203921);
