// Initialize The Variables

let audioElement = new Audio("songs/1.mp3");
let masterPlayBtn = document.getElementById("masterPlay");
let prevPlayBtn = document.getElementById("previous");
let nextPlayBtn = document.getElementById("next");
let progressBar = document.getElementById("progressBar");
let playGif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songIndex = 0;
let songsArray = [
    {songName: "Song no. 1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Song no. 2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Song no. 3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Song no. 4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Song no. 5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Song no. 6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Song no. 7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},

]

// Handle Master Play/Pause Button

masterPlayBtn.addEventListener('click', () => {    
   
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlayBtn.classList.remove("fa-circle-play");
        masterPlayBtn.classList.add("fa-circle-pause");
        playGif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlayBtn.classList.remove("fa-circle-pause");
        masterPlayBtn.classList.add("fa-circle-play");
        playGif.style.opacity = 0;
    }
    
})


// Handle Previous Play Button

prevPlayBtn.addEventListener('click', () => {
    if(songIndex<=0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }    
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songsArray[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    playGif.style.opacity = 1;
    masterPlayBtn.classList.remove("fa-circle-play");
    masterPlayBtn.classList.add("fa-circle-pause");

})


// Handle Next Play Button

document.getElementById("next").addEventListener('click', () => {
    if(songIndex>=6) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songsArray[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    playGif.style.opacity = 1;
    masterPlayBtn.classList.remove("fa-circle-play");
    masterPlayBtn.classList.add("fa-circle-pause");

})


// Handle Progress Bar or Seek Bar
// Return How many '%' is palying and set it on progressBar value

audioElement.addEventListener('timeupdate', () => {    
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

// Progress Bar movement or changing position

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration /100;
})


// List of Audio Files Image and Source Creation
songItem.forEach((element, i) => {    
    element.getElementsByTagName("img")[0].src = songsArray[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songsArray[i].songName;
})


// Play Audio from list and changes the play/pause button in list and masterPlayButton and change the audio name in songName also
// Switching the Play/Pause Button in Song List

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

// Play Audio from Song List

Array.from(document.getElementsByClassName("songItemPlay")).forEach(element => {
    element.addEventListener('click', (e) => {
        
        makeAllPlays();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");

        songIndex = parseInt(e.target.id);
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songsArray[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play();

        playGif.style.opacity = 1;

        masterPlayBtn.classList.remove("fa-circle-play");
        masterPlayBtn.classList.add("fa-circle-pause");

    })
})