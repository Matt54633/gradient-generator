// get inputs
const inputs = document.querySelectorAll("input");

let color1 = inputs[0];
let color2 = inputs[1];
let stop1 = inputs[2];
let stop2 = inputs[3];
let angle = inputs[4];

// on any input change get the values and update the background
function updateBackground() {
  let css = `linear-gradient(${angle.value}deg, ${color1.value} ${stop1.value}%, ${color2.value} ${stop2.value}%)`;
  document.body.style.background = css;
}

inputs.forEach((input) => input.addEventListener("input", updateBackground));
angle.addEventListener("change", checkAngle);
stop1.addEventListener("change", checkStop);
stop2.addEventListener("change", checkStop);

// on space bar press, randomize the background, only if not touch device
window.addEventListener("keydown", function (e) {
  if (e.keyCode === 32 && !isTouchDevice()) {
    randomize();
    document.getElementById("footerText").style.display = "none";
  }
});

// on touch that isnt on the main container, randomize the background
window.addEventListener("touchstart", function (e) {
  // randomize if touch is not on .noTouch
  if (e.target.classList.contains("touchRandom")) {
    randomize();
    document.getElementById("footerText").style.display = "none";
  }
});

// if device is shaken, hide the main element, then show it again on release
window.addEventListener("devicemotion", function (e) {
    if (e.acceleration.x > 10 || e.acceleration.y > 10 || e.acceleration.z > 10) {
        document.getElementById("main").style.display = "none";
    }
    setTimeout(function () {
        document.getElementById("main").style.display = "block";
    }, 2500);
});



// on shift, hide the main element, then show it again on release
window.addEventListener("keydown", function (e) {
    if (e.keyCode === 16 && !isTouchDevice()) {
        document.getElementById("main").style.display = "none";
    }
});

window.addEventListener("keyup", function (e) {
    if (e.keyCode === 16 && !isTouchDevice()) {
        document.getElementById("main").style.display = "block";
    }
});

// randomize the background
function randomize() {
  color1.value = getRandomColor();
  color2.value = getRandomColor();
  angle.value = getRandomAngle();
  stop1.value = 0;
  stop2.value = 100;
  updateBackground();
  changeFooterTextColour();
}

// get random color
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// get random angle
function getRandomAngle() {
  return Math.floor(Math.random() * 360);
}

// get random stop
function getRandomStop() {
  return Math.floor(Math.random() * 100);
}

// if angle inputted is greater than 360, set it to 360
function checkAngle() {
  if (angle.value > 360) {
    angle.value = 360;
  }
}

// if stop inputted is greater than 100, set it to 100
function checkStop() {
  if (stop1.value > 100) {
    stop1.value = 100;
  } else if (stop2.value > 100) {
    stop2.value = 100;
  }
}

// check if device is mobile on load and resize
window.addEventListener("load", isTouchDevice);
window.addEventListener("load", randomize);
window.addEventListener("resize", isTouchDevice);

// check if device is touch enabled
function isTouchDevice() {
  return "ontouchstart" in document.documentElement;
}

// if device is touch enabled, show the tap to randomize message
if (isTouchDevice()) {
  document.getElementById("footerText").innerHTML = "Tap to randomise";
} else {
  document.getElementById("footerText").innerHTML =
    "Press spacebar to randomise";
}

// on button with id of css, copy the gradient css to clipboard
document.getElementById("css").addEventListener("click", function () {
  let css = `background: ${document.body.style.background};`;
  navigator.clipboard.writeText(css);

  // change button text to copied
  document.getElementById("css").innerHTML = "Copied!";
  setTimeout(function () {
    document.getElementById("css").innerHTML = "Copy CSS";
  }, 2500);
});

// change footer text colour between black and white depending on how dark the background is
function changeFooterTextColour() {
  let background = document.body.style.background;
  let rgb = background.match(/\d+/g);

  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];

  let brightness = Math.round(
    (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
  );

  if (brightness > 200) {
    document.getElementById("footerText").style.color = "#000";
  } else {
    document.getElementById("footerText").style.color = "#fff";
  }
}

// function to determine text for help menu button
function helpButtonText() {
    if (isTouchDevice()) {
        document.getElementById("helpText1").innerHTML = "Touch background to<br>randomise gradient.";
        document.getElementById("helpText2").innerText = "Shake device to hide menu.";

    } else {
        document.getElementById("helpText1").innerText = "Press spacebar to randomise gradient.";
        document.getElementById("helpText2").innerText = "Press shift to hide menu.";
    }
}

// on page load, check if help menu has been hidden before, if not, show it
window.addEventListener("load", function () {
    if (sessionStorage.getItem("helpMenuHidden") == "true") {
        document.getElementById("help").style.display = "none";
        document.getElementById("inputs").style.display = "grid";
    } else {
        helpButtonText();
        document.getElementById("help").style.display = "flex";
        document.getElementById("inputs").style.display = "none";
    }
});

// on click of helpButton, hide the help div
document.getElementById("helpButton").addEventListener("click", function () {
  document.getElementById("help").style.display = "none";
    document.getElementById("inputs").style.display = "grid";
  sessionStorage.setItem("helpMenuHidden", "true");
});