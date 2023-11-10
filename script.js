const audioTracks = [
    {
        src: 'audio/Aviao Arpeggio 1.m4a',
        volume: 1.0,
        loop: true,
    },
    {
        src: 'audio/Aviao Arpeggio 2.m4a',
        volume: 1.0,
        loop: true,
    },
    {
        src: 'audio/Aviao Bass.m4a',
        volume: 1.0,
        loop: true,
    },
    {
        src: 'audio/Aviao Drums.m4a',
        volume: 1.0,
        loop: true,
    },
    {
        src: 'audio/Aviao Organ.m4a',
        volume: 1.0,
        loop: true,
    },
];

const soundObjects = [];

function initializeAudioTracks(audioContext) {
    audioTracks.forEach((track, index) => {
        soundObjects[index] = new Howl({
            src: [track.src],
            volume: track.volume,
            loop: track.loop,
            preload: true,
            ctx: audioContext, // Pass the audio context
        });
    });
}

// Function to update the volume for a specific track
function setCustomVolume(trackIndex, volume) {
    if (soundObjects[trackIndex]) {
        soundObjects[trackIndex].volume(volume);
    }
}

function playAllAudio() {
    soundObjects.forEach((sound) => sound.play());
    isPlaying = true;
}

function stopAllAudio() {
    soundObjects.forEach((sound) => sound.stop());
    isPlaying = false;
}

function toggleMute(trackIndex, button) {
    if (soundObjects[trackIndex]) {
        if (soundObjects[trackIndex]._muted) {
            // Unmute the track
            soundObjects[trackIndex].volume(audioTracks[trackIndex].volume);
            button.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            // Mute the track
            soundObjects[trackIndex].volume(0);
            button.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Change the button icon
        }
        soundObjects[trackIndex]._muted = !soundObjects[trackIndex]._muted;
    }
}

// Create an array to keep track of soloed tracks
const soloedTracks = [];

// Function to toggle solo for a track
function toggleSolo(trackIndex, button) {
    const isSoloed = soloedTracks.includes(trackIndex);

    // If the track is already soloed, unsolo it
    if (isSoloed) {
        const index = soloedTracks.indexOf(trackIndex);
        if (index !== -1) {
            soloedTracks.splice(index, 1);
        }
    } else {
        // If the track is not soloed, solo it and add to the soloedTracks array
        soloedTracks.push(trackIndex);
    }

    // Update the volume for all tracks based on the solo state
    soundObjects.forEach((sound, index) => {
        if (soloedTracks.length === 0) {
            sound.volume(audioTracks[index].volume);
        } else {
            sound.volume(soloedTracks.includes(index) ? audioTracks[index].volume : 0);
        }
    });

    // Toggle the button appearance
    if (isSoloed) {
        button.innerHTML = '<i class="fas fa-microphone"></i>'; // Change the button icon when unsoloed
    } else {
        button.innerHTML = '<i class="fas fa-microphone-slash"></i>'; // Change the button icon when soloed
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    initializeAudioTracks(audioContext);

    // Add your HTML and control elements here

    const playAllButton = document.getElementById('playAllButton');
    playAllButton.addEventListener('click', playAllAudio);

    const stopAllButton = document.getElementById('stopAllButton');
    stopAllButton.addEventListener('click', stopAllAudio);

    // Initialize volume labels
    updateLabels();

    // Event listener to start playing audio when ready
    soundObjects.forEach((sound, index) => {
        sound.on('load', () => {
            if (isPlaying) {
                sound.play();
            }
        });
    });
});

function updateLabels() {
    const labels = document.querySelectorAll('.volume-label');

    labels.forEach((label, index) => {
        // Get the file name without the path and file extension
        const fileName = audioTracks[index].src.split('/').pop().split('.').slice(0, -1).join('.');
        label.textContent = fileName;
    });
}
