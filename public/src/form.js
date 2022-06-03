let cost1= (document.querySelector("#quantity1").value * 1).toFixed(2);


let cost11 = document.querySelector("#normtick");
cost11.innerHTML = cost1 + " €";

let cost2 = (document.querySelector("#quantity2").value * 0.5).toFixed(2);


let cost22 = document.querySelector("#stdtick");
cost22.innerHTML = cost2 + " €";

let cost3 = (document.querySelector("#quantity3").value * 0.5).toFixed(2);


let cost33 = document.querySelector("#famtick");
cost33.innerHTML = cost3 + " €";

let cost4 = (document.querySelector("#quantity4").value * 0.7).toFixed(2);


let cost44 = document.querySelector("#spnmtick");
cost44.innerHTML = cost4 + " €";


let sum_cost = (parseFloat(cost1) + parseFloat(cost2) + parseFloat(cost3) + parseFloat(cost4)).toFixed(2);


let sum_cost1 = document.querySelector("#totalprice");
sum_cost1.innerHTML = sum_cost + " €";
// console.log(sum_cost)


// document.getElementById("btnPrice").addEventListener("click", () => {
//     location.reload(); 


// });

document.getElementsById("quantity1").addEventListener("input", () => {
    location.reload(); 


});

