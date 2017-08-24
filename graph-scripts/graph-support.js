function changeData(){
  var chart = document.getElementById("pieChart");
  chart.setData([[50],[50]],0);
}

function loadData(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      retrieveData(this);
    }
  };
  xhttp.open("GET","power_data.xml",true);
  xhttp.send();
}
function retrieveData(xml){
  var i;
  var xmlDoc = xml.responseXML;
  var xmlData = xmlDoc.getElementsByTagName("SOURCE");
  var newChartData = [];
  var chart = document.getElementById("pieChart");
  for(i=0;i<xmlData.length;i++){
    newChartData[i] = xmlData[i].getElementsByTagName("CURRENT")[0].childNodes[0].nodeValue
  }
  chart.setData(newChartData,0);
}
