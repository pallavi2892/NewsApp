var x=""
    $(document).ready(function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        x=vars;
        loadXMLDoc1(vars.button);
        return vars;
    }
    
);

function loadXMLDoc1(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", category[type], true);
  xmlhttp.send();
}


function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table = "";
  var x = xmlDoc.getElementsByTagName("item");
  for(i = 0; i<x.length; i++) {

    table += "<tr><td>" + "<strong>" +
    x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "</strong>" +
    "<br>" 
    var date = x[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
    var subStringDate = date.substring(16,22);
    var time = subStringDate.split(":");
    var hours = time[0] %12;
    var mins = time[1];
    var istHrs = (hours + 10) % 12;
    var istMins = parseInt(mins) + 30;
    if(istMins >= 60) {
      istHrs = istHrs + 1;
      istMins = istMins % 60;
    } 


    var formattedDate = date.substring(0,16) + " " + istHrs + ":" + istMins;
    table += formattedDate+"<br>" +
    x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue + "<br>"+
    "</td> </tr><br>" +"<br>" ;

  
  }

  $("table").html(table);
  // document.write(table);
}

 

// function imagesInXML(xml) {
//   var output = "";
//   var xmlDoc = xml.responseXML;
//    var x = xmlDoc.getElementsByTagName("item");
//   for(i = 0; i<x.length; i++) {
//     if(x.length>5) {
//       output += x[i].children[3].attributes[0];
//     }

// }
// document.write(output);
//}

// function goBack() {
//     window.history.back();
// }


