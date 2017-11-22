<!--

var TimeOut         = 50;
var currentLayer    = null;
var currentitem     = null;
var currentLayerNum = 0;
var noClose         = 0;
var closeTimer      = null;

// Open Hidden Layer

function mopen(n)
{
    var l  = document.getElementById("menu" + n);
    var mm = document.getElementById("mmenu" + n);

    if (l) {
        mcancelclosetime();
        l.style.visibility='visible';

        if (currentLayer && (currentLayerNum != n)) {
            currentLayer.style.visibility = 'hidden';
        }

        currentLayer    = l;
        currentitem     = mm;
        currentLayerNum = n;
    } else if (currentLayer) {
        currentLayer.style.visibility = 'hidden';
        currentLayerNum = 0;
        currentitem = null;
        currentLayer = null;
    }
}


// Turn On Close Timer

function mclosetime()
{
    closeTimer = window.setTimeout(mclose, TimeOut);
}


// Cancel Close Timer

function mcancelclosetime()
{
    if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
    }
}


// Close Showed Layer

function mclose() {
    if (currentLayer && noClose!=1) {
        currentLayer.style.visibility = 'hidden';
        currentLayerNum = 0;
        currentLayer = null;
        currentitem = null;
    } else {
        noClose = 0;
    }

    currentLayer = null;
    currentitem = null;
}


// Close Layer Then Click-out

document.onclick = mclose; 


// -->