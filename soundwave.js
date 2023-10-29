// Soundcloud-style player

import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

// Define the waveform gradient
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
gradient.addColorStop(0, '#656666') // Top color
gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
gradient.addColorStop(1, '#B1B1B1') // Bottom color

// Define the progress gradient
const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
progressGradient.addColorStop(0, '#2FBEEE') // Top color
progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#26BAEB') // Top color
progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#d594f6') // Bottom color
progressGradient.addColorStop(1, '#d594f6') // Bottom color

// Create the waveform
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: gradient,
  progressColor: progressGradient,
  barWidth: 2,
  url: '/Assets/Music/Abgrundkrieg.wav',
})

const play_button = document.getElementById('play-button');
const pause_button = document.getElementById('pause-button');
pause_button.style.display = "none";

document.getElementById('play-pause').addEventListener('click', () => {
    wavesurfer.playPause()
    switchButton();
})

function switchButton() {
    if (play_button.style.display === "none") {
        play_button.style.display = "flex";
    } else {
        play_button.style.display = "none";
    }

    if (pause_button.style.display === "none") {
        pause_button.style.display = "flex";
    } else {
        pause_button.style.display = "none";
    }
}

// Hover effect
{
  const hover = document.querySelector('#hover')
  const waveform = document.querySelector('#waveform')
  waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))
}

// Current time & duration
{
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secondsRemainder = Math.round(seconds) % 60
    const paddedSeconds = `0${secondsRemainder}`.slice(-2)
    return `${minutes}:${paddedSeconds}`
  }

  const timeEl = document.querySelector('#time')
  const durationEl = document.querySelector('#duration')
  wavesurfer.on('decode', (duration) => (durationEl.textContent = formatTime(duration)))
  wavesurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))
}