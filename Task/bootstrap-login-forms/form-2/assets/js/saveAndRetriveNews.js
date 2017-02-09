
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

      storeNews = JSON.parse(storeNews);
 });
}
}





