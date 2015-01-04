function popupWindow(source, strWindowToOpen, width, height){
    var leftPosition, topPosition;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);

    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    window.open(strWindowToOpen, '', windowFeatures);
}

function twitterIntentify(text, url) {
    var encoded_text = encodeURIComponent(text);
    var encoded_url = encodeURIComponent(url);
    return 'https://twitter.com/intent/tweet?text=' + encoded_text + '&url=' + encoded_url;
}