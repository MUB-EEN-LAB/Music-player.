
const songs = [
  {
    title: "Dil Kare – Atif Aslam",
    url: "https://soundcloud.com/latest-bollywood-songs/dil-kare-ho-mann-jahaan-atif-aslam",
    duration: 220
  },
  {
    title: "Jaan Oh Baby",
    url: "https://soundcloud.com/latest-bollywood-songs/jaan-oh-baby-full-song-with-masti-unlimited",
    duration: 210
  },
  {
    title: "Thham Sa Gaya",
    url: "https://soundcloud.com/best-hindi-songs-1/thham-sa-gaya-full-audio-song-mumbai-delhi-mumbai-angaraag-papon-mahanta-sawan-dutta",
    duration: 200
  },
  {
    title: "Arijit Singh Mashup 2014 – DJ",
    url: "https://soundcloud.com/black_earth/arijit-singh-mashup-2014-dj",
    duration: 360
  },
  {
    title: "Maine Khud Ko – Ragini MMS",
    url: "https://soundcloud.com/black_earth/maine-khud-ko-full-song-ragini",
    duration: 250
  },
  {
    title: "I’ll Be Waiting – Arjun feat. Arijit Singh",
    url: "https://soundcloud.com/black_earth/ill-be-waiting-kabhi-jo-baadal-barse-arjun-featarijit-singh",
    duration: 230
  }
];

let currentSong = 0;
let autoPlayTimeout = null;

const songTitle = document.getElementById("song-title");
const playerContainer = document.getElementById("soundcloud-player-container");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  clearTimeout(autoPlayTimeout);

  const song = songs[index];
  songTitle.textContent = song.title;

  const iframe = document.createElement("iframe");
  iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(song.url)}&auto_play=true&buying=false&liking=false&download=false&sharing=false&show_comments=false&show_playcount=false&show_user=false`;
  iframe.allow = "autoplay";
  iframe.onload = () => {
    // ⏱️ Start next song after song.duration seconds + 3 sec buffer
    autoPlayTimeout = setTimeout(() => {
      nextSong();
    }, (song.duration + 3) * 1000);
  };

  playerContainer.innerHTML = "";
  playerContainer.appendChild(iframe);

  document.querySelectorAll("#playlist li").forEach(li => li.classList.remove("active"));
  playlist.children[index].classList.add("active");
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
}

// Create playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
  });
  playlist.appendChild(li);
});

// ✅ Load first song on page load
window.onload = () => {
  loadSong(currentSong);
};
