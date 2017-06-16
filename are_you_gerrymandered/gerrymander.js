

$("#blue-div").hide();

$("#what-is-this").click(function(){
    $("#blue-div").toggle();
});

function printReport() {
    window.print();
}

$("#results").hide();
var input = document.getElementById('input');
var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.addListener('place_changed', function() {
  $("#results").show();
})

// ******


// Percent Change Table

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
$("#income").html(seventhChangeValue);


// Gerrymandering Calculator

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
  gScore += 2
}

var incomeDeviation = Math.abs(data["income"]- 47,830)

if(incomeDeviation > 30000){
  gScore += 1
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
  gScore += 2
}

gScore

if (gScore == 4 || gScore == 5 ) {
  $("#gScoreImg").attr("src","img/very.png");
}
else if (gScore == 2 || gScore == 3 ) {
  $("#gScoreImg").attr("src","img/kindof.png");
}
else if (gScore == 0 || gScore == 1 ) {
  $("#gScoreImg").attr("src","img/not.png");
}
