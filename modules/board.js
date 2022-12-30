"use strict";

var mDiv;
var mSlots;

var mBoxSize;
var mScale=1;

var mPanZoom=null;
var root;

function InitBoard(aRoot) {
    root=aRoot;
    var mDiv=document.getElementById("map");

    var box=document.querySelector("#board");
    mBoxSize = {
        x: box.offsetWidth,
        y: box.offsetHeight,
    };

    mPanZoom=panzoom(mDiv, {
        minZoom: 0.12,
        maxZoom: 1,
        zoomDoubleClickSpeed: 1,
        beforeWheel: function (e) {
            // allow wheel-zoom only if altKey is down. Otherwise - ignore
            var shouldIgnore = !e.altKey;
            return shouldIgnore;
        },
    });

    mPanZoom.on("transform", function (e) {
        var t = e.getTransform();
        mBoxSize.x=box.offsetWidth;
        mBoxSize.y=box.offsetHeight;
    });

    //~ onScreenWidthChange();
    resetZoom();

    document.getElementById("board").style.overflow = "hidden";

    let zbutton;
    zbutton = document.getElementById("button-zoom-plus");
    zbutton.addEventListener("mousedown", (e) => startZoomIn());
    zbutton.addEventListener("mouseleave", (e) => stopZoom());
    zbutton.addEventListener("mouseup", (e) => stopZoom());
    zbutton.addEventListener("touchstart", (e) => startZoomIn());
    zbutton.addEventListener("touchend", (e) => stopZoom());
    zbutton = document.getElementById("button-zoom-minus");
    zbutton.addEventListener("mousedown", (e) => startZoomOut());
    zbutton.addEventListener("mouseleave", (e) => stopZoom());
    zbutton.addEventListener("mouseup", (e) => stopZoom());
    zbutton.addEventListener("touchstart", (e) => startZoomOut());
    zbutton.addEventListener("touchend", (e) => stopZoom());
    zbutton = document.getElementById("button-zoom-center");
    zbutton.addEventListener("click", (e) => resetZoom());
    zbutton.addEventListener("touchstart", (e) => resetZoom());
}

var zoomInterval;
function startZoomIn() {
    zoomInterval = setInterval(() => incPanzoom(), 10);
};
function startZoomOut() {
    zoomInterval = setInterval(() => decPanzoom(), 10);
};
function stopZoom() {
    clearInterval(zoomInterval);
};

function resetZoom() {
    let lMap = document.getElementById("board");
    let lJpg = document.getElementById("map-jpg");
    let lScale = 1.1*lMap.offsetHeight/lJpg.offsetHeight;
    mPanZoom.zoomAbs(0, 0, lScale);
    let lZoomY=(lMap.offsetHeight * (1 - lScale)) / 2;
    let lZoomX=0;
    mPanZoom.moveTo(lZoomX, lZoomY);
    let t = mPanZoom.getTransform();
    let lDiff = t.scale * (lJpg.offsetHeight - lMap.offsetHeight);
    mPanZoom.moveBy(0, -lDiff / 2);
};

function decPanzoom(evt) {
    if (mBoxSize == null) return;
    let e = mPanZoom.getTransform();
    if (e == null) return;
    mPanZoom.zoomTo(e.x + mBoxSize.x / 2, e.y + mBoxSize.y / 2, 1 / 1.02);
};

function incPanzoom() {
    if (mBoxSize == null) return;
    let e = mPanZoom.getTransform();
    if (e == null) return;
    mPanZoom.zoomTo(e.x + mBoxSize.x / 2, e.y + mBoxSize.y / 2, 1.02);
};

function RemovePanZoom() {
    if (mPanZoom != null) {
        mPanZoom.zoomTo(0, 0, 0.1);
        setTimeout(function () {
            if (mPanZoom != null) mPanZoom.dispose();
        }, 100);
    }
    document.getElementById("board").style.overflow = "inherit";
};

function addToken(tClass,tPlayer,tValue,mX,mY) {
    var token=dojo.place('<div class="token"/>', "map-tokens");
    var tX;
    var tY;
    if (tClass==0) {
        tX=2;
        tY=46;
    } else if (tClass==1) {
        tX=2;
        tY=132;
        tPlayer=0;
    } else {
        tX=2+(tClass-1)*88;
        tY=46+(tPlayer-1)*86;
    }
    token.style.backgroundPosition="-"+tX+"px -"+tY+"px";
    token.style.left=mX+"px";
    token.style.top=mY+"px";
    if (tClass>0 && tValue!=null) {
        var value=dojo.place('<div class="token-value">'+tValue+'</div>', token);
        value.style.color=[
            'white',
            'cyan',
            'magenta',
            'yellow',
            'blue',
            'red',
            'green'
        ][tPlayer];
    }
    return token
}
