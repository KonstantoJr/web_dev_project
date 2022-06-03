document.getElementById("admin").addEventListener("click", adminActivation);

function adminActivation() {
    user.className = "";
    admin.className = "active";
    userActions.style.display = "None";
    adminActions.style.display = "block";
}

document.getElementById("user").addEventListener("click", userActivation);

function userActivation() {
    admin.className = "";
    user.className = "active";
    userActions.style.display = "block";
    adminActions.style.display = "None";

}