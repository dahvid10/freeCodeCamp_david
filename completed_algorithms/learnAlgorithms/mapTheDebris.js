function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    return arr.map(element => {
        const debris = {};
        debris["name"] = element.name;
        debris["orbitalPeriod"] = Math.round(2 * Math.PI * Math.sqrt((element.avgAlt + earthRadius) ** 3 / GM));
        return debris;
    });
  }
  
  a = orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble",
  avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]);
  console.log(a);