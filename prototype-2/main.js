import {
  createWindPolygon,
  loadData,
  getPeopleInPolygon,
  oldPersonIcon,
  youngPersonIcon,
} from "./lib.js";
var map = L.map("map").setView([46.94863, 7.45164], 16);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
const data = loadData();

let clickOrigin;
let originMarker;
let clickWind;
let windMarker;
let windVector;
let markerGroup;
const MAXHOURS = 5;
let hour = 0;
let polygon;
map.on("click", (e) => {
  if (clickOrigin && clickWind) {
    clickOrigin = undefined;
    clickWind = undefined;
    map.removeLayer(originMarker);
    map.removeLayer(windMarker);
    map.removeLayer(windVector);
    return;
  }
  if (clickOrigin) {
    clickWind = e.latlng;
    windMarker = L.marker(clickWind).addTo(map);
    triggerCloudCalculation();
    return;
  }
  clickOrigin = e.latlng;
  originMarker = L.marker(clickOrigin).addTo(map);
});

function triggerCloudCalculation() {
  windVector = L.polyline([clickOrigin, clickWind], { color: "red" }).addTo(
    map
  );
  hour = 0;
  const intervall = setInterval(() => {
    const originKoords = [originMarker._latlng.lat, originMarker._latlng.lng];
    const windKoords = [windMarker._latlng.lat, windMarker._latlng.lng];
    if (polygon) map.removeLayer(polygon);
    const windPolygon = createWindPolygon(originKoords, windKoords, hour);
    polygon = L.polygon(windPolygon, {
      color: "yellow",
    }).addTo(map);
    const people = getPeopleInPolygon(windPolygon, data);
    console.log(people);
    const markers = [];
    people
      .filter((p) => p.Alter >= 75)
      .forEach((person) => {
        markers.push(
          L.marker(L.latLng(...person.position), { icon: oldPersonIcon })
        );
      });
    people
      .filter((p) => p.Alter <= 10)
      .forEach((person) => {
        markers.push(
          L.marker(L.latLng(...person.position), { icon: youngPersonIcon })
        );
      });
    markerGroup = L.featureGroup(markers).addTo(map);
    hour += 1;
    if (hour > MAXHOURS) clearInterval(intervall);
  }, 1000);
} /*
const rathaus = [46.94866, 7.45144];
const wind = [46.94806, 7.45004];

originMarker = L.marker(rathaus).addTo(map);
windVector = L.polyline([rathaus, wind], { color: "red" }).addTo(map);
windMarker = L.marker(wind).addTo(map);

const intervall = setInterval(() => {
  if (polygon) map.removeLayer(polygon);
  polygon = L.polygon(createWindPolygon(rathaus, wind, hour), {
    color: "yellow",
  }).addTo(map);
  hour += 1;
  if (hour > MAXHOURS) clearInterval(intervall);
}, 1000);
//L.polygon(createWindPolygon(rathaus, wind, 3), { color: "yellow" }).addTo(map);
*/
