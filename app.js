const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const speakerBtn = document.querySelector('#speaker');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const volumeBar = document.querySelector('#volume-bar');
//Song titles
const songs = ['chillMusic1', 'chillMusic2', 'chillMusic3'];
//Keep track of songs
let songIndex = 2;
//Initially load song info DOM
loadSong(songs[songIndex]);
//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex === songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}
// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})
// Change Song Events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// Keeps track of duration of the song
audio.addEventListener('timeupdate', updateProgress);
// Sets progress of the song
progressContainer.addEventListener('click', setProgress);
// Plays next song when one song ends.
audio.addEventListener('ended', nextSong);

// Volume Slider
volumeBar.addEventListener('input', () => {
    // console.log(volumeBar.value);
    audio.volume = volumeBar.value / 20;
    if (volumeBar.value == 0) {
        speakerBtn.querySelector('i.fas').classList.remove('fa-volume-up');
        speakerBtn.querySelector('i.fas').classList.add('fa-volume-mute');
    }
    else {
        speakerBtn.querySelector('i.fas').classList.remove('fa-volume-mute');
        speakerBtn.querySelector('i.fas').classList.add('fa-volume-up');
    }
})
let initialVolume;
speakerBtn.addEventListener('click', () => {
    if (speakerBtn.querySelector('i.fas').classList.contains('fa-volume-up')) {
        initialVolume = volumeBar.value;
        speakerBtn.querySelector('i.fas').classList.remove('fa-volume-up');
        speakerBtn.querySelector('i.fas').classList.add('fa-volume-mute');
        volumeBar.value = 0;
        audio.volume = 0;
    }
    else {
        speakerBtn.querySelector('i.fas').classList.remove('fa-volume-mute');
        speakerBtn.querySelector('i.fas').classList.add('fa-volume-up');
        volumeBar.value = initialVolume;
        audio.volume = volumeBar.value / 20;
    }
})