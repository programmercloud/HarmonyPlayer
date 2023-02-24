// Creates a track item for the playlist with given index, name and duration
function createTrackItem(index, name, duration) {
  var trackItem = document.createElement("div"); // Create a div element for track item
  trackItem.setAttribute("class", "playlist-track-ctn"); // Set class attribute to the track item
  trackItem.setAttribute("id", "ptc-" + index); // Set ID attribute to the track item
  trackItem.setAttribute("data-index", index); // Set data-index attribute to the track item
  document.querySelector(".playlist-ctn").appendChild(trackItem); // Append the track item to the playlist container

  var playBtnItem = document.createElement("div"); // Create a div element for play button item
  playBtnItem.setAttribute("class", "playlist-btn-play"); // Set class attribute to the play button item
  playBtnItem.setAttribute("id", "pbp-" + index); // Set ID attribute to the play button item
  document.querySelector("#ptc-" + index).appendChild(playBtnItem); // Append the play button item to the track item

  var btnImg = document.createElement("i"); // Create an icon element for play button
  btnImg.setAttribute("class", "fas fa-play"); // Set class attribute to the icon
  btnImg.setAttribute("height", "40"); // Set height attribute to the icon
  btnImg.setAttribute("width", "40"); // Set width attribute to the icon
  btnImg.setAttribute("id", "p-img-" + index); // Set ID attribute to the icon
  document.querySelector("#pbp-" + index).appendChild(btnImg); // Append the icon to the play button item

  var trackInfoItem = document.createElement("div"); // Create a div element for track information
  trackInfoItem.setAttribute("class", "playlist-info-track"); // Set class attribute to the track information
  trackInfoItem.innerHTML = name; // Set the inner HTML of the track information to the track name
  document.querySelector("#ptc-" + index).appendChild(trackInfoItem); // Append the track information to the track item

  var trackDurationItem = document.createElement("div"); // Create a div element for track duration
  trackDurationItem.setAttribute("class", "playlist-duration"); // Set class attribute to the track duration
  trackDurationItem.innerHTML = duration; // Set the inner HTML of the track duration to the track duration value
  document.querySelector("#ptc-" + index).appendChild(trackDurationItem); // Append the track duration to the track item
}

// Define an array of objects representing audio tracks
var listAudio = [
  {
    name: "Artist 1 - audio 1",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: "08:47",
  },
  {
    name: "Artist 2 - audio 2",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "05:53",
  },
  {
    name: "Artist 3 - audio 3",
    file: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3",
    duration: "00:27",
  },
];
// The following code sets up the audio player and playlist:

// Loop through the audio tracks and create a playlist item for each one
for (var i = 0; i < listAudio.length; i++) {
  createTrackItem(i, listAudio[i].name, listAudio[i].duration);
}

// Set the index of the current audio track to 0
var indexAudio = 0;

// Load a new audio track and update the UI to reflect the change
function loadNewTrack(index) {
  var player = document.querySelector("#source-audio");
  player.src = listAudio[index].file;
  document.querySelector(".title").innerHTML = listAudio[index].name;
  // Get the audio element and load the new track
  this.currentAudio = document.getElementById("myAudio");
  this.currentAudio.load();
  // Toggle the play/pause button and update the playlist style
  this.toggleAudio();
  this.updateStylePlaylist(this.indexAudio, index);
  // Set the index of the current audio track to the new index
  this.indexAudio = index;
}

// Add click event listeners to all playlist items
var playListItems = document.querySelectorAll(".playlist-track-ctn");
for (let i = 0; i < playListItems.length; i++) {
  playListItems[i].addEventListener("click", getClickedElement.bind(this));
}

// Get the clicked playlist item and load the corresponding audio track
function getClickedElement(event) {
  for (let i = 0; i < playListItems.length; i++) {
    if (playListItems[i] == event.target) {
      var clickedIndex = event.target.getAttribute("data-index");
      // If the clicked item is already playing, toggle the play/pause button
      if (clickedIndex == this.indexAudio) {
        this.toggleAudio();
      } else {
        // Load the new track
        loadNewTrack(clickedIndex);
      }
    }
  }
}

// Load the first audio track and update the UI to reflect the change
document.querySelector("#source-audio").src = listAudio[indexAudio].file;
document.querySelector(".title").innerHTML = listAudio[indexAudio].name;
var currentAudio = document.getElementById("myAudio");
currentAudio.load();

// Update the duration displayed in the UI once the metadata has loaded
currentAudio.onloadedmetadata = function () {
  document.getElementsByClassName("duration")[0].innerHTML = this.getMinutes(
    this.currentAudio.duration
  );
}.bind(this);

// Set up the play/pause button and playlist item styles
var interval1;
function toggleAudio() {
  if (this.currentAudio.paused) {
    // If the audio is paused, start playing it and update the UI
    document.querySelector("#icon-play").style.display = "none";
    document.querySelector("#icon-pause").style.display = "block";
    document
      .querySelector("#ptc-" + this.indexAudio)
      .classList.add("active-track");
    this.playToPause(this.indexAudio);
    this.currentAudio.play();
  } else {
    // If the audio is playing, pause it and update the UI
    document.querySelector("#icon-play").style.display = "block";
    document.querySelector("#icon-pause").style.display = "none";
    this.pauseToPlay(this.indexAudio);
    this.currentAudio.pause();
  }
}

// Pause the audio and clear the interval used for the progress bar
function pauseAudio() {
  this.currentAudio.pause();
  clearInterval(interval1);
}
// Get the timer and progress bar elements
var timer = document.getElementsByClassName("timer")[0];
var barProgress = document.getElementById("myBar");

// Initialize width to 0
var width = 0;

// Update the timer and progress bar while the audio is playing
function onTimeUpdate() {
  var t = this.currentAudio.currentTime;
  timer.innerHTML = this.getMinutes(t);
  this.setBarProgress();

  // If audio has ended, show the play icon and load the next track if available
  if (this.currentAudio.ended) {
    document.querySelector("#icon-play").style.display = "block";
    document.querySelector("#icon-pause").style.display = "none";
    this.pauseToPlay(this.indexAudio);
    if (this.indexAudio < listAudio.length - 1) {
      var index = parseInt(this.indexAudio) + 1;
      this.loadNewTrack(index);
    }
  }
}

// Set the progress bar width based on the current time of the audio
function setBarProgress() {
  var progress =
    (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
  document.getElementById("myBar").style.width = progress + "%";
}

// Get the minutes from a given time in seconds
function getMinutes(t) {
  var min = parseInt(parseInt(t) / 60);
  var sec = parseInt(t % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return min + ":" + sec;
}

// Seek the audio to a specific time when clicking on the progress bar
var progressbar = document.querySelector("#myProgress");
progressbar.addEventListener("click", seek.bind(this));

function seek(event) {
  var percent = event.offsetX / progressbar.offsetWidth;
  this.currentAudio.currentTime = percent * this.currentAudio.duration;
  barProgress.style.width = percent * 100 + "%";
}

// Fast forward or rewind the audio by 5 seconds
function forward() {
  this.currentAudio.currentTime = this.currentAudio.currentTime + 5;
  this.setBarProgress();
}

function rewind() {
  this.currentAudio.currentTime = this.currentAudio.currentTime - 5;
  this.setBarProgress();
}

// Load and play the next or previous track in the playlist
function next() {
  if (this.indexAudio < listAudio.length - 1) {
    var oldIndex = this.indexAudio;
    this.indexAudio++;
    updateStylePlaylist(oldIndex, this.indexAudio);
    this.loadNewTrack(this.indexAudio);
  }
}
// Function to move to the previous audio track
function previous() {
  // Check if the current audio track is not the first track in the list
  if (this.indexAudio > 0) {
    var oldIndex = this.indexAudio;
    // Decrement the index to move to the previous track
    this.indexAudio--;
    // Update the styling of the playlist to indicate the active track
    updateStylePlaylist(oldIndex, this.indexAudio);
    // Load the new track
    this.loadNewTrack(this.indexAudio);
  }
}

// Function to update the styling of the playlist to indicate the active track
function updateStylePlaylist(oldIndex, newIndex) {
  // Remove the active-track class from the previous track
  document.querySelector("#ptc-" + oldIndex).classList.remove("active-track");
  // Change the play button to pause button of the previous track
  this.pauseToPlay(oldIndex);
  // Add the active-track class to the new track
  document.querySelector("#ptc-" + newIndex).classList.add("active-track");
  // Change the pause button to play button of the new track
  this.playToPause(newIndex);
}

// Function to change the play button to pause button
function playToPause(index) {
  var ele = document.querySelector("#p-img-" + index);
  ele.classList.remove("fa-play");
  ele.classList.add("fa-pause");
}

// Function to change the pause button to play button
function pauseToPlay(index) {
  var ele = document.querySelector("#p-img-" + index);
  ele.classList.remove("fa-pause");
  ele.classList.add("fa-play");
}

// Function to toggle between mute and unmute
function toggleMute() {
  // Get the mute button and the volume icons
  var btnMute = document.querySelector("#toggleMute");
  var volUp = document.querySelector("#icon-vol-up");
  var volMute = document.querySelector("#icon-vol-mute");
  // Check if the audio is currently muted
  if (this.currentAudio.muted == false) {
    // Mute the audio and change the volume icons accordingly
    this.currentAudio.muted = true;
    volUp.style.display = "none";
    volMute.style.display = "block";
  } else {
    // Unmute the audio and change the volume icons accordingly
    this.currentAudio.muted = false;
    volMute.style.display = "none";
    volUp.style.display = "block";
  }
}
