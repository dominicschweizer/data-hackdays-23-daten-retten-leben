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
  popUp = L.popup()
    .setLatLng([46.9k4863, 7.45164])
    .setContent("AUSBRUCH Gaswolke")
    .openOn(map);
}, T);
setTimeout(() => {
  polygon1 = L.polygon([
    [46.94863, 7.45164],
    [46.94587, 7.44254],
    [46.94387, 7.44554],
  ]).addTo(map);
}, T + 1000);
setTimeout(() => {
  popUp = L.popup()
    .setLatLng([46.94587, 7.44254])
    .setContent("IN EINER STUNDE \nPerson über 75 Jahre")
    .openOn(map);
}, T + 1000);
setTimeout(() => {
  polygon2 = L.polygon([
    [46.94863, 7.45164],
    [46.92987, 7.41154],
    [46.92287, 7.42654],
  ]).addTo(map);
}, T + 2000);
// Stream big file in worker thread
Papa.parse('data/geodaten.csv', {
	worker: true,
	step: function(results) {
		console.log("Row:", results.data);
	}
});