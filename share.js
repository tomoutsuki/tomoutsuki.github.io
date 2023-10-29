const share_screen = document.getElementById('share-screen');
share_screen.style.display = "none";

function showShareScreen(e) {
    let coordX = e.layerX - 16;
    let coordY = e.layerY - 90;

    share_screen.classList.add('fadeUp-instant');

    if (share_screen.style.display === "none") {
        share_screen.style.display = "flex";
        share_screen.style.left = coordX + "px";
        share_screen.style.top = coordY + "px";
    } else {
        share_screen.style.display = "none";
    }
}

const share_button = document.getElementsByClassName('share-button');

for (var i = 0; i < share_button.length; i++) {
    console.log("A");
    share_button[i].addEventListener('click', showShareScreen, false);
}