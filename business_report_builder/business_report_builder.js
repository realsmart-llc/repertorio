$("app-map").hide();

console.log(data)
var map = L.map('map')

$(".address").html(data["address"]);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

if(data.type == "point"){
    let radius = data.radius * 1600;
    let view = 13;

    if(radius > 15000){
    view = 10;
    }else if(radius > 8000){
    view = 11;
    }else if(radius > 3000){
    view = 12;
    }else if(radius > 1000){
    view = 13;
    }

    var coors = [data.geometry.coordinates[1],data.geometry.coordinates[0]];

    var marker = L.marker(coors, {}).addTo(map);
    var shapeLayer = L.circle(coors, radius).addTo(map);
    map.setView(marker.getLatLng(), view);
}else if(data.type == "polygon"){
    console.log("Flag One")
    var shapeLayer = L.geoJSON(data.geometry).addTo(map);
    map.fitBounds(shapeLayer.getBounds());
}

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.company_name) {
        layer.bindPopup(feature.properties.company_name);
    }
}

L.geoJSON(data, {
        onEachFeature: onEachFeature
}).addTo(map);
