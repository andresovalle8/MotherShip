// JavaScript para manipular el reproductor de video

const videoContainer = document.querySelector(".video-container");
const videoPlayer = document.getElementById("videoPlayer");
const controls = document.querySelector(".controls");
const volumeControl = document.getElementById("volume");

let controlsVisible = false;

function toggleControls() {
    controls.style.opacity = controlsVisible ? "0" : "1";
    controlsVisible = !controlsVisible;
}

videoContainer.addEventListener("mouseover", () => {
    toggleControls();
});

videoContainer.addEventListener("mouseout", () => {
    if (!videoPlayer.paused) {
        toggleControls();
    }
});

function playPause() {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

function setVolume() {
    videoPlayer.volume = volumeControl.value / 100;
}

function changeVideo(newVideoId) {
    videoPlayer.src = `https://www.youtube.com/embed/${newVideoId}`;
    videoPlayer.play();
}
