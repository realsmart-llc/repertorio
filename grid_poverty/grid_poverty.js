console.log(data)

$("app-map").hide();

$(".address").html(data["address"]);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

var povertyRate = Math.round((data["poverty"]['Total Families Below Poverty Line'] / data["poverty"]['Total Families']  * 10000))/100
console.log(povertyRate)
document.getElementById("povertyRate").innerHTML = povertyRate;


c3.generate({
  bindto: '#chart1',
    size: {
      height: 220
    },
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

c3.generate({
  bindto: '#chart2',
    size: {
      height: 220
    },
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

c3.generate({
  bindto: '#chart3',
    size: {
      height: 200
    },
    data: {
      json: [data["poverty"]],
       keys: {
        value: ['Families Below Poverty Line Without Children 5-17', 'Families Below Poverty Line With Children 5-17' ]
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

c3.generate({
  bindto: '#chart4',
    size: {
      height: 180
    },
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
