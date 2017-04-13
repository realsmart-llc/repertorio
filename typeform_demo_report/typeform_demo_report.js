window.printReport = function(){

  $("#map").css("height", "500px")

  setTimeout(function(){window.print()}, 1000)
}

function humanize(str) {
  return str
      .replace(/^[\s_]+|[\s_]+$/g, '')
      .replace(/[_\s]+/g, ' ')
      .replace(/^[a-z]/, function(m) { return m.toUpperCase(); });
}

// Map

var map = L.map('map').setView([35.7822274,-78.6566519], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Setup tilelayer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


// Markers

L.NumberedDivIcon = L.Icon.extend({
  options: {
  iconUrl: 'marker_hole.png',
  number: '',
  shadowUrl: null,
  iconSize: new L.Point(25, 41),
  iconAnchor: new L.Point(13, 41),
  popupAnchor: new L.Point(0, -33),
  className: 'leaflet-div-icon'
  },

  createIcon: function () {
  var div = document.createElement('div');
  var img = this._createImg(this.options['iconUrl']);
  var numdiv = document.createElement('div');
  numdiv.setAttribute ( "class", "number" );
  numdiv.innerHTML = this.options['number'] || '';
  div.appendChild ( img );
  div.appendChild ( numdiv );
  this._setIconStyles(div, 'icon');
  return div;
  },

  createShadow: function () {
  return null;
  }
});

  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var violetIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var yellowIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });







for (var i = 0; i < data["responses"].length; i++) {
  // var marker = new L.Marker(new L.LatLng(data["responses"][i]["coordinates"]), {
  //  icon:	new L.NumberedDivIcon({number: i+1})
  // });

  var icon;
  switch(data["responses"][i].category){
    case "Broadband":
      icon = yellowIcon;
    break;
    case "Retail Online Services":
      icon = orangeIcon;
    break;
    case "Internet of Things":
      icon = violetIcon;
    break;
    case "Gridpower":
      icon = redIcon;
    break;
    case "Healthcare":
      icon = greenIcon;
    break;
    case "Training and Education":
      icon = blueIcon;
  }


  var marker = new L.Marker(data["responses"][i]["coordinates"], {icon: icon})

  marker.addTo(map)

  var dataName = data["responses"][i]["name"]
  var dataCategory = data["responses"][i]["category"]

  var template = `
                <tr>
                  <td class="${dataCategory.replace(/ /g,"_").toLowerCase()}">${dataCategory}</td>
                  <td>${dataName}</td>
                </tr>
                `
  $("#rows").append(template);
}
