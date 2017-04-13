$(".address").html(data["address"]);
if(data.type == "polygon"){
  $("#point").hide();
}else{
  $("#radius").html(data["radius"]);
  $("#polygon").hide()
}

document.getElementById("total-population").innerHTML = Math.floor(data["general_demographic"]["population"]["total"]);

document.getElementById("median-household-income").innerHTML = data["general_demographic"]["median_income"];

document.getElementById("number-of-homes").innerHTML = Math.floor(data["general_demographic"]["housing"]["numberOfHouseholds"]);


document.getElementById("median-home-value").innerHTML = data["general_demographic"]["housing"]["median"];


c3.generate({
  bindto: '#chart1',
    data: {
      json: [data["general_demographic"]["race"]],
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

c3.generate({
  bindto: '#chart2',
    data: {
      json: [data["general_demographic"]["latino"]],
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

c3.generate({
  bindto: '#chart3',
    data: {
      json: [data["general_demographic"]["population"]],
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

c3.generate({
  bindto: '#chart4',
    data: {
      json: [data["party_counts"]],
       keys: {
        value: ['UNA', 'DEM', 'REP', "LIB"]
      },
      type: 'pie',
      },
      color: {
      pattern: ['#F16224', '#27668D',  '#58B5B4', '#C94292']
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

c3.generate({
  bindto: '#chart5',
    data: {
      json: [data["general_demographic"]["education"]],
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
