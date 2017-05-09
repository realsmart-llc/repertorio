window.printReport = function(){
  chart.resize({
    height: 260,
    width: 400
  });

  $("#map").css("height", "200px")

  setTimeout(function(){window.print()}, 1000)
}

//
var type = data["reportSpecification"]["geoJSON"]["geometry"]["type"];
var address = data["reportSpecification"]["geoJSON"]["properties"]["address"];
var coordinates = data["reportSpecification"]["geoJSON"]["geometry"]["coordinates"];
var radius = data["reportSpecification"]["geoJSON"]["geometry"]["radius"];

$(".address").html(address);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(Math.floor(radius/1600));
  $("#polygon").hide()
}

var chart = c3.generate({
  bindto: '#chart',
  // size: {
  //       height: 320
  // },
  data: {
    columns: [
      ["House Value",
      data["years"]["1990"]["median"], data["years"]["1995"]["median"], data["years"]["2000"]["median"], data["years"]["2005"]["median"], data["years"]["2010"]["median"], data["years"]["2015"]["median"]]
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
            text: 'Value in 2017 USD ($)',
            position: 'outer-middle'
        }
    }
  },
  tooltip: {
        format: {
            title: function (d) { return 'Data ' + d; },
            value: function (value, ratio, id) {
                var format = id === 'data1' ? d3.format(',') : d3.format('$');
                return format(value);
            }
        }
    }
});

// Percent Change Table

var firstChangeValue =
(data["years"]["1995"]["median"] - data["years"]["1990"]["median"])/data["years"]["1990"]["median"]
var secondChangeValue =
(data["years"]["2000"]["median"] - data["years"]["1995"]["median"])/data["years"]["1995"]["median"]
var thirdChangeValue =
(data["years"]["2005"]["median"] - data["years"]["2000"]["median"])/data["years"]["2000"]["median"]
var fourthChangeValue =
(data["years"]["2010"]["median"] - data["years"]["2005"]["median"])/data["years"]["2005"]["median"]
var fifthChangeValue =
(data["years"]["2015"]["median"] - data["years"]["2010"]["median"])/data["years"]["2010"]["median"]


$("#90to95").html(Math.round(firstChangeValue * 10000)/100);
$("#95to00").html(Math.round(secondChangeValue * 10000)/100);
$("#00to05").html(Math.round(thirdChangeValue * 10000)/100);
$("#05to10").html(Math.round(fourthChangeValue * 10000)/100);
$("#10to15").html(Math.round(fifthChangeValue * 10000)/100);


var zoomLevel = 13;
var map = L.map('map').setView([35.7796, -78.6382], zoomLevel);
if(radius > 15000){
  zoomLevel = 10;
}else if(radius > 8000){
  zoomLevel = 11;
}else if(radius > 3000){
  zoomLevel = 12;
}else if(radius > 1000){
  zoomLevel = 13;
}
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
if(type == "Point"){
  var marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);
  var shapeLayer = L.circle([coordinates[1], coordinates[0]], radius).addTo(map);
  map.setView(marker.getLatLng(), zoomLevel);
}else if(type == "polygon" || type == "Polygon"){
  var shapeLayer = L.geoJSON(data["reportSpecification"]["geoJSON"]["geometry"]).addTo(map);
  map.fitBounds(shapeLayer.getBounds());
}
