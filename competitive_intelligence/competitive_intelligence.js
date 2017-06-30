window.printReport = function(){
  $("#map").css("height", "500px")

  setTimeout(function(){window.print()}, 1000)
}

//
var type = data["reportSpecification"]["geoJSON"]["geometry"]["type"];
var address = data["reportSpecification"]["geoJSON"]["properties"]["address"];
var coordinates = data["reportSpecification"]["geoJSON"]["geometry"]["coordinates"];
//

$("title").html(`Longitudinal Population Report for ${data["address"]}`);
$(".address").html(address);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

// Map

var zoomLevel = 13;
var map = L.map('map').setView([35.7908125, -78.829073], zoomLevel);
if(radius > 15000){
  zoomLevel = 10;
}else if(radius > 8000){
  zoomLevel = 11;
}else if(radius > 3000){
  zoomLevel = 12;
}else if(radius > 1000){
  zoomLevel = 13;
}
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

if(type == "Point"){
  var centerMarker = L.marker([coordinates[1], coordinates[0]], {icon: redIcon});
  centerMarker.addTo(map)
  map.setView([coordinates[1], coordinates[0]])
  centerMarker._bringToFront();

  // var marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);
  var shapeLayer = L.circle([coordinates[1], coordinates[0]], radius).addTo(map);
  // map.setView(marker.getLatLng(), zoomLevel);
}else if(type == "polygon" || type == "Polygon"){
  var shapeLayer = L.geoJSON(data["reportSpecification"]["geoJSON"]["geometry"]).addTo(map);
  map.fitBounds(shapeLayer.getBounds());
}


// Markers

L.NumberedDivIcon = L.Icon.extend({
  options: {
  iconUrl: 'https://s3.amazonaws.com/cartoscope-assets/assets/marker_hole.png',
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

for (var i = 0; i < data["data"]["places"].length; i++) {
var coord = data["data"]["places"][i]["geometry"]["location"];
// array.push(zebra);
// var marker = L.marker([coord.lat,coord.lng]).addTo(map);

var marker = new L.Marker(new L.LatLng(coord.lat,coord.lng), {
 icon:	new L.NumberedDivIcon({number: i+1})
});

marker.addTo(map)
}

// Numbers

var competitorNumber = data["data"]["places"].length
$("#competitorNumber").html(competitorNumber);

for( i =0; i < competitorNumber; i++){
  var competitorName = (data["data"]["places"][i]["name"]);
  var competitorVicinity = (data["data"]["places"][i]["vicinity"]);
  var template = `
        <tr>
          <td id="firstCompetitorName">${i + 1}</td>
          <td id="firstCompetitorName">${competitorName}</td>
          <td id="firstCompetitorName">${competitorVicinity}</td>
        </tr>
        `

  $("#rows").append(template);
}

Number.prototype.formatMoney = function(c, d, t){
    var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
