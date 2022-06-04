function eventsActivation() {
    home.className = "";
    events.className = "active";
}


function aboutActivation() {
    home.className = "";
    about.className = "active";
}


window.addEventListener('load', (event) => {
    const url = window.location.href.split('/')
    const page = url[url.length - 1]
    console.log(page)
    if (page === "about") {
        aboutActivation()
    }
    else if (page === "events") {
        eventsActivation()
    }
    else if (page === "controlPanel" || page === "eventForm") {
        home.className = "";
        control.className = "active";
    }
    else if (page === 'login') {
        home.className = "";
        signin.className = "active";
    }
});
