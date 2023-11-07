const audioElements = document.querySelectorAll('audio');

let isPlaying = false; // Add a variable to track if audio is playing

let soloed = [];

function toggleSolo(audioId) {
    const audio = document.getElementById(audioId);
    const soloButton = document.getElementById('soloButton' + audioId.charAt(audioId.length - 1));

    if (soloed.includes(audioId)) {
        // Toggle off solo for the current track
        soloed = soloed.filter((id) => id !== audioId);
        audio.muted = false;
        soloButton.classList.remove('active');
        
        if (soloed.length === 0) {
            // If there are no other soloed tracks, unmute all tracks
            audioElements.forEach((element) => {
                element.muted = false;
                const muteButton = document.getElementById('muteButton' + element.id.charAt(element.id.length - 1));
                muteButton.classList.remove('active');
            });
        } else {
            // Mute only non-soloed tracks
            audioElements.forEach((element) => {
                const muteButton = document.getElementById('muteButton' + element.id.charAt(element.id.length - 1));
                if (!soloed.includes(element.id)) {
                    element.muted = true;
                    muteButton.classList.add('active');
                } else {
                    element.muted = false;
                    muteButton.classList.remove('active');
                }
            });
        }
    } else {
        // Toggle on solo for the current track
        soloed.push(audioId);
        soloButton.classList.add('active');

        // Mute only non-soloed tracks
        audioElements.forEach((element) => {
            const muteButton = document.getElementById('muteButton' + element.id.charAt(element.id.length - 1));
            if (!soloed.includes(element.id)) {
                element.muted = true;
                muteButton.classList.add('active');
            } else {
                element.muted = false;
                muteButton.classList.remove('active');
            }
        });
    }
}

function toggleMute(audioId) {
    const audio = document.getElementById(audioId);
    audio.muted = !audio.muted;
    const muteButton = document.getElementById('muteButton' + audioId.charAt(audioId.length - 1));
    muteButton.classList.toggle('active', audio.muted);
}


function playAllAudio() {
    const playAllButton = document.getElementById('playAllButton');
    playAllButton.classList.add('active');

    var audioElements = document.querySelectorAll('audio');
    audioElements.forEach(function (audio) {
        audio.play();
    });
}

// Add a function to stop all audio
function stopAllAudio() {
    const playAllButton = document.getElementById('playAllButton');
    playAllButton.classList.remove('active');
    isPlaying = false; // Set isPlaying to false
    
    audioElements.forEach(function (audio) {
        audio.pause();
        audio.currentTime = 0;
    });
}

// Add an event listener to the stop button
const stopAllButton = document.getElementById('stopAllButton');
stopAllButton.addEventListener('click', function () {
    if (isPlaying) { // Check if audio is playing
        stopAllAudio();
    }
});

// Add an event listener to handle audio play
audioElements.forEach((audio) => {
    audio.addEventListener('canplay', () => {
        if (isPlaying) { // Check if audio is supposed to be playing
            audio.play();
        }
    });
    audio.load(); // Start loading the audio
});

function setVolume(audioId, volume) {
    var audio = document.getElementById(audioId);
    audio.volume = volume;
}

function updateLabels() {
    var audioElements = document.querySelectorAll('audio');
    var labels = document.querySelectorAll('.volume-label');
    
    for (var i = 0; i < audioElements.length; i++) {
        var audio = audioElements[i];
        var label = labels[i];
        label.textContent = decodeURIComponent(getFileName(audio.src));
    }
}

function getFileName(src) {
    var index = src.lastIndexOf('/');
    if (index !== -1) {
        src = src.substring(index + 1);
    }
    index = src.lastIndexOf('.');
    if (index !== -1) {
        src = src.substring(0, index);
    }
    return src;
}

updateLabels();
