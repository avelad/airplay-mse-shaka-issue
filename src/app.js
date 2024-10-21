function setupPlayer () {
  const url = 'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8';
  const videoContainer = document.createElement('div');
  videoContainer.setAttribute('data-url', url);
  videoContainer.classList.add('player-container');
  const video = document.createElement('video');
  video.setAttribute('autoplay', true);
  video.setAttribute('playsinline', '');
  video.muted = true;
  video.style.width = '100%';
  videoContainer.appendChild(video);
  document.body.appendChild(videoContainer);
  const localPlayer = new shaka.Player();
  localPlayer.attach(video);
  const ui = new shaka.ui.Overlay(localPlayer, videoContainer, video);
  ui.configure({
    customContextMenu: true,
  });
  const controls = ui.getControls();
  const player = controls.getPlayer();
  player.load(url);
  player.addEventListener('loaded', () => {
    video.play();
  }, {once: true});
}

function initApp() {
  shaka.polyfill.installAll();
  setupPlayer();
}

document.addEventListener('DOMContentLoaded', initApp);