var i;
var butn ="";
butn+='<div align="center"> <div> <form action="result.html" method="get">';
$(document).ready (
	function makeButtons() {
		for(i in category) {
			//butn += ' <a href="result.html?button='+i+'><button type ="submit" name="button" class="btn btn-primary btn-md" value='+i+' onclick="">' + i+'</button></a>';
			butn += '  <button type ="submit" name="button" class="button" value='+i+ '>'+i+'</button>';
		}/*<a href="result.html?button='+i+'></a>*/
		butn+='</div></div>';
		$("#display").html(butn);
	});

// function call() {
// 	window.location.href ="result.html?button="
// }