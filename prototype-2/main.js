import {
  createWindPolygon,
  loadData,
  getPeopleInPolygon,
  oldPersonIcon,
  youngPersonIcon,
  alarmIcon,
  windIcon,
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
updateTextnode();

map.on("click", (e) => {
  if (clickOrigin && clickWind) {
    clickOrigin = undefined;
    clickWind = undefined;
    map.removeLayer(originMarker);
    map.removeLayer(windMarker);
    map.removeLayer(windVector);
    map.removeLayer(markerGroup);
    return;
  }
  if (clickOrigin) {
    clickWind = e.latlng;
    windMarker = L.marker(clickWind, { icon: windIcon }).addTo(map);
    triggerCloudCalculation();
    return;
  }
  clickOrigin = e.latlng;
  originMarker = L.marker(clickOrigin, { icon: alarmIcon }).addTo(map);
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
    const oldPeople = people.filter((p) => p.Alter >= 75);
    oldPeople.forEach((person) => {
      markers.push(
        L.marker(L.latLng(...person.position), { icon: oldPersonIcon })
      );
    });
    const youngPeople = people.filter((p) => p.Alter <= 10);
    youngPeople.forEach((person) => {
      markers.push(
        L.marker(L.latLng(...person.position), { icon: youngPersonIcon })
      );
    });
    updateTextnode(people, oldPeople, youngPeople);
    markerGroup = L.featureGroup(markers).addTo(map);
    hour += 1;
    if (hour > MAXHOURS) clearInterval(intervall);
  }, 1000);
}

function updateTextnode(noPeople, noOldPeople, noYoungPeople) {
  document.getElementById("alarm").textContent =
    windVector !== undefined
      ? `Alarm bei Koordinaten ${clickOrigin}`
      : "Kein Alarm ausgelöst. Starten sie einen Alarm!";
  document.getElementById("noPeople").textContent =
    noPeople === undefined
      ? "Keine Personen betroffen"
      : `${noPeople.length} Personen betroffen`;
  document.getElementById("oldPeople").textContent =
    noOldPeople === undefined
      ? "Keine Personen > 75 Jahre betroffen"
      : `${noOldPeople.length} Personen > 75 Jahre betroffen`;
  document.getElementById("youngPeople").textContent =
    noYoungPeople === undefined
      ? "Keine Personen < 10 Jahren betroffen"
      : `${noYoungPeople.length} Personen < 10 Jahren betroffen`;
}

/*
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
