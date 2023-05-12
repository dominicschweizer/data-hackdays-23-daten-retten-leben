// filter a list of persons by a polygon area 
export function filterGeodata(persons, polygon) {

    // poly = turf.polygon(polygon);
    var result = []

    for (let person in persons) {
        if(turf.booleanPointInPolygon(turf.point(person.LatLong),polygon)) {
            result.push(persons[person]);
        };
    };
    return result;
}