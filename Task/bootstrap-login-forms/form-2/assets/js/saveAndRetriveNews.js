// window.onload = function() {
// var allEntries = [];
//   // Check for LocalStorage support.
//   if (localStorage) {

//     // Add an event listener for form submissions
//     document.getElementById('localStorageTest').addEventListener('submit', function() {
// var names = [];
 
// names[0] = document.getElementById('news').value;
// names[1] = document.getElementById('description').value;
// names[2] = document.getElementById('reporter').value;
// localStorage.setItem("names", JSON.stringify(names));


// var storedNames = JSON.parse(localStorage.getItem("names"));

//     allEntries.push(storedNames);
//     localStorage.setItem("allEntries", JSON.stringify(allEntries));

// ;


     
//     });

//   }

// }
 // function car(temp){
 //     this.brand=temp[0];
 //     this.color=temp[1];
 //     this.year=temp[2];
 // }

 // var temp = ['Skoda', 'Red', '2012'];
 // car = new car(temp);

 // localStorage.setItem('car',JSON.stringify(car)); 
 // car = localStorage.getItem('car');
 // car = JSON.parse(car);


window.onload = function() {
  if (localStorage) {

    // Add an event listener for form submissions
    document.getElementById('localStorageTest').addEventListener('submit', function() {
      var names = [];
      function storeNews(names){
          names[0] = document.getElementById('news').value;
          names[1] = document.getElementById('description').value;
          names[2] = document.getElementById('reporter').value;
          this.news=names[0];
          this.description=names[1];
          this.reporter=names[2];

      }

 
      storeNews = new storeNews(names);
      var output = JSON.stringify(storeNews);
      localStorage.setItem('storeNews', output); 
 //car = localStorage.getItem('car');
      storeNews = JSON.parse(storeNews);
 });
}
}


//previous code below in single key value pair 
      
// window.onload = function() {

//   // Check for LocalStorage support.
//   if (localStorage) {

//     // Add an event listener for form submissions
//     document.getElementById('localStorageTest').addEventListener('submit', function() {
//       // Get the value of the name field.

//       var news = document.getElementById('news').value;
//       var description = document.getElementById('description').value;
//       var reporter = document.getElementById('reporter').value;

//       // Save the name in localStorage.
//       localStorage.setItem('news', news);
//       localStorage.setItem('description', description);
//       localStorage.setItem('reporter', reporter);

    
     
//     });

//   }

// }



