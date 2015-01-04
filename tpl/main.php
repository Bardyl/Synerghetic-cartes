<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <title>Synerg'hetic | Devenez un enfant du web !</title>
    <link rel="stylesheet" href="css/main.css" />
    <link rel="icon" type="image/png" href="img/favicon.png" />
    <meta name="description" content="À l’occasion des fêtes de fin d’année, devenez un enfant du Web avec Synerg'hetic !" />
    <meta property="og:title" content="Synerg'hetic | Les enfants du Web !" />
    <meta property="og:description" content="À l’occasion des fêtes de fin d’année, devenez un enfant du Web avec Synerg'hetic !" />
    <meta property="og:image" content="http://cartes.synerghetic.net/img/s_website.png" />
</head>
<body>
    <section id="preloading">
        <span id="loading-bar"></span>
        <p>
            <video id="video-loader" loop autoplay>
                <source src="data/video/synerghetic.mp4" type="video/mp4">
                <source src="data/video/synerghetic.ogv" type="video/ogg">
            </video><br />
            <span id="preload-percentage"></span>
        </p>
    </section>
    <section id="left">
        <h1>
            À l’occasion des fêtes de fin d’année, <strong>devenez un enfant du Web !</strong>
        </h1>
        <aside>
            <div id="slideshow">
                <div id="leftArr" class="slider-left-arr"></div>
                <div id="member-image" class="slider-center"></div>
                <div id="rightArr" class="slider-right-arr"></div>
            </div>
            <div>
                <p id="member-name"></p>
                <p id="member-role"></p>
            </div>
        </aside>
        <footer>
            <p>
                <img src="img/logo.png" alt="" />
            </p>
            <p>
                <a href="http://facebook.com/synerghetic.je" target="_blank"><img src="img/s_facebook.png" alt="" /></a><!--
                --><a href="http://twitter.com/synerghetic" target="_blank"><img src="img/s_twitter.png" alt="" /></a><!--
                --><a href="http://synerghetic.net" target="_blank"><img src="img/s_website.png" alt="" /></a><!--
                --><a href="http://instagram.com/synerghetic" target="_blank"><img src="img/s_instagram.png" alt="" /></a><!--
                --><a href="https://vine.co/u/947627977666129920" target="_blank"><img src="img/s_vine.png" alt="" /></a>
            </p>
        </footer>
    </section>
    <section id="right">
        <div id="app-left">
            <div class="app-info left">
                <p>
                    <strong>Importez</strong> une image de vous enfant !
                </p>
                <span id="inputFile">Importer ma photo</span>
                <input type="file" id="trueInputFile" />
                <p id="app-info-left-error" class="error"></p>
            </div>
        </div><!--
        --><div id="app-center">
            <div id="center-box">
                <span id="upload-percentage"></span>
            </div>
            <div id="loader"></div>
        </div><!--
        --><div id="app-right">
            <div class="app-info right">
                <p id="app-info-right-error" class="error">
                    Une erreur est survenue, <strong>impossible de traiter cette image</strong>.<br />
                    Merci de <strong>réessayer</strong> ou de <strong>sélectionner une autre image</strong>.
                </p>
                <p>
                    <strong>Cliquez</strong> sur le bouton et admirez le résultat !
                </p>
                <span id="uploadButton">C'est parti !</span>
            </div>
        </div>
        <div id="app-result">
            <div id="progress">
                <p>Carte en cours de <strong>création...</strong></p>
                <p><img id="progress-synergify" src="" alt="" /></p>
            </div>
            <div id="result">
                <p><img id="resultimg" src="" alt="" /></p>
                <div id="share-share">
                    <p>Lien direct vers la carte : </p>
                    <p><input id="getURL" onclick="this.select();" type="text" value="" /></p>
                    <p>
                        Partager sur les réseaux sociaux :
                    </p>
                    <p>
                        <a href="" id="share-facebook"><img src="img/facebook.png" alt="" /></a><!--
                        --><a href="" id="share-twitter"><img src="img/twitter.png" alt="" /></a>
                    </p>
                </div>
                <p><span id="share">Partager !</span></p>
            </div>
        </div>
    </section>
    <script src="js/preload.js"></script>
    <script src="js/main.js"></script>
    <script src="js/slideshow.js"></script>
    <script src="js/share.js"></script>
</body>
</html>
