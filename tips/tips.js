"use strict"

function calc() {
        var x = Number(document.getElementById('bill').value);
        var y = Number(document.getElementById('tip').value);
        var z = Number(document.getElementById('split').value);
        x=x*(1+y/100);
        console.log(x);
        console.log(z);
        
        //send result back to tips.html
        document.getElementById("result").innerHTML = "<b>Bill per person:- R" +(x/z).toFixed(2) + "</b><br>";

        return false;
    }

document.getElementById('Calculate').addEventListener('click', calc);
