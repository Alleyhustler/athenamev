const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const volumeControl = document.getElementById("volume");
const trackTitle = document.getElementById("trackTitle");

// Playlist Array
const playlist = [
    { title: "SOLANA GODDESS", src: "https://beelzebabe.neocities.org/Audio/%E2%98%86BEEZLEBABE%E2%98%86%20-%20Evil%20B!tchez%20From%20Outerspace.mp3" },
    { title: "Impending Doom", src: "https://beelzebabe.neocities.org/Audio/VOIDLUX%20-%20Impending%20Doom%20(Stage%201%20psychosis)%202023-04-01%2008_58.mp3" },
    { title: "M!ndfreak", src: "https://beelzebabe.neocities.org/Audio/Voidlux%20-%20M!nDFREAK%202023-03-02%2007_13.mp3" }
];

let currentTrack = 0;

// Load initial track
function loadTrack(index) {
    audio.src = playlist[index].src;
    trackTitle.textContent = playlist[index].title;
    audio.load();
}

// Play or Pause Music
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "■";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }
});

// Skip to Previous Track
prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playPauseBtn.textContent = "■";
});

// Skip to Next Track
nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playPauseBtn.textContent = "■";
});

// Update Volume
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// Auto-play next track when current track ends
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// Load first track on page load
loadTrack(currentTrack);