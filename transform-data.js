const fs = require("fs");
const file = fs.readFileSync(
  "/home/dominic/Downloads/daten_retten_leben_geodaten.csv",
  { encoding: "utf-8" }
);
const arr = file
  .split("\n")
  .map((n) => n.trim().split(","))
  .filter((arr) => arr.length === 4)
  .slice(2);
const coords = arr.map((arr) => {
  return `${arr[2].slice(0, 8)};${arr[3].slice(0, 8)}`;
});
const buildings = [...new Set(coords)].map((s) => s.split(";"));
console.log(buildings.length);
fs.writeFileSync(
  "buildings.js",
  `const BUILDINGS=${JSON.stringify(buildings)}`,
  {
    encoding: "utf-8",
  }
);
