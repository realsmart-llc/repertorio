var map = L.map('map').setView([35.1802066, -79.7671846], 8);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.geoJson(incomeData).addTo(map);


function getColor(number) {
    if ( number < incomeData.properties.categories[0]) {
      return '#800026'
    }
    else if (number < incomeData.properties.categories[1]) {
      return '#BD0026'
    }
    else if (number < incomeData.properties.categories[2]) {
      return '#E31A1C'
    }
    else if (number < incomeData.properties.categories[3]) {
      return '#FC4E2A'
    }
    else  if (number < incomeData.properties.categories[4]) {
      return '#FD8D3C'
    }
    else {
      return '#FEB24C';
    }
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.number),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}


var geojson = L.geoJson(incomeData, {
  style: style,
}).addTo(map);
