"use strict";

function calc() {
// setting variables
	var a=6378137;
	var c=1;
	var b=1;
	var d=1;
// console.log(a);
//get info from user
	c = Number(document.getElementById('Altitude').value); // convert str to number
	console.log(c);
	b=a+c;
//	console.log(b);
//calculate distance using pyhtagerous	
	d=Math.sqrt((b**2)-(a**2));
	d=d.toFixed(0);
	
	console.log(d);

//Send the result back to Result div
	document.getElementById('result').innerHTML ="Distance to the horizon\n"+d+" meters";
		
	return false;
	}

document.getElementById('Calculate').addEventListener('click', calc);

