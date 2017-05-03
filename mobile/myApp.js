//jQuey can use $ to replace
//there can use pagecreate or pageshow
//pageshow is while open this page and loaded , run
jQuery(document).on("pagecreate","#page1",function(){ //run this when #page1 created
  jQuery("#page6").on("pageshow",function(event){ // run this when #page6 created
    var url= "http://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AV&CaseNo2=1&FileType=1&Lang=C&FolderType=";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        myObj = JSON.parse(this.responseText);
        var htmlText = "<table border='1'><tr><th>景點名稱</th><th>緯度(Px)</th><th>經度(Py)</th></tr>"
        for(i=0;i<myObj.length;i++){
          htmlText +=	"<tr><td>" + myObj[i].Name + "</td><td>" + myObj[1].Px + "</td><td>" + myObj[2].Py + "</td></tr>";
        }
        document.getElementById("demo").innerHTML = htmlText + "</table>";
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  })
});
