window.onload = function() {
	
	if (typeof(Storage) !== "undefined") {
    // Retrieve
//     var allEntries = [];
//      allEntries.push(storedNames);
 
   
//     localStorage.setItem("allEntries", JSON.stringify(allEntries));

// //this is for displaying on webpage
// for (var i = storedNames.length; i <3; i++) {
// document.write(localStorage.getItem("allEntries"));
// }
  		
   document.write(localStorage.getItem("storeNews"));
  // document.body.innerHTML = newsArticle;
}
}

 
     