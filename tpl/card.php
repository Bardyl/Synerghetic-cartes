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
    <meta property="og:image" content="http://cartes.synerghetic.net/uploads/<?php echo $cardId; ?>.png" />
</head>
<body id="card">
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
        <div id="app-result" class="open">
            <div id="result">
                <p><img id="resultimg" src="uploads/<?php echo $cardId; ?>.png" alt="" /></p>
                <p onclick="window.location = '/';"><span id="share">Créer ma propre carte !</span></p>
            </div>
        </div>
    </section>
    <script src="js/slideshow.js"></script>
</body>
</html>
