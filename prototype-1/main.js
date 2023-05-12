const oldPerson =
  "data:image/png;base64,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";

var map = L.map("map").setView([46.94863, 7.45164], 16);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
let polygon1;
let polygon2;
let popUp;
let T = 1500;
let event;
setTimeout(() => {
  popUp = L.marker([46.94863, 7.45164]).addTo(map);
  var myIcon = L.icon({
    iconUrl: oldPerson,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  L.marker([46.94863, 7.45164], { icon: myIcon, title: "ALTE PERSON" }).addTo(
    map
  );
}, T);
setTimeout(() => {
  polygon1 = L.polygon([
    [46.94863, 7.45164],
    [46.94587, 7.44254],
    [46.94387, 7.44554],
  ]).addTo(map);
}, T + 1000);
setTimeout(() => {
  popUp = L.popup({ sticky: true })
    .setLatLng([46.94587, 7.44254])
    .setContent("IN EINER STUNDE Person über 75 Jahre")
    .openOn(map);
  L.popup({ permanent: true })
    .setLatLng([46.94595, 7.4428])
    .setContent("IN ZWEI STNDEN Personen unter 10 Jahren")
    .openOn(map);
}, T + 1000);
setTimeout(() => {
  polygon2 = L.polygon([
    [46.94863, 7.45164],
    [46.92987, 7.41154],
    [46.92287, 7.42654],
  ]).addTo(map);
}, T + 2000);
