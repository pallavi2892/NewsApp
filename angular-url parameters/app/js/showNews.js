window.onload = function() {
	
	if (typeof(Storage) !== "undefined") {
var l = localStorage.length;
  	for(var i=0; i<l; i++ ) {
  	var o = localStorage.getItem(localStorage.key(i));
  	storeNews = JSON.parse(o);

  	document.write("<strong>News: </strong>"+storeNews.news+"<br>");
  	document.write("<strong>Date: </strong>"+storeNews.date+"<br>");
  	document.write("<strong>Reporter: </strong>"+storeNews.reporter+"<br>");
  	document.write("<strong>Description: </strong>"+storeNews.description+"<hr>");

  	}

//document.write(l);


}
}

 
     