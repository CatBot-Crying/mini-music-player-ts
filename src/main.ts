interface Song {
  path: string
  displayName: string
  cover: string
  artist: string
}

class MusicPlayer {
  private music: HTMLAudioElement
  private songs: Song[]
  private musicIndex: number = 0
  private isPlaying: boolean = false

  private image: HTMLImageElement
  private title: HTMLElement
  private artist: HTMLElement
  private currentTimeEl: HTMLElement
  private durationEl: HTMLElement
  private progress: HTMLElement
  private playerProgress: HTMLElement
  private prevBtn: HTMLElement
  private nextBtn: HTMLElement
  private playBtn: HTMLElement
  private background: HTMLImageElement

  constructor() {
    this.music = new Audio()
    this.songs = [
      {
        path: '/assets/1.mp3',
        displayName: "The Charmer's Call",
        cover: '/assets/1.jpg',
        artist: 'Hanu Dixit',
      },
      {
        path: '/assets/2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: '/assets/2.jpg',
        artist: 'NEFFEX',
      },
      {
        path: '/assets/3.mp3',
        displayName: 'Intellect',
        cover: '/assets/3.jpg',
        artist: 'Yung Logos',
      }
    ]

    this.image = document.getElementById('cover') as HTMLImageElement
    this.title = document.getElementById('music-title') as HTMLElement
    this.artist = document.getElementById('music-artist') as HTMLElement
    this.currentTimeEl = document.getElementById('current-time') as HTMLElement
    this.durationEl = document.getElementById('duration') as HTMLElement
    this.progress = document.getElementById('progress') as HTMLElement
    this.playerProgress = document.getElementById('player-progress') as HTMLElement
    this.prevBtn = document.getElementById('prev') as HTMLElement
    this.nextBtn = document.getElementById('next') as HTMLElement
    this.playBtn = document.getElementById('play') as HTMLElement
    this.background = document.getElementById('bg-img') as HTMLImageElement

    this.setupEventListeners()
    this.loadMusic(this.songs[this.musicIndex])
  }

  private setupEventListeners(): void {
    this.playBtn.addEventListener('click', () => this.togglePlay())
    this.prevBtn.addEventListener('click', () => this.changeMusic(-1))
    this.nextBtn.addEventListener('click', () => this.changeMusic(1))
    this.music.addEventListener('ended', () => this.changeMusic(1))
    this.music.addEventListener('timeupdate', () => this.updateProgressBar())
    this.playerProgress.addEventListener('click', (e) => this.setProgressBar(e as MouseEvent))
  }

  private togglePlay(): void {
    this.isPlaying ? this.pauseMusic() : this.playMusic()
  }

  private playMusic(): void {
    this.isPlaying = true
    this.playBtn.classList.replace('fa-play', 'fa-pause')
    this.playBtn.setAttribute('title', 'Pause')
    this.music.play()
  }

  private pauseMusic(): void {
    this.isPlaying = false
    this.playBtn.classList.replace('fa-pause', 'fa-play')
    this.playBtn.setAttribute('title', 'Play')
    this.music.pause()
  }

  private loadMusic(song: Song): void {
    this.music.src = song.path
    this.title.textContent = song.displayName
    this.artist.textContent = song.artist
    this.image.src = song.cover
    this.background.src = song.cover
  }

  private changeMusic(direction: number): void {
    this.musicIndex = (this.musicIndex + direction + this.songs.length) % this.songs.length
    this.loadMusic(this.songs[this.musicIndex])
    this.playMusic()
  }

  private updateProgressBar(): void {
    const { duration, currentTime } = this.music
    const progressPercent = (currentTime / duration) * 100
    this.progress.style.width = `${progressPercent}%`

    const formatTime = (time: number): string => String(Math.floor(time)).padStart(2, '0')
    this.durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`
    this.currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`
  }

  private setProgressBar(e: MouseEvent): void {
    const width = this.playerProgress.clientWidth
    const clickX = e.offsetX
    this.music.currentTime = (clickX / width) * this.music.duration
  }
}

new MusicPlayer()
