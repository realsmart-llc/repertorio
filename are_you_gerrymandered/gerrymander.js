
$("#spinner").hide()
$("#social-share").hide()

$("#results").hide();

var input = document.getElementById('input');
var autocomplete = new google.maps.places.Autocomplete(input);
var address;

// Table
function processTableObject(data) {

  function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

  var firstChangeValue =
  (data["political-affiliation"]["republican"])
  var secondChangeValue =
  (data["political-affiliation"]["democratic"])
  var thirdChangeValue =
  (data["political-affiliation"]["unaffiliated"])
  var fourthChangeValue =
  (data["race"]["black"])
  var fifthChangeValue =
  (data["race"]["white"])
  var sixthChangeValue =
  (data["race"]["other"])
  var seventhChangeValue =
  (data["income"])


  $("#republican").html(firstChangeValue);
  $("#democratic").html(secondChangeValue);
  $("#unaffiliated").html(thirdChangeValue);
  $("#black").html(fourthChangeValue);
  $("#white").html(fifthChangeValue);
  $("#other").html(sixthChangeValue);
  $("#income").html(commaSeparateNumber(seventhChangeValue));
}
// Gerrymandering Calculator
function processGScoreObject(data) {
  var gScore = 0

  var repDeviation = Math.abs(data["political-affiliation"]["republican"]-30)

  var demDeviation = Math.abs(data["political-affiliation"]["democratic"]-41)

  var unaDeviation = Math.abs(data["political-affiliation"]["unaffiliated"]-28)

  var totalPoliDeviation = repDeviation + demDeviation + unaDeviation;

  if(totalPoliDeviation < 10){
    // Not Gerrymandered
  }else if(totalPoliDeviation < 30){
    gScore += 1
  }else{
    gScore += 3
  }

  var incomeDeviation = Math.abs(data["income"]- 47,830)
  console.log(incomeDeviation)
  if(incomeDeviation > 30000){
    gScore += 2
  }

  var blackDeviation = Math.abs(data["race"]["black"]- 22)

  var whiteDeviation = Math.abs(data["race"]["white"]- 65)

  var otherDeviation = Math.abs(data["race"]["other"]- 13)

  var totalRaceDeviation = blackDeviation + whiteDeviation + otherDeviation;

  if(totalRaceDeviation < 10){
    // Not Gerrymandered
  }else if(totalRaceDeviation < 30){
    gScore += 1
  }else{
    gScore += 3
  }

 console.log(gScore)

  if (gScore > 7 ) {
    $("head").append(`<meta property="og:image" content="http://s3.amazonaws.com/areyougerrymandered.com/assets/img/very.png">`)
    $("#gScoreImg").attr("src","https://s3.amazonaws.com/areyougerrymandered.com/assets/img/very.png");
  }
  else if (gScore > 4) {
    $("head").append(`<meta property="og:image" content="http://s3.amazonaws.com/areyougerrymandered.com/assets/img/kindof.png">`)
    $("#gScoreImg").attr("src","https://s3.amazonaws.com/areyougerrymandered.com/assets/img/kindof.png");
  }
  else{
    $("head").append(`<meta property="og:image" content="http://s3.amazonaws.com/areyougerrymandered.com/assets/img/not.png">`)
    $("#gScoreImg").attr("src","https://s3.amazonaws.com/areyougerrymandered.com/assets/img/not.png");
  }
}

autocomplete.addListener('place_changed', function() {
  var place = autocomplete.getPlace();
  $("#spinner").show()
  var coordinates = [place.geometry.location.lng(), place.geometry.location.lat()]
  address = place["formatted_address"].split(",");
  ga('send', 'event', "interaction", "place_changed", "address", address);

  var reportSpecification = {
    reportType: {
      name: "gerrymander",
      slug: "gerrymander"
    },
    geoJSON: {
      type: "Feature",
      geometry: {
          coordinates: coordinates,
          radius: 800,
          type: "Point"
      },
      properties: {
        "address" : address
       }
    }
  }

  $.post("https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/dev", JSON.stringify(reportSpecification), (result) => {
    $("#spinner").hide()
    $("#results").show();
    processTableObject(result)
    processGScoreObject(result);

    ga('send','event','report','generated')

  },"json")
})
// var place = autocomplete.getPlace();

// var coordinates = [place.geometry.location.lng(), place.geometry.location.lat()]


function printReport() {
    window.print();
}
