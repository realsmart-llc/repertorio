var map = L.map('map').setView([35.1802066, -79.7671846], 8);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.geoJson(incomeData).addTo(map);


// var medianIcomeNumber = feature.properties.median

function getColor(m) {
    if ( m < 20000) {
      return '#800026'
    }
    else if (m < 40000) {
      return '#BD0026'
    }
    else if (m < 70000) {
      return '#E31A1C'
    }
    else if (m < 100000) {
      return '#FC4E2A'
    }
    else  if (m < 99999999) {
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
