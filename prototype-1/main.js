const oldPerson = "https://svgsilh.com/svg/1800224.svg";
const child = "https://svgsilh.com/svg/44050.svg";
// VARIABLES
const rathaus = [46.94866, 7.45144];
const oneHourPolygon = [
  [46.94866, 7.45144],
  [46.94612, 7.4471],
  [46.949, 7.44311],
];
const twoHourPolygon = [
  [46.94612, 7.4471],
  [46.949, 7.44311],
  [46.94771, 7.43531],
  [46.94501, 7.44021],
];
const treeHourPolygon = [
  [46.94501, 7.44021],
  [46.94771, 7.43531],
  [46.95, 7.42318],
  [46.94214, 7.43094],
];
// INIT MAP
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
// PHASE T
setTimeout(() => {
  popUp = L.marker([46.94863, 7.45164]).addTo(map);
  var myIcon = L.icon({
    iconUrl: child,
    iconSize: [50, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  L.marker([46.94863, 7.45164], { icon: myIcon, title: "ALTE PERSON" }).addTo(
    map
  );
}, T);
[
  [46.94863, 7.45164],
  [46.94587, 7.44254],
  [46.94387, 7.44554],
];
// PHASE T + One Hour
setTimeout(() => {
  polygon1 = L.polygon(oneHourPolygon).addTo(map);
  createRandomPeople(100, rathaus).forEach((p) => {
    console.log(p);
    var myIcon = L.icon({
      iconUrl: child,
      iconSize: [50, 50],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });
    L.marker(p.position, { icon: myIcon, title: "ALTE PERSON" }).addTo(map);
  });
}, T + 1000);
// PHASE T + TWO HOUR
setTimeout(() => {
  L.polygon(twoHourPolygon).addTo(map);
  popUp = L.popup([46.94587, 7.44254])
    .setContent("IN EINER STUNDE Person über 75 Jahre")
    .openOn(map);
}, T + 1000);
L.popup({ options: true })
  .setLatLng([46.94595, 7.4428])
  .setContent("IN ZWEI STNDEN Personen unter 10 Jahren")
  .openOn(map);
// PHASE T + THREE HOURS
setTimeout(() => {
  L.polygon(treeHourPolygon).addTo(map);
}, T + 2000);

const createRandomInt = (max) => {
  return Math.random() * max;
};
const getRandomBuilding = () => {
  return BUILDINGS()[Math.floor(Math.random * BUILDINGS.length)];
};
/**
 *
 * @param {number} noPeople
 * @param {[number, number]} center
 */
const createRandomPeople = (noPeople, center) => {
  console.log(noPeople, center);
  const peopleArray = [];
  while (peopleArray.length < noPeople) {
    const position = [
      center[0] + (Math.random() - 0.5) * 0.003,
      center[1] + (Math.random() - 0.5) * 0.003,
    ];
    peopleArray.push({
      age: createRandomInt(100),
      position: getRandomBuilding(),
    });
  }
  return peopleArray;
};
