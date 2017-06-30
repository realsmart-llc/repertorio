window.printReport = function(){
  $("#map").css("height", "500px")

  setTimeout(function(){window.print()}, 1000)
}

//
$("title").html(`Fashion Boutique Market Analysis for ${data["address"]}`);
$(".address").html(data["address"]);
// Map
var map = L.map('map').setView(data["geometry"]["coordinates"].reverse(), 13);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

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



  var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var centerMarker = L.marker(data["geometry"]["coordinates"], {icon: redIcon});
  centerMarker.addTo(map)
  centerMarker._bringToFront();


// Numbers

var marketValue = data["data"]["marketSize"]
console.log(`data object: ${JSON.stringify(data)}`)

console.log(`marketValue ${marketValue}`)

$("#marketValue").html("$" + marketValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

var marketValue3Years = data["data"]["threeYearMarketForecast"]
$("#marketValue3Years").html("$" + marketValue3Years.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

var growthRate = data["data"]["growthRate"]
$("#growthRate").html("+" + Math.round(growthRate * 100) + "%");

var potentialCustomers = data["data"]["population2015"]
$("#potentialCustomers").html(Math.round(potentialCustomers));

var competitorNumber = data["data"]["places"].length
$("#competitorNumber").html(competitorNumber);

for(var i = 0; i < competitorNumber; i++){
  console.log(data["data"]["places"][i])
  var competitorName = (data["data"]["places"][i]["name"]);
  var competitorTypes = (data["data"]["places"][i]["types"].join(", "));
  var competitorVicinity = (data["data"]["places"][i]["vicinity"]);
  var template = `
        <tr>
          <td id="firstCompetitorName">${i + 1}</td>
          <td id="firstCompetitorName">${competitorName}</td>
          <td id="firstCompetitorName">${competitorTypes}</td>
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
