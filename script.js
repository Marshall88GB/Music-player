const image = document.querySelector('img');
const title =document.getElementById('title');
const artist = document.getElementById('artist');
const music =document.querySelector ('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl= document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Check Play
let isPlaying = false;

// Play
function playSong(){
     isPlaying = true;
     playBtn.classList.replace('fa-play', 'fa-pause');
     playBtn.setAttribute('title', 'Pause')
    music.play();
}
// Pause
function pauseSong(){
     isPlaying = false;
     playBtn.classList.replace('fa-pause', 'fa-play');
     playBtn.setAttribute('title', 'Play')
    music.pause();
}

// Play - Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong () : playSong()));

// Update Dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artistName;
    music.src = `music/${song.songName}.mp3`;
    image.src = `img/${song.pictureName}.jpg`;
}


// Current Song
let songIndex = 0;
// Prev Song
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = song.length -1;
    }
    loadSong (song[songIndex]);
    playSong()
}

// Next Song
function nextSong(){
    songIndex++;
    if (songIndex > song.length -1){
        songIndex=0;
    }
    loadSong (song[songIndex]);
    playSong()
    
}

// On Load 

loadSong (song[songIndex]);

// Update Progres Bar
function updateProgressBar (e){
    if (isPlaying) {
        const{duration, currentTime}= e.srcElement;
        // Update progress bar
        const progressParcent = (currentTime / duration)*100;
        progress.style.width=`${progressParcent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }

// NaN
if(durationSeconds){durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;}

   // Calculate display for current
   const currentMinutes = Math.floor(currentTime/60);
   let currentSeconds = Math.floor(currentTime%60);
   if (currentSeconds < 10){
       currentSeconds = `0${currentSeconds}`
   }
   currentTimeEl.textContent =`${currentMinutes}: ${currentSeconds}`;
    }
}
// Progress Bar
function setProgressBar (e){
const width = this.clientWidth;
const clickX = e.offsetX;
const {duration}= music;
music.currentTime = (clickX / width) * duration;
}
// Event Listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener ('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
