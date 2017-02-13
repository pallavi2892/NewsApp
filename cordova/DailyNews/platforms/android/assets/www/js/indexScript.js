    function validate() {
        var username = document.getElementById("form-username").value;
        var password = document.getElementById("form-password").value;
        if(username != null && password!=null){
        	window.location="second.html";
        alert('Login successful');
    }

}