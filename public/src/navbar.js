document.getElementById("home").addEventListener("click", homeActivation);

function homeActivation() {
    console.log(xaxaxa)
    home.className ="active";
    events.className = "";
    about.className = "";
}

document.getElementById("events").addEventListener("click", eventsActivation);

function eventsActivation() {
    console.log(xaxaxa)
    home.className = "";
    about.className = "";
    events.className = "active";
}

document.getElementById("about").addEventListener("click", aboutActivation);

function aboutActivation() {
    console.log(xaxaxa)
    home.className = "";
    events.className = "";
    about.className = "active";

}