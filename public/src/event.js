
document.getElementById("description").addEventListener("click",descActivation);
	
function descActivation() {
	console.log("ada")
    castCrew1.className= "";
	organizer1.className= "";
	description1.className ="active";
    castCrew1.style.display= "None";
	organizer1.style.display= "None";
    description1.style.display="block";
}
document.getElementById("castCrew").addEventListener("click",castActivation);

function castActivation() {
	organizer1.className = "";
	description1.className = "";
	castCrew1.className = "active";
    description1.style.display="None";
    organizer1.style.display= "None";
    castCrew1.style.display="block";
	
}
document.getElementById("organizer").addEventListener("click",orgActivation);

function orgActivation() {
    castCrew1.className = "";
	description1.className ="";
	organizer1.className = "active";
    castCrew1.style.display= "None";
    description1.style.display="None";
    organizer1.style.display="block";
	
}

document.getElementById("btnreservation").addEventListener("click",openForm);

function openForm(){
    
}


