/* ============================================================
   JUKEBOX — music.js v2
   Vintage glassmorphism jukebox for 100 prghs for eeshah
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     CONFIG
     ========================================================== */
  var PLACEHOLDER_COVERS = [
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%232a2018%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22%23ffe680%22 opacity=%22.15%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%231c1620%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22%23e85d3a%22 opacity=%22.15%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23181820%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22%23ffd700%22 opacity=%22.12%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23221828%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22%23ffb6c1%22 opacity=%22.15%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23202018%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22%23ffa500%22 opacity=%22.15%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23182020%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22%23ff6347%22 opacity=%22.15%22/%3E%3C/svg%3E'
  ];

  var DEFAULT_SRC = './Romantic%20Dark%20Playlist%20for%20Making%20Love%20%20Sensual%20Late%20Night%20Vibes%20%28playlist%29.mp3';

  var SONGS = [
    { title: 'Until I Found You',   artist: 'Stephen Sanchez',  cover: PLACEHOLDER_COVERS[0], src: DEFAULT_SRC, duration: 207 },
    { title: 'Perfect',             artist: 'Ed Sheeran',        cover: PLACEHOLDER_COVERS[1], src: DEFAULT_SRC, duration: 263 },
    { title: 'Yellow',              artist: 'Coldplay',          cover: PLACEHOLDER_COVERS[2], src: DEFAULT_SRC, duration: 266 },
    { title: 'Turning Page',        artist: 'Sleeping At Last',  cover: PLACEHOLDER_COVERS[3], src: DEFAULT_SRC, duration: 257 },
    { title: 'Photograph',          artist: 'Ed Sheeran',        cover: PLACEHOLDER_COVERS[4], src: DEFAULT_SRC, duration: 259 },
    { title: 'I Wanna Be Yours',    artist: 'Arctic Monkeys',    cover: PLACEHOLDER_COVERS[5], src: DEFAULT_SRC, duration: 184 }
  ];

  var STORAGE_KEY = 'ash-jukebox';

  /* ==========================================================
     JUKEBOX CLASS
     ========================================================== */
  function Jukebox() {
    this.songs = SONGS;
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isOpen = false;
    this.volume = 0.5;
    this.shuffle = false;
    this.repeat = false;
    this.favorites = [];
    this.shuffleOrder = [];
    this.shuffleIndex = 0;
    this.duration = 0;
    this.currentTime = 0;
    this.audioCtx = null;
    this.gainNode = null;
    this.analyser = null;
    this.sourceNode = null;
    this.animationId = null;
    this.noteTimer = null;

    this.restoreState();
    this.buildDOM();
    this.bindEvents();
    this.updateUI();

    // Show button after delay
    var self = this;
    setTimeout(function () { self.btn.classList.add('show'); }, 1500);

    // Auto-play if was playing before
    if (this._autoPlay) {
      setTimeout(function () { self.togglePlay(); }, 2500);
    }
  }

  /* ==========================================================
     STATE PERSISTENCE
     ========================================================== */
  Jukebox.prototype.saveState = function () {
    try {
      var state = {
        index: this.currentIndex,
        volume: this.volume,
        shuffle: this.shuffle,
        repeat: this.repeat,
        favorites: this.favorites,
        isPlaying: this.isPlaying,
        currentTime: this.currentTime,
        shuffleOrder: this.shuffleOrder,
        shuffleIndex: this.shuffleIndex
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* noop */ }
  };

  Jukebox.prototype.restoreState = function () {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var state = JSON.parse(raw);
      if (state.index !== undefined) this.currentIndex = state.index;
      if (state.volume !== undefined) this.volume = state.volume;
      if (state.shuffle !== undefined) this.shuffle = state.shuffle;
      if (state.repeat !== undefined) this.repeat = state.repeat;
      if (state.favorites) this.favorites = state.favorites;
      if (state.shuffleOrder) this.shuffleOrder = state.shuffleOrder;
      if (state.shuffleIndex !== undefined) this.shuffleIndex = state.shuffleIndex;
      if (state.currentTime) this.currentTime = state.currentTime;
      this._autoPlay = !!state.isPlaying;
    } catch (e) { /* noop */ }
  };

  /* ==========================================================
     DOM BUILDING
     ========================================================== */
  Jukebox.prototype.buildDOM = function () {
    // Button
    this.btn = document.getElementById('jukeboxBtn');
    if (!this.btn) {
      this.btn = document.createElement('button');
      this.btn.id = 'jukeboxBtn';
      this.btn.setAttribute('aria-label', 'Open jukebox');
      this.btn.innerHTML =
        '<span class="btn-icon">&#x1F3B5;</span>' +
        '<svg class="progress-ring" viewBox="0 0 100 100">' +
          '<circle class="ring-bg" cx="50" cy="50" r="46"/>' +
          '<circle class="ring-fg" cx="50" cy="50" r="46" stroke-dasharray="289.03" stroke-dashoffset="289.03"/>' +
        '</svg>';
      document.body.appendChild(this.btn);
    }

    // Overlay
    this.overlay = document.getElementById('jukeboxOverlay');
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'jukeboxOverlay';
      document.body.appendChild(this.overlay);
    }

    // Panel
    this.panel = document.getElementById('jukeboxPanel');
    if (!this.panel) {
      this.panel = document.createElement('div');
      this.panel.id = 'jukeboxPanel';
      this.panel.innerHTML =
        '<div class="jukebox-inner">' +
          '<div class="jukebox-header">' +
            '<span class="now-playing-label">Now Playing</span>' +
            '<button class="close-btn" aria-label="Close jukebox">&times;</button>' +
          '</div>' +
          '<div class="album-section">' +
            '<div class="vinyl-container">' +
              '<div class="vinyl-glow"></div>' +
              '<div class="vinyl-disc">' +
                '<div class="album-cover-wrapper">' +
                  '<img class="album-cover" src="" alt="Album art" loading="lazy">' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="song-info">' +
            '<div class="song-title">Not Playing</div>' +
            '<div class="artist-name">&mdash;</div>' +
          '</div>' +
          '<div class="equalizer" id="jukeboxEq">' +
            '<div class="eq-bar"></div><div class="eq-bar"></div><div class="eq-bar"></div>' +
            '<div class="eq-bar"></div><div class="eq-bar"></div><div class="eq-bar"></div>' +
            '<div class="eq-bar"></div><div class="eq-bar"></div>' +
          '</div>' +
          '<div class="seek-container">' +
            '<input type="range" class="seek-bar" min="0" max="1000" value="0" aria-label="Seek">' +
            '<div class="time-display">' +
              '<span class="current-time">0:00</span>' +
              '<span class="total-time">0:00</span>' +
            '</div>' +
          '</div>' +
          '<div class="controls">' +
            '<button class="shuffle-btn" aria-label="Toggle shuffle">&#x1F500;</button>' +
            '<button class="prev-btn" aria-label="Previous track">&#x23EE;</button>' +
            '<button class="play-pause" aria-label="Play / Pause">&#x25B6;</button>' +
            '<button class="next-btn" aria-label="Next track">&#x23ED;</button>' +
            '<button class="repeat-btn" aria-label="Toggle repeat">&#x1F501;</button>' +
          '</div>' +
          '<div class="volume-container">' +
            '<span class="vol-icon">&#x1F509;</span>' +
            '<input type="range" class="volume-slider" min="0" max="100" value="' + (this.volume * 100) + '" aria-label="Volume">' +
          '</div>' +
          '<div class="playlist-label">Playlist</div>' +
          '<div class="playlist" id="jukeboxPlaylist" role="listbox" aria-label="Song playlist"></div>' +
        '</div>';
      document.body.appendChild(this.panel);
    }

    // Mini player
    this.miniPlayer = document.getElementById('jukeboxMini');
    if (!this.miniPlayer) {
      this.miniPlayer = document.createElement('div');
      this.miniPlayer.id = 'jukeboxMini';
      this.miniPlayer.className = 'mini-player';
      this.miniPlayer.innerHTML =
        '<div class="mp-album"><img src="" alt="" loading="lazy"></div>' +
        '<div class="mp-info">' +
          '<div class="mp-title">Not Playing</div>' +
          '<div class="mp-artist">&mdash;</div>' +
        '</div>' +
        '<button class="mp-play-btn" aria-label="Play / Pause">&#x25B6;</button>';
      document.body.appendChild(this.miniPlayer);
    }

    // Refs
    this.vinylDisc = this.panel.querySelector('.vinyl-disc');
    this.albumCover = this.panel.querySelector('.album-cover');
    this.songTitle = this.panel.querySelector('.song-title');
    this.artistName = this.panel.querySelector('.artist-name');
    this.seekBar = this.panel.querySelector('.seek-bar');
    this.currentTimeEl = this.panel.querySelector('.current-time');
    this.totalTimeEl = this.panel.querySelector('.total-time');
    this.playBtn = this.panel.querySelector('.play-pause');
    this.prevBtn = this.panel.querySelector('.prev-btn');
    this.nextBtn = this.panel.querySelector('.next-btn');
    this.shuffleBtn = this.panel.querySelector('.shuffle-btn');
    this.repeatBtn = this.panel.querySelector('.repeat-btn');
    this.volumeSlider = this.panel.querySelector('.volume-slider');
    this.volIcon = this.panel.querySelector('.vol-icon');
    this.playlistEl = this.panel.querySelector('.playlist');
    this.eqEl = this.panel.querySelector('.equalizer');
    this.closeBtn = this.panel.querySelector('.close-btn');
    this.progressRing = this.btn.querySelector('.ring-fg');
    this.mpAlbum = this.miniPlayer.querySelector('.mp-album img');
    this.mpTitle = this.miniPlayer.querySelector('.mp-title');
    this.mpArtist = this.miniPlayer.querySelector('.mp-artist');
    this.mpPlayBtn = this.miniPlayer.querySelector('.mp-play-btn');

    this.buildPlaylist();
  };

  Jukebox.prototype.buildPlaylist = function () {
    var html = '';
    var self = this;
    for (var i = 0; i < this.songs.length; i++) {
      var s = this.songs[i];
      var isFav = this.favorites.indexOf(i) !== -1;
      html +=
        '<div class="playlist-item" role="option" data-index="' + i + '" tabindex="0">' +
          '<div class="pl-album"><img src="' + s.cover + '" alt="" loading="lazy"></div>' +
          '<div class="pl-info">' +
            '<div class="pl-title">' + s.title + '</div>' +
            '<div class="pl-artist">' + s.artist + '</div>' +
          '</div>' +
          '<span class="pl-duration">' + self.formatTime(s.duration) + '</span>' +
          '<span class="pl-playing-indicator"></span>' +
          '<button class="pl-fav-btn ' + (isFav ? 'is-fav' : '') + '" data-index="' + i + '" aria-label="' + (isFav ? 'Remove from favorites' : 'Add to favorites') + '">' + (isFav ? '\u2764' : '\u2661') + '</button>' +
        '</div>';
    }
    this.playlistEl.innerHTML = html;
  };

  /* ==========================================================
     AUDIO ENGINE
     ========================================================== */
  Jukebox.prototype.initAudio = function () {
    if (this.audioCtx) return;
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = this.volume;
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    } catch (e) {
      // Web Audio not supported, continue with basic Audio
    }
  };

  Jukebox.prototype.createAudio = function () {
    var self = this;
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
    }
    this.audio = new Audio(this.songs[this.currentIndex].src);
    this.audio.preload = 'auto';
    this.audio.volume = 1;

    // Connect to Web Audio API if available
    if (this.audioCtx && this.gainNode) {
      try {
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);
        this.sourceNode.connect(this.gainNode);
      } catch (e) {
        // Already connected, fallback to direct audio
        this.audio.volume = this.volume;
      }
    } else {
      this.audio.volume = this.volume;
    }

    this.audio.addEventListener('loadedmetadata', function () {
      self.duration = self.audio.duration || self.songs[self.currentIndex].duration;
      self.totalTimeEl.textContent = self.formatTime(self.duration);
      self.seekBar.max = Math.floor(self.duration * 100) || 1000;
    });

    this.audio.addEventListener('timeupdate', function () {
      self.currentTime = self.audio.currentTime || 0;
      self.updateTimeDisplay();
    });

    this.audio.addEventListener('ended', function () {
      self.onTrackEnd();
    });

    this.audio.addEventListener('error', function () {
      // Fallback: just advance anyway
      self.onTrackEnd();
    });
  };

  Jukebox.prototype.onTrackEnd = function () {
    if (this.repeat === true) {
      // Repeat one
      this.audio.currentTime = 0;
      this.audio.play();
    } else {
      this.next();
    }
  };

  /* ==========================================================
     PLAYBACK CONTROLS
     ========================================================== */
  Jukebox.prototype.play = function (index) {
    var self = this;

    if (index !== undefined && index !== this.currentIndex) {
      this.crossfadeOut(function () {
        self.currentIndex = index;
        self.loadAndPlay();
      });
      return;
    }

    if (index !== undefined) {
      this.currentIndex = index;
    }

    this.initAudio();
    if (!this.audio) {
      this.createAudio();
    }

    if (this.audio && this.audio.paused) {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      this.audio.play().then(function () {
        self.isPlaying = true;
        self.updateUI();
        self.saveState();
        if (self.vinylDisc) self.vinylDisc.classList.add('spinning');
        if (self.eqEl) self.eqEl.classList.add('active');
        self.spawnNotes();
      }).catch(function () {
        self.isPlaying = false;
        self.updateUI();
      });
    } else if (!this.audio) {
      this.loadAndPlay();
    }
  };

  Jukebox.prototype.loadAndPlay = function () {
    var self = this;
    this.isPlaying = true;
    this.createAudio();
    this.updateSongInfo();
    this.updatePlaylist();

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Restore position
    if (this.currentTime > 0 && this.currentTime < this.songs[this.currentIndex].duration) {
      this.audio.currentTime = this.currentTime;
    }

    this.audio.play().then(function () {
      self.updateUI();
      self.saveState();
      if (self.vinylDisc) self.vinylDisc.classList.add('spinning');
      if (self.eqEl) self.eqEl.classList.add('active');
      self.spawnNotes();
      self.startVisualizer();
    }).catch(function () {
      self.isPlaying = false;
      self.updateUI();
    });
  };

  Jukebox.prototype.pause = function () {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.currentTime = this.audio ? this.audio.currentTime : this.currentTime;
    if (this.vinylDisc) this.vinylDisc.classList.remove('spinning');
    if (this.eqEl) this.eqEl.classList.remove('active');
    if (this.noteTimer) { clearInterval(this.noteTimer); this.noteTimer = null; }
    this.saveState();
    this.updateUI();
  };

  Jukebox.prototype.togglePlay = function () {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  };

  Jukebox.prototype.next = function () {
    var self = this;
    this.crossfadeOut(function () {
      if (self.shuffle) {
        self.shuffleIndex = (self.shuffleIndex + 1) % self.shuffleOrder.length;
        self.currentIndex = self.shuffleOrder[self.shuffleIndex];
      } else if (self.repeat === 'all') {
        self.currentIndex = (self.currentIndex + 1) % self.songs.length;
      } else {
        self.currentIndex = Math.min(self.currentIndex + 1, self.songs.length - 1);
      }
      self.currentTime = 0;
      self.loadAndPlay();
    });
  };

  Jukebox.prototype.prev = function () {
    var self = this;

    // If more than 3 seconds in, restart current track
    if (this.audio && this.audio.currentTime > 3) {
      this.crossfadeOut(function () {
        self.audio.currentTime = 0;
        self.currentTime = 0;
        self.crossfadeIn();
        self.updateTimeDisplay();
      });
      return;
    }

    this.crossfadeOut(function () {
      if (self.shuffle) {
        self.shuffleIndex = (self.shuffleIndex - 1 + self.shuffleOrder.length) % self.shuffleOrder.length;
        self.currentIndex = self.shuffleOrder[self.shuffleIndex];
      } else if (self.repeat === 'all') {
        self.currentIndex = (self.currentIndex - 1 + self.songs.length) % self.songs.length;
      } else {
        self.currentIndex = Math.max(self.currentIndex - 1, 0);
      }
      self.currentTime = 0;
      self.loadAndPlay();
    });
  };

  /* ==========================================================
     CROSSFADE
     ========================================================== */
  Jukebox.prototype.crossfadeOut = function (callback) {
    if (!this.audio || !this.isPlaying) {
      if (callback) callback();
      return;
    }

    var self = this;
    var duration = 300;
    var steps = 15;
    var interval = duration / steps;
    var volStep = 1 / steps;
    var currentStep = 0;

    if (this.sourceNode && this.gainNode) {
      // Use gain node for smooth fade
      var startGain = this.gainNode.gain.value;
      var fadeTimer = setInterval(function () {
        currentStep++;
        if (currentStep >= steps) {
          clearInterval(fadeTimer);
          self.pause();
          if (callback) callback();
          // Reset gain for next song
          if (self.gainNode) self.gainNode.gain.value = self.volume;
        } else {
          if (self.gainNode) {
            self.gainNode.gain.value = Math.max(0, startGain * (1 - currentStep / steps));
          }
        }
      }, interval);
    } else {
      // Fallback: just pause
      this.pause();
      if (callback) callback();
    }
  };

  Jukebox.prototype.crossfadeIn = function () {
    var self = this;
    if (!this.sourceNode || !this.gainNode) return;

    var duration = 400;
    var steps = 20;
    var interval = duration / steps;
    var currentStep = 0;
    var targetVol = this.volume;

    this.gainNode.gain.value = 0;
    var fadeTimer = setInterval(function () {
      currentStep++;
      if (currentStep >= steps) {
        clearInterval(fadeTimer);
        if (self.gainNode) self.gainNode.gain.value = targetVol;
      } else {
        if (self.gainNode) {
          self.gainNode.gain.value = targetVol * (currentStep / steps);
        }
      }
    }, interval);
  };

  /* ==========================================================
     SHUFFLE & REPEAT
     ========================================================== */
  Jukebox.prototype.toggleShuffle = function () {
    this.shuffle = !this.shuffle;
    if (this.shuffle) {
      this.shuffleOrder = [];
      for (var i = 0; i < this.songs.length; i++) {
        if (i !== this.currentIndex) this.shuffleOrder.push(i);
      }
      // Fisher-Yates shuffle
      for (var j = this.shuffleOrder.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var tmp = this.shuffleOrder[j];
        this.shuffleOrder[j] = this.shuffleOrder[k];
        this.shuffleOrder[k] = tmp;
      }
      this.shuffleOrder.unshift(this.currentIndex);
      this.shuffleIndex = 0;
    }
    this.updateUI();
    this.saveState();
  };

  Jukebox.prototype.toggleRepeat = function () {
    // Cycle: off -> one (true) -> all ('all') -> off
    if (this.repeat === false) {
      this.repeat = true;
    } else if (this.repeat === true) {
      this.repeat = 'all';
    } else {
      this.repeat = false;
    }
    this.updateUI();
    this.saveState();
  };

  /* ==========================================================
     FAVORITES
     ========================================================== */
  Jukebox.prototype.toggleFavorite = function (index) {
    var idx = this.favorites.indexOf(index);
    if (idx === -1) {
      this.favorites.push(index);
    } else {
      this.favorites.splice(idx, 1);
    }
    this.saveState();
    this.buildPlaylist();
    this.highlightActivePlaylist();
    // Re-bind fav button events
    this.bindPlaylistFavEvents();
  };

  /* ==========================================================
     UI UPDATES
     ========================================================== */
  Jukebox.prototype.updateSongInfo = function () {
    var s = this.songs[this.currentIndex];
    if (this.songTitle) this.songTitle.textContent = s.title;
    if (this.artistName) this.artistName.textContent = s.artist;
    if (this.albumCover) this.albumCover.src = s.cover;
    if (this.albumCover) this.albumCover.alt = s.title + ' album art';
    if (this.mpTitle) this.mpTitle.textContent = s.title;
    if (this.mpArtist) this.mpArtist.textContent = s.artist;
    if (this.mpAlbum) this.mpAlbum.src = s.cover;
    if (this.totalTimeEl) this.totalTimeEl.textContent = this.formatTime(s.duration);
    if (this.seekBar) {
      this.seekBar.max = Math.floor((s.duration || 200) * 100);
    }
  };

  Jukebox.prototype.updateUI = function () {
    // Button state
    if (this.isPlaying) {
      this.btn.classList.add('playing');
      this.btn.querySelector('.btn-icon').textContent = '\u266B';
      this.playBtn.textContent = '\u23F8';
      this.mpPlayBtn.textContent = '\u23F8';
      this.miniPlayer.classList.add('show');
    } else {
      this.btn.classList.remove('playing');
      this.btn.querySelector('.btn-icon').textContent = '\uD83C\uDFB5';
      this.playBtn.textContent = '\u25B6';
      this.mpPlayBtn.textContent = '\u25B6';
      if (!this.isOpen) {
        this.miniPlayer.classList.remove('show');
      }
    }

    // Song info
    var s = this.songs[this.currentIndex];
    if (!this.isPlaying && !this.audio) {
      this.songTitle.textContent = s.title;
      this.artistName.textContent = s.artist;
      this.albumCover.src = s.cover;
      this.mpTitle.textContent = s.title;
      this.mpArtist.textContent = s.artist;
      this.mpAlbum.src = s.cover;
    }

    // Shuffle
    this.shuffleBtn.classList.toggle('active', this.shuffle);

    // Repeat
    this.repeatBtn.classList.toggle('active', this.repeat !== false);
    if (this.repeat === 'all') {
      this.repeatBtn.textContent = '\uD83D\uDD01';
    } else if (this.repeat === true) {
      this.repeatBtn.textContent = '\uD83D\uDD02';
    } else {
      this.repeatBtn.textContent = '\uD83D\uDD01';
    }

    // Volume
    this.volumeSlider.value = this.volume * 100;
    if (this.volume === 0) {
      this.volIcon.textContent = '\uD83D\uDD07';
    } else if (this.volume < 0.33) {
      this.volIcon.textContent = '\uD83D\uDD08';
    } else if (this.volume < 0.66) {
      this.volIcon.textContent = '\uD83D\uDD09';
    } else {
      this.volIcon.textContent = '\uD83D\uDD0A';
    }

    this.updatePlaylist();
    this.updateProgressRing();
  };

  Jukebox.prototype.updatePlaylist = function () {
    var items = this.playlistEl.querySelectorAll('.playlist-item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var idx = parseInt(item.getAttribute('data-index'), 10);
      item.classList.toggle('active', idx === this.currentIndex);
      item.classList.toggle('playing', idx === this.currentIndex && this.isPlaying);
    }
  };

  Jukebox.prototype.highlightActivePlaylist = function () {
    // Already done in updatePlaylist
  };

  Jukebox.prototype.updateTimeDisplay = function () {
    if (this.currentTimeEl) {
      this.currentTimeEl.textContent = this.formatTime(this.currentTime);
    }
    if (this.seekBar && this.duration > 0) {
      this.seekBar.value = Math.floor((this.currentTime / this.duration) * this.seekBar.max);
    }
    this.updateProgressRing();
  };

  Jukebox.prototype.updateProgressRing = function () {
    if (!this.progressRing) return;
    var s = this.songs[this.currentIndex];
    var dur = this.duration || s.duration || 200;
    var pct = Math.min(this.currentTime / dur, 1);
    var circumference = 289.03;
    var offset = circumference - (pct * circumference);
    this.progressRing.setAttribute('stroke-dashoffset', offset);
  };

  Jukebox.prototype.formatTime = function (sec) {
    if (!sec || isNaN(sec)) return '0:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  };

  /* ==========================================================
     VISUALIZER
     ========================================================== */
  Jukebox.prototype.startVisualizer = function () {
    var self = this;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (!this.analyser) return;

    var bufferLength = this.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var bars = this.eqEl ? this.eqEl.querySelectorAll('.eq-bar') : [];

    function draw() {
      self.animationId = requestAnimationFrame(draw);
      self.analyser.getByteFrequencyData(dataArray);

      for (var i = 0; i < bars.length && i < bufferLength; i++) {
        var val = dataArray[i] / 255;
        var h = 4 + val * 20;
        bars[i].style.height = h + 'px';
      }
    }
    draw();
  };

  /* ==========================================================
     FLOATING MUSICAL NOTES
     ========================================================== */
  Jukebox.prototype.spawnNotes = function () {
    var self = this;
    if (this.noteTimer) clearInterval(this.noteTimer);
    var notes = ['\u266A', '\u266B', '\u266C', '\uD83C\uDFB5', '\u266D'];
    var btnRect;

    this.noteTimer = setInterval(function () {
      if (!self.isPlaying) return;
      btnRect = self.btn.getBoundingClientRect();
      var note = document.createElement('div');
      note.className = 'music-note';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = (btnRect.left + btnRect.width / 2 + (Math.random() - 0.5) * 40) + 'px';
      note.style.bottom = (window.innerHeight - btnRect.top + 10) + 'px';
      document.body.appendChild(note);
      setTimeout(function () { note.remove(); }, 3000);
    }, 2000);
  };

  /* ==========================================================
     PANEL OPEN / CLOSE
     ========================================================== */
  Jukebox.prototype.open = function () {
    var self = this;
    this.isOpen = true;
    this.panel.classList.add('open');
    this.overlay.classList.add('open');
    this.miniPlayer.classList.remove('show');

    if (window.gsap) {
      var items = this.playlistEl.querySelectorAll('.playlist-item');
      gsap.fromTo(items,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out', delay: 0.15, clearProps: 'all' }
      );
    }

    this.saveState();
  };

  Jukebox.prototype.close = function () {
    var self = this;
    this.isOpen = false;
    this.panel.classList.remove('open');
    this.overlay.classList.remove('open');

    if (this.isPlaying) {
      this.miniPlayer.classList.add('show');
    }
  };

  Jukebox.prototype.togglePanel = function () {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  /* ==========================================================
     EVENT BINDING
     ========================================================== */
  Jukebox.prototype.bindEvents = function () {
    var self = this;

    // Button toggle
    this.btn.addEventListener('click', function (e) {
      e.stopPropagation();
      self.togglePanel();
    });

    // Overlay close
    this.overlay.addEventListener('click', function () {
      self.close();
    });

    // Close button
    this.closeBtn.addEventListener('click', function () {
      self.close();
    });

    // Play/Pause
    this.playBtn.addEventListener('click', function () {
      self.togglePlay();
    });

    this.mpPlayBtn.addEventListener('click', function () {
      self.togglePlay();
    });

    // Next
    this.nextBtn.addEventListener('click', function () {
      self.next();
    });

    // Previous
    this.prevBtn.addEventListener('click', function () {
      self.prev();
    });

    // Shuffle
    this.shuffleBtn.addEventListener('click', function () {
      self.toggleShuffle();
    });

    // Repeat
    this.repeatBtn.addEventListener('click', function () {
      self.toggleRepeat();
    });

    // Seek
    this.seekBar.addEventListener('input', function () {
      if (!self.audio || !self.duration) return;
      var pct = this.value / this.max;
      var time = pct * self.duration;
      self.audio.currentTime = time;
      self.currentTime = time;
      self.updateTimeDisplay();
    });

    // Volume
    this.volumeSlider.addEventListener('input', function () {
      self.volume = this.value / 100;
      if (self.audio) self.audio.volume = self.volume;
      if (self.gainNode) self.gainNode.gain.value = self.volume;
      self.updateUI();
      self.saveState();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      // Don't capture if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          self.togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          self.prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          self.next();
          break;
        case 'ArrowUp':
          e.preventDefault();
          self.volume = Math.min(1, self.volume + 0.05);
          self.volumeSlider.value = self.volume * 100;
          if (self.audio) self.audio.volume = self.volume;
          if (self.gainNode) self.gainNode.gain.value = self.volume;
          self.updateUI();
          self.saveState();
          break;
        case 'ArrowDown':
          e.preventDefault();
          self.volume = Math.max(0, self.volume - 0.05);
          self.volumeSlider.value = self.volume * 100;
          if (self.audio) self.audio.volume = self.volume;
          if (self.gainNode) self.gainNode.gain.value = self.volume;
          self.updateUI();
          self.saveState();
          break;
        case 'Escape':
          if (self.isOpen) self.close();
          break;
      }
    });

    // Playlist item clicks (delegated)
    this.playlistEl.addEventListener('click', function (e) {
      var item = e.target.closest('.playlist-item');
      var favBtn = e.target.closest('.pl-fav-btn');
      if (favBtn) return;
      if (!item) return;
      var idx = parseInt(item.getAttribute('data-index'), 10);
      if (idx === self.currentIndex && self.isPlaying) {
        // Toggle pause if clicking same song
      } else {
        self.play(idx);
      }
    });

    // Bind playlist fav buttons
    this.bindPlaylistFavEvents();

    // Initial UI update
    this.updateSongInfo();
    this.updateUI();

    // Restore volume
    this.volumeSlider.value = this.volume * 100;
    if (this.audio) this.audio.volume = this.volume;
    if (this.gainNode) this.gainNode.gain.value = this.volume;
  };

  Jukebox.prototype.bindPlaylistFavEvents = function () {
    var self = this;
    var favBtns = this.playlistEl.querySelectorAll('.pl-fav-btn');
    for (var i = 0; i < favBtns.length; i++) {
      favBtns[i].addEventListener('click', function (e) {
        e.stopPropagation();
        var idx = parseInt(this.getAttribute('data-index'), 10);
        self.toggleFavorite(idx);
      });
    }
  };

  /* ==========================================================
     INIT
     ========================================================== */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        new Jukebox();
      });
    } else {
      new Jukebox();
    }
  }

  init();

  // Load GSAP if not already loaded (progressive enhancement)
  if (typeof gsap === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script.onload = function () {
      // GSAP loaded — no need to re-init, just enhanced animations available
    };
    document.head.appendChild(script);
  }

})();
