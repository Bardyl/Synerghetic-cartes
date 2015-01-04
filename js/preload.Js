var jsonFile       = 'data/preload.json';
var preloadZone    = document.getElementById('preloading');
var tempPreload    = document.getElementById('preloading-asset');
var percentage     = document.getElementById('loading-bar');
var percentageText = document.getElementById('preload-percentage');
var videoLoader    = document.getElementById('video-loader');

var xhr = new XMLHttpRequest();
xhr.open('GET', jsonFile, true);

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var filesToLoad = JSON.parse(xhr.responseText);

        var assets   = filesToLoad.files[0].assets;
        var pictures = filesToLoad.files[0].pictures;

        var numberofElements = assets.length + pictures.length;
        var compteur = 0;

        for (var i = 0; i < assets.length; i++) {
            var img = new Image();
            img.src = assets[i]['file'];
            img.onload = function() {
                compteur++;
                percentage.style.width = Math.round(compteur * 100 / numberofElements) + '%';
                percentageText.innerHTML = Math.round(compteur * 100 / numberofElements) + ' %';
                showOff(Math.round(compteur * 100 / numberofElements));
            }
        }

        var k = 0;
        for (var j = assets.length + 1; j < pictures.length + assets.length + 1; j++) {
            var img = new Image();
            img.src = pictures[k]['file'];
            img.onload = function() {
                compteur++;
                percentage.style.width = Math.round(compteur * 100 / numberofElements) + '%';
                percentageText.innerHTML = Math.round(compteur * 100 / numberofElements) + ' %';
                showOff(Math.round(compteur * 100 / numberofElements));
            };
            k++;
        }

    }
};

xhr.send();

function showOff(percentageInt) {
    if (percentageInt == 100) {
        percentageText.innerHTML = 'CHARGEMENT TERMINÉ !';
        videoLoader.loop = false;
        videoLoader.addEventListener('ended', function() {
            setTimeout(function() {
                preloadZone.style.opacity = 0;
                setTimeout(function() {
                    preloadZone.style.display = 'none';
                }, 1000);
            }, 500);
        });
    }
}