
// window.onload = function() {
//   if (localStorage) {

//     // Add an event listener for form submissions
//     document.getElementById('localStorageTest').addEventListener('submit', function() {
//       var names = [];

//       function storeNews(names){
//           names[0] = document.getElementById('news').value;
//           names[1] = document.getElementById('date').value;
//           names[2] = document.getElementById('reporter').value;
//           names[3] = document.getElementById('description').value;
          
//           this.news=names[0];
//           this.date=names[1];
//           this.reporter=names[2];
//           this.description=names[3]; 

//       }

 
//       storeNews = new storeNews(names);
//       var output = JSON.stringify(storeNews);
//       localStorage.setItem('storeNews', output); 

//       storeNews = JSON.parse(storeNews);
//  });
// }
// }



window.onload = function() {
  if (localStorage) {

    // Add an event listener for form submissions
    document.getElementById('localStorageTest').addEventListener('submit', function() {
      var names = [];

      function storeNews(names){
          names[0] = document.getElementById('news').value;
          names[1] = document.getElementById('date').value;
          names[2] = document.getElementById('reporter').value;
          names[3] = document.getElementById('description').value;
          
          this.news=names[0];
          this.date=names[1];
          this.reporter=names[2];
          this.description=names[3]; 

      }



      storeNews = new storeNews(names);
      var output = JSON.stringify(storeNews);
    var result = [];
      result = localStorage.setItem('storeNews', output); 

     storeNews = JSON.parse(storeNews);

  
      localStorage.getItem("storeNews");

     var result2 = [];
     result2 = result2 + result;
    
 });
}
}




//  var myServo = servo("news,date,reporter,description");

//   var servos = [];
// for (var i = 0; i < 70; ++i) {
//     servos.push(servo("news,date,reporter,description" + i));
// }
      
// console.log(servos[i].toString());

//       storeNews = new storeNews(servos);
//       var output = JSON.stringify(storeNews);
//       localStorage.setItem('storeNews', output); 

//       storeNews = JSON.parse(storeNews);

//var mycars = new Array();
// mycars[0] = "Saab";
// mycars[1] = "Volvo";
// mycars[2] = "BMW";

// localStorage["mycars"] = JSON.stringify(mycars); 






// window.onload = function() {
//   if (localStorage) {

// document.getElementById('localStorageTest').addEventListener('submit', function() {
// var n,d,r,dd;

//           n = document.getElementById('news').value;
//           d = document.getElementById('date').value;
//           r = document.getElementById('reporter').value;
//           dd = document.getElementById('description').value;
          
//           // this.news=names[0];
//           // this.date=names[1];
//           // this.reporter=names[2];
//           // this.description=names[3]; 

//           this.n = n;
//           this.d=d;
//           this.r=r;
//           this.dd = dd;

// var allEntries = [];
// var rows = [{
//     news: n,
//     date: d,
//     reporter: r,
//     description: dd
//   }
//   // {
//   //     news: names[0],
//   //   date: names[1],
//   //   reporter: names[2],
//   //   description: names[3]

//   // }

// ];
// var data = Array();
// for(var i = 0; i < rows.length; i++)
// {
//   data.push(rows[i].value);
// }

// //allEntries.push(rows);

// localStorage["data"] = JSON.stringify(data); 

// } );
// }
// }








//   

//     // Add an event listener for form submissions
//     document.getElementById('localStorageTest').addEventListener('submit', function() {
//      // var names = [];
     
// //       var servos = [
// //     servo("news,date,reporter,description"),
// //     servo("news,date,reporter,description"),
// //     servo("news,date,reporter,description")
// // ];


//       // function storeNews(names){
//       //     names[0] = document.getElementById('news').value;
//       //     names[1] = document.getElementById('date').value;
//       //     names[2] = document.getElementById('reporter').value;
//       //     names[3] = document.getElementById('description').value;
          
//       //     this.news=names[0];
//       //     this.date=names[1];
//       //     this.reporter=names[2];
//       //     this.description=names[3]; 

//       // }

 

//  });
// }
// }




