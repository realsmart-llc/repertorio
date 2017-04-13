window.printReport = function(){
  chart.resize({
    height: 260,
    width: 400
  });

  $("#map").css("height", "200px")

  setTimeout(function(){window.print()}, 1000)
}

//

$("title").html(`Longitudinal Population Report for ${data["address"]}`);
$(".address").html(data["address"]);


if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

var chart = c3.generate({
  bindto: '#chart',
  // size: {
  //       height: 320,
  //       width: 350
  // },
  data: {
    columns: [
      ["Population",
      data["years"]["1990"]["total"], data["years"]["1995"]["total"], data["years"]["2000"]["total"], data["years"]["2005"]["total"], data["years"]["2010"]["total"], data["years"]["2015"]["total"]]
    ]
  },
  color: {
      pattern: ['#D49D2E', '#60A0BE', '#E0601B', '6D3F94']
  },
  axis: {
    x: {
      type: 'category',
      categories: ['1990', '1995', '2000', '2005','2010','2015']
    },
    y: {
        label: {
            text: '# of People',
            position: 'outer-middle'
        }
    }
  }
});

// Table

var firstChangeValue =
(data["years"]["1995"]["total"] - data["years"]["1990"]["total"])/data["years"]["1990"]["total"]
var secondChangeValue =
(data["years"]["2000"]["total"] - data["years"]["1995"]["total"])/data["years"]["1995"]["total"]
var thirdChangeValue =
(data["years"]["2005"]["total"] - data["years"]["2000"]["total"])/data["years"]["2000"]["total"]
var fourthChangeValue =
(data["years"]["2010"]["total"] - data["years"]["2005"]["total"])/data["years"]["2005"]["total"]
var fifthChangeValue =
(data["years"]["2015"]["total"] - data["years"]["2010"]["total"])/data["years"]["2010"]["total"]


$("#90to95").html(Math.round(firstChangeValue * 10000)/100);
$("#95to00").html(Math.round(secondChangeValue * 10000)/100);
$("#00to05").html(Math.round(thirdChangeValue * 10000)/100);
$("#05to10").html(Math.round(fourthChangeValue * 10000)/100);
$("#10to15").html(Math.round(fifthChangeValue * 10000)/100);


var zoomLevel = 13;
var map = L.map('map').setView([35.7796, -78.6382], zoomLevel);
if(data.geometry.radius > 15000){
  zoomLevel = 10;
}else if(data.geometry.radius > 8000){
  zoomLevel = 11;
}else if(data.geometry.radius > 3000){
  zoomLevel = 12;
}else if(data.geometry.radius > 1000){
  zoomLevel = 13;
}
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
if(data.geometry.type == "Point"){
  var marker = L.marker([data.geometry.coordinates[1], data.geometry.coordinates[0]]).addTo(map);
  var shapeLayer = L.circle([data.geometry.coordinates[1], data.geometry.coordinates[0]], data.geometry.radius).addTo(map);
  map.setView(marker.getLatLng(), zoomLevel);
}else if(data.geometry.type == "polygon" || data.geometry.type == "Polygon"){
  var shapeLayer = L.geoJSON(data.geometry.geometry).addTo(map);
  map.fitBounds(shapeLayer.getBounds());
}
