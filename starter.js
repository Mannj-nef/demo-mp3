window.addEventListener("load", function () {
  const playRemaining = document.querySelector(".player-remaining");
  const playDuration = document.querySelector(".player-duration");
  const player = document.querySelector(".player-play");
  const next = document.querySelector(".player-next");
  const prev = document.querySelector(".player-prev");
  const song = document.querySelector("#song");
  const progressBar = document.querySelector("#progress-bar");
  const image = document.querySelector(".player-image");
  const title = document.querySelector(".play-title");

  const listMusic = [
    {
      name: "holo",
      path: "./files/holo.mp3",
      image:
        "https://media.istockphoto.com/photos/sound-wave-picture-id1287065554?b=1&k=20&m=1287065554&s=170667a&w=0&h=6JIPYTu98DAXdChKSeu-Td3zv8KyLC3yhu-rWfkDQQc=",
    },
    {
      name: "home",
      path: "./files/home.mp3",
      image:
        "https://media.istockphoto.com/photos/little-african-american-girl-enjoys-her-free-time-at-home-picture-id1285362966?b=1&k=20&m=1285362966&s=170667a&w=0&h=cbJLKVC-YE9NHveGdZLV2tde-yteNrUbFHFjfWK1nOk=",
    },
    {
      name: "spark",
      path: "./files/spark.mp3",
      image:
        "https://media.istockphoto.com/photos/music-player-on-mobile-phone-with-earphones-picture-id1297013252?b=1&k=20&m=1297013252&s=170667a&w=0&h=kIcnt5oOf2pIckUcWtrqzxbVh85yo9s3Q1QLJjSFseY=",
    },
    {
      name: "summer",
      path: "./files/summer.mp3",
      image:
        "https://media.istockphoto.com/photos/studio-microphone-and-pop-shield-on-mic-in-the-empty-recording-studio-picture-id1279654034?b=1&k=20&m=1279654034&s=170667a&w=0&h=jebzMhp_tlJi-3fLn3Ig8cYWG_JaF-vjt4SWLAI9o9Q=",
    },
  ];

  const imageAnimate = image.animate([{ transform: "rotate(360deg)" }], {
    duration: 5000,
    iterations: Infinity,
  });
  imageAnimate.pause();

  function start() {
    renderMusic();
    ListeningEvents();
    formatTime();
  }

  let time;
  let index = 0;

  function renderMusic() {
    image.setAttribute("src", `${listMusic[index].image}`);
    title.textContent = `${listMusic[index].name}`;
    song.setAttribute("src", `${listMusic[index].path}`);
  }

  function ListeningEvents() {
    player.addEventListener("click", handlePlayPause);
    progressBar.addEventListener("change", handleProgressBar);
    next.addEventListener("click", nextMusic);
    prev.addEventListener("click", prevMusic);
    song.addEventListener("ended", nextMusic);
  }

  function handlePlayPause() {
    const isMusicPaused = player.classList.contains("fa-play");
    isMusicPaused ? playMusic() : pauseMusic();
  }

  function playMusic() {
    song.play();
    player.classList.add("fa-pause");
    player.classList.remove("fa-play");

    time = setInterval(formatTime, 500);
    imageAnimate.play();
  }
  function pauseMusic() {
    player.classList.add("fa-play");
    player.classList.remove("fa-pause");
    song.pause();

    clearInterval(time);
    imageAnimate.pause();
  }
  function nextMusic() {
    index++;
    if (index >= listMusic.length) {
      index = 0;
    }
    renderMusic();
    playMusic();
  }
  function prevMusic() {
    index--;
    if (index < 0) {
      index = listMusic.length - 1;
    }
    renderMusic();
    playMusic();
  }
  function handleProgressBar() {
    song.currentTime = progressBar.value;
    playMusic();
  }

  function formatTime() {
    const { duration, currentTime } = song;
    progressBar.value = currentTime;
    progressBar.max = duration;

    playDuration.textContent = caclulateTimeMusic(duration);
    playRemaining.textContent = caclulateTimeMusic(currentTime);

    if (!duration) {
      playDuration.textContent = "00:00";
    }
  }

  function caclulateTimeMusic(time) {
    const minute = parseInt(time / 60);
    const seconds = parseInt(time - minute * 60);

    return `${
      minute < 10 ? "0" + minute : minute
    }: ${seconds < 10 ? "0" + seconds : seconds}`;
  }
  start();
});
