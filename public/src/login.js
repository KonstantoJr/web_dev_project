var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}

function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";
}

const logbtn = document.querySelector("#logexh");
const regbtn = document.querySelector("#regexh");

logbtn.addEventListener("click", login);
regbtn.addEventListener("click", register);


var submitBtn = document.querySelector("#register .submit-btn");
submitBtn.addEventListener("click", function () {
    console.log('clicked');

    var username = document.querySelector("#register #username").value;
    var email = document.querySelector("#register #email").value;
    var password = document.querySelector("#register #password").value;

})



// members = [];