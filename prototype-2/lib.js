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
