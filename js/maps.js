let latitude;
let longitude;
let map = null;

document.getElementById("by").addEventListener("change", selectTown);

var greenIcon = L.icon({
  iconUrl: "../assets/img/logo.webp",
  shadowUrl: "../assets/img/logo.webp",
});

// Create map once
function makeMap(lat, lon) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; Rolfs map",
    }).addTo(map);
  }

  // Add marker + fly to new location
  map.flyTo([lat, lon], 13);
  L.marker([lat, lon], { icon: greenIcon }).addTo(map);
}

const locations = [
  { name: "Aalborg", lat: 57.0488, lon: 9.9217 },
  { name: "Vestergade", lat: 56.162939, lon: 10.203921 },
  { name: "Fredensgade", lat: 56.162939, lon: 10.203921 },
  { name: "Kolding", lat: 55.4904, lon: 9.4722 },
  { name: "Odense", lat: 55.4038, lon: 10.4024 },
];

function selectTown() {
  const by = document.getElementById("by").value;
  console.log(by);

  if (by == "arhus-vestergade") {
    latitude = 56.1572;
    longitude = 10.2107;
    makeMap(latitude, longitude);
    return;
  }

  if (by == "arhus-vestergade") {
    latitude = 56.1572;
    longitude = 10.2107;
    makeMap(latitude, longitude);
    return;
  }

  if (by == "odense") {
    latitude = 55.3959;
    longitude = 10.3883;
    makeMap(latitude, longitude);
    return;
  }

  if (by == "aalborg") {
    latitude = 57.048;
    longitude = 9.9187;
    makeMap(latitude, longitude);
    return;
  }

  if (by == "kolding") {
    latitude = 55.7093;
    longitude = 9.5357;
    makeMap(latitude, longitude);
    return;
  }

  if (by == "currentPos") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        makeMap(latitude, longitude);
      });
    }
    return;
  }
}

// Initialize map with Aarhus by default
latitude = 56.1572;
longitude = 10.2107;
makeMap(latitude, longitude);
