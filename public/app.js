// Verify input on Password Creation *****
var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// Toggle Display of About categories
function toggleDisplay(id) {
    let dis = document.getElementById(id);
    if (dis.style.display === "none") {
        dis.style.display = "block";
    } else {
        dis.style.display = "none";
    }
}

// Slide in from the Left Animation
const sliders = document.querySelectorAll(".hidden")

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entries)
        entry.target.classList.toggle("show", entry.isIntersecting)
    })
}, {
    threshold: 1,
});

sliders.forEach(sliders => {
    observer.observe(sliders)
});

// const hiddenElements = document.querySelectorAll('.hidden');
// hiddenElements.forEach((el) => observer.observe(el));

// Fade in from Background
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('fadeshow');
        } else {
            entry.target.classList.remove('fadeshow');
        }
        
    });
});

const hiddenFadeElements = document.querySelectorAll('.fadehide');
hiddenFadeElements.forEach((el) => fadeObserver.observe(el));

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
    document.getElementById("message").style.display = "block";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
// Validate lowercase letters
var lowerCaseLetters = /[a-z]/g;
if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
} else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

// Validate capital letters
var upperCaseLetters = /[A-Z]/g;
if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
} else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
}

// Validate numbers
var numbers = /[0-9]/g;
if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
} else {
    number.classList.remove("valid");
    number.classList.add("invalid");
}

// Validate length
if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
} else {
    length.classList.remove("valid");
    length.classList.add("invalid");
}
}


