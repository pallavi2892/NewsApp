$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
})

function verifying(){
  var button = $.getUrlVars()['button'];
  switch(button){
    case 'temp1': loadXMLDoc1();
        break;
    case 'temp2': loadXMLDoc2();
        break;
    case 'temp3': loadXMLDoc3();
        break;
    case 'temp4': loadXMLDoc4();
      break;
    case 'temp5': loadXMLDoc5();
      break;
    case 'temp6': loadXMLDoc6();
      break;
    case 'temp7': loadXMLDoc7();
      break;
    case 'temp8': loadXMLDoc8();
      break;
    case 'temp9': loadXMLDoc9();
      break;
    default:
        alert("Button id not recognized.");
        break;
  }
}

function loadXMLDoc1(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/all.xml", true);
  xmlhttp.send();
}

function loadXMLDoc2(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/top.xml", true);
  xmlhttp.send();
}

function loadXMLDoc3(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/top/science.xml", true);
  xmlhttp.send();
}

function loadXMLDoc4(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/top/health.xml", true);
  xmlhttp.send();
}

function loadXMLDoc5(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/top/technology.xml", true);
  xmlhttp.send();
}

function loadXMLDoc6(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/top/environment.xml", true);
  xmlhttp.send();
}

function loadXMLDoc7() {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/top/society.xml", true);
  xmlhttp.send();
}

function loadXMLDoc8(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/strange_offbeat.xml", true);
  xmlhttp.send();
}

function loadXMLDoc9(type) {
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
      // imagesInXML(this);
    }
  };
  xmlhttp.open("GET", "https://rss.sciencedaily.com/most_popular.xml", true);
  xmlhttp.send();
}

function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table = "";
  var x = xmlDoc.getElementsByTagName("item");
  for(i = 0; i<x.length; i++) {
    table += "<tr><td>" + "<strong>Title:  </strong>" +
    x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
    "</td> <td><br>" + "<strong>Date:  </strong>" +
    x[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue +
    " <br>" + "<strong>Description:  </strong>" +
    x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
    "</td> <td><br><br>" + 
    // x[i].getElementsByTagName("media")[0].childNodes[0].nodeValue +
    "<hr>";
  }
  document.write(table);
  // document.getElementById("demo").innerHTML = table;
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