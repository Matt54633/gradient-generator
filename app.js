// get inputs
const inputs = document.querySelectorAll('input');

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

inputs.forEach(input => input.addEventListener('input', updateBackground));
angle.addEventListener('change', checkAngle);
stop1.addEventListener('change', checkStop);
stop2.addEventListener('change', checkStop);

window.addEventListener('load', updateBackground);

// on space bar press, randomize the background
window.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {
        randomize();
        document.getElementById('footerText').style.display = 'none';
    }
}
);

// on touch that isnt on the main container, randomize the background
window.addEventListener('touchstart', function (e) {
    // randomize if touch is not on .noTouch
    if (e.target.classList.contains('touchRandom')) {
        randomize();
        document.getElementById('footerText').style.display = 'none';
    }
}
);

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
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
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
window.addEventListener('load', isTouchDevice);
window.addEventListener('load', randomize);
window.addEventListener('resize', isTouchDevice);

// check if device is touch enabled
function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

// if device is touch enabled, show the tap to randomize message
if (isTouchDevice()) {
    document.getElementById('footerText').innerHTML = 'Tap to randomise';
} else {
    document.getElementById('footerText').innerHTML = 'Press spacebar to randomise';
}

// on button with id of css, copy the gradient css to clipboard
document.getElementById('css').addEventListener('click', function () {
    let css = `background: ${document.body.style.background};`;
    copyToClipboard(css);

    // change button text to copied
    document.getElementById('css').innerHTML = 'Copied!';
    setTimeout(function () {
        document.getElementById('css').innerHTML = 'Copy CSS';
    } , 2500);
}
);

// copy to clipboard
function copyToClipboard(text) {
    let dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}

// change footer text colour between black and white depending on how dark the background is
function changeFooterTextColour() {
    let background = document.body.style.background;
    let rgb = background.match(/\d+/g);

    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    let brightness = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) / 1000);

    if (brightness > 200) {
        document.getElementById('footerText').style.color = '#000';
    } else {
        document.getElementById('footerText').style.color = '#fff';
    }
}