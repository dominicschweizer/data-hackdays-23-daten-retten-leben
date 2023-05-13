const iconSize = [10, 10];
/**
 *
 * @param {[number, number]} origin
 * @param {[number, number]} windVector
 * @param {number} time
 */
export function createWindPolygon(origin, windVector, time) {
  const vOrigin = new Vector(...origin);
  const vWind = new Vector(...windVector).sub(vOrigin);
  const rotWind = vWind.rotateDegrees(90);
  // WindShift
  const windShift = rotWind.clone().rotateDegrees(180).mulScalarSelf(0.5);
  // FIRST BASEPOINT
  const basePoint1 = vOrigin.clone().addSelf(windShift);
  // SECOND BASEPOINT
  const basePoint2 = vOrigin.clone().addSelf(windShift).addSelf(rotWind);
  const targetPoint1 = basePoint1.add(vWind.mulScalar(time));
  const targetPoint2 = basePoint2.add(vWind.mulScalar(time));
  const polygon = [
    basePoint2.toArray(),
    basePoint1.toArray(),
    targetPoint1.toArray(),
    targetPoint2.toArray(),
  ];
  return polygon;
}

export function loadData() {
  // Stream big file in worker thread
  let geodata = [];
  Papa.parse("../prototype-1/data/geodaten.csv", {
    //worker: true,
    download: true,
    header: true,
    complete: (results) => {
      results.data.forEach((bro) => {
        // hier werden wir aus dem objekt ein koordinaten paar beziehen
        const coordpair = [
          parseFloat(bro["WGS84-N"]),
          parseFloat(bro["WGS84-E"]),
        ];
        bro.position = coordpair;
        // prüfen ob die koordinaten nummerisch sind
        if (typeof coordpair[0] !== "number" || Number.isNaN(coordpair[0])) {
          return;
        }
        geodata.push(bro);
      });
    },
  });
  return geodata;
}

export function getPeopleInPolygon(polygon, people) {
  const poly = buildTurfPolygon(polygon);
  return people.filter((p) => {
    return turf.booleanPointInPolygon(turf.point(p.position), poly);
  });
}
function buildTurfPolygon(polygon) {
  const pPoints = [...polygon];
  // close the polygon
  pPoints.push(pPoints[0]);
  return turf.polygon([[...pPoints]]);
}
export const oldPersonIcon = L.icon({
  iconUrl: "https://svgsilh.com/svg/1800224-ff5722.svg",
  iconSize: iconSize,
  iconAnchor: iconSize,
});
export const youngPersonIcon = L.icon({
  iconUrl: "https://svgsilh.com/svg/44050.svg",
  iconSize: iconSize,
  iconAnchor: iconSize,
});
export const alarmIcon = L.icon({
  iconUrl: "https://svgsilh.com/svg/98704-9f1212.svg",
  iconSize: iconSize.map((n) => n * 6),
  iconAnchor: iconSize,
});
