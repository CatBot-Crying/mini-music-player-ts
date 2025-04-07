const audio = document.getElementById('audio') as HTMLAudioElement;
const playBtn = document.getElementById('play') as HTMLButtonElement;
const prevBtn = document.getElementById('prev') as HTMLButtonElement;
const nextBtn = document.getElementById('next') as HTMLButtonElement;
const title = document.getElementById('song-title') as HTMLHeadingElement;
const artist = document.getElementById('song-artist') as HTMLHeadingElement;
const visualizer = document.getElementById("visualizer") as HTMLDivElement;

const songs = [
  {
    title: "Chill Vibes",
    artist: "DJ Relaxo",
    url: "https://files.catbox.moe/abcd1234.mp3" // Replace with your Catbox file
  },
  {
    title: "Lo-Fi Beat",
    artist: "Lo-Fi Kid",
    url: "https://files.catbox.moe/xyz5678.mp3" // Replace with your Catbox file
  }
];

let currentIndex = 0;

function playMusic() {
  audio.play();
  playBtn.textContent = "Pause";
  visualizer.classList.add("active");
}

function pauseMusic() {
  audio.pause();
  playBtn.textContent = "Play";
  visualizer.classList.remove("active");
}

function loadSong(index: number) {
  const song = songs[index];
  title.textContent = `Now Playing: ${song.title}`;
  artist.textContent = `Artist: ${song.artist}`;
  audio.src = song.url;
  playMusic();
}

playBtn.onclick = () => {
  if (audio.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
};

audio.addEventListener("ended", () => {
  nextBtn.click();
});

audio.addEventListener("pause", () => {
  visualizer.classList.remove("active");
});

audio.addEventListener("play", () => {
  visualizer.classList.add("active");
});

loadSong(currentIndex);
