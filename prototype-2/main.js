import { createWindPolygon } from "./lib.js";
var map = L.map("map").setView([46.94863, 7.45164], 16);
const rathaus = [46.94866, 7.45144];
const wind = [46.94806, 7.45004];
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
L.marker(rathaus).addTo(map);
L.polyline([rathaus, wind], { color: "red" }).addTo(map);
L.marker(wind).addTo(map);
L.polygon(createWindPolygon(rathaus, wind, 3), { color: "yellow" }).addTo(map);
const windVector = substractVectors(rathaus, wind);
const turnedWind = rotateVector(windVector, Math.PI);
//L.marker(addVectors(wind, windVector)).addTo(map);
L.polyline([wind, addVectors(wind, turnedWind)], { color: "blue" }).addTo(map);
/** Wind Origin */
const muenster = [46.94739, 7.45137];
const vMuenster = new Vector(...muenster);
// Wind Destination
const bundesHaus = [46.94653, 7.44688];
const vBund = new Vector(...bundesHaus);
// Resulting Wind Vector
const vWind = vBund.clone().subSelf(vMuenster);
// Rotated Wind
const rotWind = vWind.rotateDegrees(90);
// WindShift
const windShift = rotWind.clone().rotateDegrees(180).mulScalarSelf(0.5);
// FIRST BASEPOINT
const basePoint1 = vMuenster.clone().addSelf(windShift);
// SECOND BASEPOINT
const basePoint2 = vMuenster.clone().addSelf(windShift).addSelf(rotWind);
// BASELINE
const baseLine = [basePoint1.toArray(), basePoint2.toArray()];
// FIRSTPOLYGON
const polygon1 = [
  basePoint2.toArray(),
  basePoint1.toArray(),
  basePoint1.add(vWind).toArray(),
  basePoint2.add(vWind).toArray(),
];
// SecondPolygon
const polygon2 = [
  polygon1[2],
  polygon1[3],
  new Vector(...polygon1[3]).add(vWind).toArray(),
  new Vector(...polygon1[2]).add(vWind).toArray(),
];
/**
 *
 * @param {[number, number]} origin
 * @param {[number, number]} windVector
 * @param {number} time
 */
// function createWindPolygon(origin, windVector, time) {
//   const vOrigin = new Vector(...origin);
//   const vWind = new Vector(...windVector).sub(vOrigin);
//   console.log(vOrigin, vWind);
//   const rotWind = vWind.rotateDegrees(90);
//   // WindShift
//   const windShift = rotWind.clone().rotateDegrees(180).mulScalarSelf(0.5);
//   // FIRST BASEPOINT
//   const basePoint1 = vOrigin.clone().addSelf(windShift);
//   // SECOND BASEPOINT
//   const basePoint2 = vOrigin.clone().addSelf(windShift).addSelf(rotWind);
//   const targetPoint1 = basePoint1.add(vWind.mulScalar(time));
//   const targetPoint2 = basePoint2.add(vWind.mulScalar(time));
//   const polygon = [
//     basePoint2.toArray(),
//     basePoint1.toArray(),
//     targetPoint1.toArray(),
//     targetPoint2.toArray(),
//   ];
//   console.log(polygon);
//   return polygon;
// }
console.log(vMuenster.toArray(), vBund.toArray(), vWind.toArray());
L.polyline([vMuenster.toArray(), vBund.toArray()], { color: "green" }).addTo(
  map
);
/**
L.polyline(
  [vMuenster.toArray(), vMuenster.clone().addSelf(rotWind).toArray()],
  {
    color: "red",
  }
).addTo(map);
 */
L.polyline(baseLine, {
  color: "yellow",
}).addTo(map);
L.polygon(polygon1).addTo(map);
L.polygon(polygon2, { color: "green" }).addTo(map);
/**
 * Returns the vector from origin to destination
 * @param {[number, number]} origin
 * @param {[number, number]} destination
 * @returns {[number, number]}
 */
function substractVectors(origin, destination) {
  const x = destination[0] - origin[0];
  const y = destination[1] - origin[1];
  return [x, y];
}
/**
 *
 * @param {[number, number]} v1
 * @param {[number, number]} v2
 * @returns {[number, number]}
 */
function addVectors(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}
/**
 * @param {[number, number]} v1
 * @param {number} degrees
 * @returns
 */
function rotateVector(v1, degrees) {
  const angle = getAngle(v1);
  return [Math.cos(degrees + angle) * v1[0], Math.sin(degrees + angle) * v1[1]];
}
/**
 *
 * @param {[number, number]} v
 * @returns {number}
 */
function getAngle(v) {
  return Math.atan2(v[0], v[1]);
}
function translateVector(v, factor) {}
