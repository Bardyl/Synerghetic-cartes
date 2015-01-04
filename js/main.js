var appLeft   = document.getElementById('app-left');
var appCenter = document.getElementById('app-center');
var appRight  = document.getElementById('app-right');

var fileButton   = document.getElementById('inputFile');
var fileInput    = document.getElementById('trueInputFile');
var uploadButton = document.getElementById('uploadButton');
var loaderDiv    = document.getElementById('loader');
var imageBox     = document.getElementById('center-box');
var resultBox    = document.getElementById('app-result');
var progress     = document.getElementById('progress');
var result       = document.getElementById('result');
var resultimg    = document.getElementById('resultimg');
var sharebutton  = document.getElementById('share');
var shareElement = document.getElementById('share-share');
var getUrlInput  = document.getElementById('getURL');
var uploadPerc   = document.getElementById('upload-percentage');
var synergifyImg = document.getElementById('progress-synergify');

var shareFacebook   = document.getElementById('share-facebook');
var shareTwitter    = document.getElementById('share-twitter');
var metaDescription = "À l’occasion des fêtes de fin d’année, devenez un enfant du Web avec Synerg'hetic !";

// errors
var appInfoLeftError           = document.getElementById('app-info-left-error');
var appInfoLeftError_select    = "N'oubliez pas de <strong>sélectionner une photo</strong> !";
var appInfoLeftError_extension = "Merci de sélectionner une image au format .jpg ou .png !";

// Synergefication error
var appInfoRightError = document.getElementById('app-info-right-error');

// Upload error
var uploadError = "Désolé, l'upload de la photo a échoué. <br />Merci de réessayer.";

// Domain of website
var domain = 'http://cartes.synerghetic.net/';

var Upload = {
    initHandlers: function() {
        fileButton.addEventListener('click', this.triggerInput, true);
        uploadButton.addEventListener('click', this.toSynerg, true);
        share.addEventListener('click', this.share, true);

        fileInput.addEventListener('change', this.uploadFile, true);
    },

    // Fake input file upload
    triggerInput: function() {
        fileInput.click();
    },

    // Automatic file upload file after selecting them
    uploadFile: function(e) {

        // If new upload
        if (uploadButton.getAttribute('fileID') != null) {
            imageBox.style.opacity = 1;
            uploadPerc.style.opacity = 1;
            loaderDiv.style.opacity = .8;

            uploadPerc.innerHTML = '';
            loaderDiv.style.height = '60%';

            imageBox.style.backgroundImage = "url('img/loader.png')";
            imageBox.style.backgroundRepeat = "none";
            imageBox.style.backgroundPosition = "center center";
            imageBox.style.backgroundSize = "66% auto";
        }

        // Get extension of file
        fileButton.innerHTML = fileInput.value;
        var extension = fileInput.value.substr((Math.max(0, fileInput.value.lastIndexOf(".")) || Infinity) + 1);

        // Check extension of the file. Only jpg and png are allowed
        if (extension == 'jpg' || extension == 'png' || extension == 'JPG' || extension == 'PNG') {
            // Hide errors
            appInfoLeftError.style.opacity = 0;

            // Process upload
            var xhr = new XMLHttpRequest();

            // On upload progress
            if (xhr.upload) {
                xhr.upload.addEventListener('progress', function (e) {
                    // Get upload percentage
                    var percentage = parseInt(e.loaded / e.total * 100);

                    // 60% is top 20% and bottom 20%
                    loaderDiv.style.height = 60 - (percentage * 60 / 100) + '%';
                    uploadPerc.innerHTML   = percentage + '%';
                }, false);
            }

            // Call index.php file with the correction function
            xhr.open('POST', 'index.php?new&extension=' + extension, true);

            // When upload is complete
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Get json response
                    var response = JSON.parse(xhr.responseText);

                    // If no errors during upload
                    if (response.success) {

                        // Some visual effects
                        uploadPerc.style.opacity = 0;
                        loaderDiv.style.opacity = 0;
                        imageBox.style.opacity = 0;

                        imageBox.style.background = 'url("uploads/' + response.fileID + '.' + extension + '") no-repeat center center';
                        imageBox.style.backgroundSize = 'auto 100%';

                        setTimeout(function () {
                            imageBox.style.opacity = 1;
                        }, 1000);

                        // Set metadata to the next step: synergify the picture
                        uploadButton.setAttribute('fileID', response.fileID);
                        uploadButton.setAttribute('fileExtension', extension);
                    } else {
                        // Display error
                        uploadPerc.classList.add('error');
                        uploadPerc.innerHTML = uploadError;
                    }
                }
            };

            // Add file to php://input
            xhr.setRequestHeader('X-FILENAME', fileInput.value);
            // Send file
            xhr.send(e.target.files[0]);
        } else {
            // Display errors
            fileInput.value = '';
            appInfoLeftError.innerHTML     = appInfoLeftError_extension;
            appInfoLeftError.style.opacity = 1;
        }
    },

    // Synergify the picture
    toSynerg: function() {
        // Check the input file
        if (fileInput.value != '') {
            appInfoLeftError.style.opacity = 0;

            appLeft.style.opacity   = 0;
            appCenter.style.opacity = 0;
            appRight.style.opacity  = 0;

            resultBox.classList.add('open');
            setTimeout(function() {
                resultBox.style.opacity = 1;
                synergifyImg.src = 'img/synerghetic.gif';
            }, 300);

            // AJAX action to synergetise picture
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'index.php?create=' + uploadButton.getAttribute('fileID'), true);

            // On process ended
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {

                    // Hide progress bar
                    progress.style.opacity = 0;
                    setTimeout(function() {
                        progress.style.display = 'none';
                        result.style.display = 'inline-block';
                    }, 300);

                    // Get response status
                    var response = JSON.parse(xhr.responseText);

                    if (response.success) {
                        // Hide errors messages
                        appInfoRightError.style.opacity = 0;

                        // Show image with delay to smooth effect
                        resultimg.src = 'uploads/' + response.fileID + '.png';
                        resultimg.style.height = '100%';

                        setTimeout(function () {
                            result.style.opacity = 1;
                            // Set share input content
                            getUrlInput.value = domain + 'uploads/' + response.fileID + '.png';
                        }, 600);
                    } else {
                        // Hide result and back to file upload process
                        // with display errors
                        resultBox.style.opacity = 0;
                        setTimeout(function() {
                            // Display default box
                            appLeft.style.opacity   = 1;
                            appCenter.style.opacity = 1;
                            appRight.style.opacity  = 1;
                            resultBox.classList.remove('open');

                            // Show errors
                            appInfoRightError.style.opacity = 1;
                        }, 500);
                    }
                }
            };
            // Send request
            xhr.send();
        } else {
            // Display errors
            appInfoLeftError.innerHTML = appInfoLeftError_select;
            appInfoLeftError.style.opacity = 1;
        }
    },

    share: function() {
        result.firstChild.nextSibling.style.height = '65%';
        // Trick to resize image because Chrome sucks
        resultimg.style.height = '';
        resultimg.style.height = '99%';

        // Setup share buttons
        shareFacebook.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var url = 'http://www.facebook.com/sharer.php?&p[url]=' + encodeURIComponent(getUrlInput.value);
            popupWindow(this, url, 700, 500);
        });

        shareTwitter.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var url = twitterIntentify(metaDescription, getUrlInput.value);
            popupWindow(this, url, 700, 500);
        });

        sharebutton.parentNode.style.opacity = 0;
        sharebutton.parentNode.style.display = 'none';

        shareElement.style.opacity = 1;
        shareElement.style.display = 'block';
    }

};

Upload.initHandlers();
