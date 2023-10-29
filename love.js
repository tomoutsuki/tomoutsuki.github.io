const xhr = new XMLHttpRequest();
const xhr_submit = new XMLHttpRequest();

const heart_icon = document.getElementById('heart-icon');
const red_heart_icon = document.getElementById('red-heart-icon');
red_heart_icon.style.display = "none";

let heart_number = 0;

function updateHeart() {
    xhr.open("GET", "https://anthonkeyaki.repl.co/?id=0001", true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            heart_number = JSON.parse(xhr.responseText).value.like;
            document.getElementById("heart-number").innerHTML = heart_number;
            console.log(heart_number);
        }
    }
}

updateHeart();

async function toggleHeart(e) {
    if (red_heart_icon.style.display === "none") {
        red_heart_icon.style.display = "flex";
        heart_icon.style.display = "none";
        xhr_submit.open("POST", "https://anthonkeyaki.repl.co/submit/?id=0001");
        xhr_submit.send();
        await sleep(200);
        updateHeart();
    } else {
        red_heart_icon.style.display = "none";
        heart_icon.style.display = "flex";
    }
}

const heart_button = document.getElementsByClassName('heart-button');
let number;
for (var i = 0; i < heart_button.length; i++) {
    heart_button[i].addEventListener('click', toggleHeart, false);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }