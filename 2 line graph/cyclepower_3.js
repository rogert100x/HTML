//cyclepower_3.js

"use strict";  

function calc() {
// setting variables
	const g=9.81;    // gravity
	const K1=0.0053; //friction co-efficient
    const K2=0.324;  //aerodrag old 0.185 new 0.324 from https://www.omnicalculator.com/sports/cycling-wattage	
	
	var drag$=""; var drag=0.00; var drag2=0;
	var m=0;        //mass of bike and rider
	var s=0.00;     //gradient %age
	var Vh=0.00;    //headwind
	var Vr=0.00;    //road speed
	
//info from user
	var m = Number(document.getElementById('Mass_br').value); 
    var Vr= Number(document.getElementById('Road_speed').value)/3.6; //converted to m/s
	var Vh= Number(document.getElementById('headwind').value)/3.6;   //converted to m/s
	var Va=Vr+Vh
	var s= Number(document.getElementById('gradient').value)/100;  //converted %age to decimal

//calculate drag	
	drag=g*m*Vr*(K1+s)+(K2*(Va*Va)*Vr);
//convert drag to a string, reduce decimals to 0 and add text "watts" in html
	drag$= drag.toFixed(0);
    document.getElementById('result').innerHTML =
	"<p><b>Power req. for above </b>"+ drag$+" Watts</p>"+
	"<p><b>Watts per Kg </b>"+(drag/m).toFixed(1)+" Watts/Kg</p>";

// loop to print list of results	
	var power=[];
	var power2=[];
	var a="  @ "+(s*100).toFixed(1)+"% gradient</p>"; //prep var a html
	var steps=[15,20,25,30,35,40,45,50,55,60];
	var i;
	for (i of steps){
		Vr=i/3.6; 
		Va=(Vr+Vh);	
		drag=g*m*Vr*(K1+s)+(K2*(Va*Va)*Vr);// %age grad
		drag2=g*m*Vr*(K1+0)+(K2*(Va*Va)*Vr);//0% grad ref
		power.push(drag.toFixed(0)); //push result into power[]
		console.log(power); //for debugging only F12 in browser
		if (s>0){
			power2.push(drag2.toFixed(0)); // push drag2 in power2[]
		}
		a=a+i.toFixed()+" kph --->  " +drag.toFixed(0)+" watts <br>"//(s*100).toFixed(1)+"% gradient : create a long html string in var a
	}
	document.getElementById('list').innerHTML ="<p>Watts in increments of 5km/h"+a+"<br>";// sow html in div id=List

// code to draw graph	Using ChartJS
// labels along the x-axis - var steps
// For drawing the lines - var power

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: steps,
    datasets: [
      { 
        data: power,
        label: (s*100).toFixed(0)+"% grad",
        borderColor:'rgba(255,0,0,1)',
		backgroundColor:'rgba(255,0,0,0.3)',
        fill:true
      }, 
	  { 
        data: power2,
        label: "0% grad",
        borderColor:'rgba(0,0,255,1)',
		backgroundColor:'rgba(0,0,255,0.5)',
        fill:true
      },
	
    ]
  },options: { 
		title: {
            display: true,
            text: 'ChartJS.     Watts / Kph'
        },
        scales: {
            yAxes: [{
				 scaleLabel: {
						display: true,
						labelString: 'Watts'
						},
				gridLines:{
                        color: "gray",
                        lineWidth:1,
                        zeroLineColor :"black",
                        zeroLineWidth : 2
                    },
                ticks: {
                    beginAtZero: true,
					fontColor:"black",
					fontSize:10,
					fontWeight:1000
                }
            }],
			xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Kph'
						},
                    ticks:{
                        fontColor : "black",
                        fontSize : 10,
                        fontWeight:1000
                    },
                    gridLines:{
                        color: "gray",
                        lineWidth:1,
						zeroLineColor :"black",
						zeroLineWidth : 2,
                        drawBorder: false //??
                    }
                }],
        }
    }
  
});

	return false;
	}

document.getElementById('Calculate').addEventListener('click', calc);
