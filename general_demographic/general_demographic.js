window.printReport = function(){
    chart1.resize({
    height: 230,
    width: 320
  });

  chart2.resize({
    height: 230,
    width: 320
  });

  chart3.resize({
    height: 230,
    width: 320
  });

  chart4.resize({
    height: 250,
    width: 400
  });

  chart5.resize({
    height: 250,
    width: 400
  });

  $("#map").css("height", "180px")

  setTimeout(function(){window.print()}, 1000)
}


var type = data["reportSpecification"]["geoJSON"]["geometry"]["type"];
var address = data["reportSpecification"]["geoJSON"]["properties"]["address"];
var coordinates = data["reportSpecification"]["geoJSON"]["geometry"]["coordinates"];

var chart1 = c3.generate({
  bindto: '#chart1',
    data: {
      json: [data["race"]],
       keys: {
        value: ['White', 'Black or African American', 'Asian']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#E29A2F', '#58B5B4', '#C94292']
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

var chart2 = c3.generate({
  bindto: '#chart2',
    data: {
      json: [data["latino"]],
       keys: {
        value: ['Latino', 'Non-Latino']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#52B4B4', '#6A479C']
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

var chart3 = c3.generate({
  bindto: '#chart3',
    data: {
      json: [data["population"]],
       keys: {
        value: ['0To25', '25To65', '65Plus']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#6FA9D4', '#A33E54', '#E69E87']
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

var chart4 = c3.generate({
  bindto: '#chart4',
    data: {
      json: [data["homes"]],
       keys: {
        value: ['Owner Occupied', 'Renter Occupied']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#F16224', '#27668D']
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

var chart5 = c3.generate({
  bindto: '#chart5',
    data: {
      json: [data["education"]],
       keys: {
        value: ['Did Not Finish High School', 'High School or GED', 'Bachelor\'s degree', 'Master\'s or Professional', 'Doctorate degree']
      },
      type: 'pie',
      },
      color: {
      pattern: ['#6FA9D4', '#74AA41', '#C82F91', '#E39924', '#6A479C']
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
$("title").html(`General Demographic Report for ${data["address"]}`);
$(".address").html(address);
var radius = data["reportSpecification"]["geoJSON"]["geometry"]["radius"];

if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(Math.floor(radius/1600));
  $("#polygon").hide()
}


document.getElementById("total-population").innerHTML = Math.floor(data["population"]["total"]);

document.getElementById("median-household-income").innerHTML = data["median_income"];

document.getElementById("number-of-homes").innerHTML = Math.floor(data["housing"]["numberOfHouseholds"]);


document.getElementById("median-home-value").innerHTML = data["housing"]["median"];



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
