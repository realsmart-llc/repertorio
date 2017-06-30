window.printReport = function(){
  chart1.resize({
    height: 180,
    width: 450
  });

  chart2.resize({
    height: 200,
    width: 350
  });

  chart3.resize({
    height: 200,
    width: 350
  });

  chart4.resize({
    height: 200,
    width: 350
  });


  $("#map").css("height", "200px")

  setTimeout(function(){window.print()}, 1000)
}

//
var type = data["reportSpecification"]["geoJSON"]["geometry"]["type"];
var address = data["reportSpecification"]["geoJSON"]["properties"]["address"];
var coordinates = data["reportSpecification"]["geoJSON"]["geometry"]["coordinates"];
//

var povertyRate = Math.round((data["poverty"]['Total Families Below Poverty Line'] / data["poverty"]['Total Families']  * 10000))/100
console.log(povertyRate)
document.getElementById("povertyRate").innerHTML = povertyRate;


var chart1 = c3.generate({
  bindto: '#chart1',
    // size: {
    //   height: 180
    // },
    data: {
      json: [data["poverty"]],
       keys: {
        value: ['Total Families', 'Total Families Below Poverty Line']
      },
      type: 'pie',
      },
      color: {
        pattern: ['#A33E54', '#6EA9D5']
      },
      pie: {
        label: {
          format: function(value, ratio, id) {
            return value;
          }
        }
      },
      tooltip: {
      grouped: false,
      format: {
          title: function (d) { return 'Data'},
          value: function (value, ratio, id) {
              var format = id === 'data1' ? d3.format(',') : d3.format('');
              return format(value);
          }
        }
      }
    });

    var chart2 = c3.generate({
      bindto: '#chart2',
        // size: {
        //   height: 220
        // },
        data: {
          json: [data["poverty"]],
           keys: {
            value: ['Married Family with Children 5-17', 'Single Dad with Children 5-17', 'Single Mom with Children 5-17']
          },
          type: 'pie',
          },
          color: {
          pattern: ['#E29A2F', '#6A479C', '#58B5B4']
          },
          pie: {
            label: {
              format: function(value, ratio, id) {
                return value;
              }
            }
          },
          tooltip: {
          grouped: false,
          format: {
              title: function (d) { return 'Data'},
              value: function (value, ratio, id) {
                  var format = id === 'data1' ? d3.format(',') : d3.format('');
                  return format(value);
              }
            }
          }
        });

    var chart3 = c3.generate({
      bindto: '#chart3',
        // size: {
        //   height: 220
        // },
        data: {
          json: [data["poverty"]],
           keys: {
            value: ['Married Family with Children 5-17', 'Single Dad with Children 5-17', 'Single Mom with Children 5-17']
          },
          type: 'pie',
          },
          color: {
          pattern: ['#E29A2F', '#6A479C', '#58B5B4']
          },
          tooltip: {
          grouped: false,
          format: {
              title: function (d) { return 'Data'},
              value: function (value, ratio, id) {
                  var format = id === 'data1' ? d3.format(',') : d3.format('');
                  return format(value);
              }
        }
      }
    });

    var chart4 = c3.generate({
      bindto: '#chart4',
        // size: {
        //   height: 200
        // },
        data: {
          json: [data["poverty"]],
           keys: {
            value: ['Families Below Poverty Line Without Children', 'Families Below Poverty Line With Children 5-17' ]
          },
          type: 'pie',
          },
          color: {
          pattern: ['#74AA41', '#27668D']
          },
          tooltip: {
          grouped: false,
          format: {
              title: function (d) { return 'Data'},
              value: function (value, ratio, id) {
                  var format = id === 'data1' ? d3.format(',') : d3.format('');
                  return format(value);
              }
        }
      }
    });

//

$("title").html(`Gridworx Poverty Report for ${data["address"]}`);
$(".address").html(address);


if(data.type == "polygon"){
  $("#point").hide();
}else{
  var radius = data["reportSpecification"]["geoJSON"]["geometry"]["radius"];

  $("#radius").html(data["reportSpecification"]["geoJSON"]["geometry"]["radius"]);
  $("#polygon").hide()
}

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

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);
if(type == "Point"){
  var marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);
  var shapeLayer = L.circle([coordinates[1], coordinates[0]], radius).addTo(map);
  map.setView(marker.getLatLng(), zoomLevel);
}else if(type == "polygon" || type == "Polygon"){
  var shapeLayer = L.geoJSON(data["reportSpecification"]["geoJSON"]["geometry"]).addTo(map);
  map.fitBounds(shapeLayer.getBounds());
}
