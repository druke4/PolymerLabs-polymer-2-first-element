var colors = Highcharts.getOptions().colors,
    categories = ['Accelerometer', 'GPS', 'Micro', 'Display'],
    data = [{
        y: 56.33,
        color: colors[0]
    }, {
        y: 10.38,
        color: colors[1]
    }, {
        y: 24.03,
        color: colors[2]
    }, {
        y: 4.77,
        color: colors[3]
    }],
    powerData = [],
    i,
    j,
    dataLen = data.length,
    drillDataLen,
    brightness;


// Build the data arrays
for (i = 0; i < dataLen; i += 1) {

    // add browser data
    powerData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
    });
  }

var chart = Highcharts.chart({
    chart: {
        renderTo: container,
        height: 400,
        type: 'pie'
    },
    title: {
        text: 'Power Consumption by source'
    },
    tooltip: {
        valueSuffix: '%'
    },
    series: [{
        name: 'Sources',
        data: powerData,
        size: '60%',
        dataLabels: {
            formatter: function () {
                return this.y > 5 ? this.point.name : null;
            },
            color: '#ffffff',
            distance: -30
        }
    }],
});

function changeData(){
  var chart = document.getElementById("pieChart");
  chart.setData([[50],[50]],0);
}

function loadData(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var myObj = JSON.parse(this.responseText);
      setChartData(myObj);
    }
  };
  xhttp.open("GET","power_data.json",true);
  xhttp.send();
}
function setChartData(jsonObj){
  var i;
  var newChartData = [];
  for(i=0;i<jsonObj.Power_Source.length;i++){
    newChartData[i] = parseInt(jsonObj.Power_Source[i].Power);
  }
  chart.series[0].setData(newChartData);
}
