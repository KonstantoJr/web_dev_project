
document.getElementById("description").addEventListener("click", descActivation);

function descActivation() {
    // console.log("ada")
    castCrew.className = "";
    organizer.className = "";
    price.className = "";
    description.className = "active";
    castCrew1.style.display = "None";
    organizer1.style.display = "None";
    price1.style.display = "None";
    description1.style.display = "block";
}
document.getElementById("castCrew").addEventListener("click", castActivation);

function castActivation() {
    organizer.className = "";
    description.className = "";
    price.className = "";
    castCrew.className = "active";
    description1.style.display = "None";
    organizer1.style.display = "None";
    price1.style.display = "None";
    castCrew1.style.display = "block";

}
document.getElementById("organizer").addEventListener("click", orgActivation);

function orgActivation() {
    castCrew.className = "";
    description.className = "";
    price.className = "";
    organizer.className = "active";
    castCrew1.style.display = "None";
    description1.style.display = "None";
    price1.style.display = "None";
    organizer1.style.display = "block";

}

document.getElementById("price").addEventListener("click", priceActivation);

function priceActivation() {
    castCrew.className = "";
    organizer.className = "";
    description.className = "";
    price.className = "active";
    castCrew1.style.display = "None";
    description1.style.display = "None";
    organizer1.style.display = "None";
    price1.style.display = "block";

}








