// JavaScript code remains the same.

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
