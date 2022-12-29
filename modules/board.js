"use strict";

var mDiv=document.getElementById("map");
var mSlots;

var mBoxSize;
var mScale=1;

var mPanZoom=null;

var box=document.querySelector("#board");
mBoxSize = {
    x: box.offsetWidth,
    y: box.offsetHeight,
};

var mPanZoom=panzoom(mDiv, {
    minZoom: 0.2,
    maxZoom: 3,
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

self.onScreenWidthChange();
self.resetZoom();

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

self.startZoomIn = function () {
    self.zoomInterval = setInterval(() => incPanzoom(), 10);
};
self.startZoomOut = function () {
    self.zoomInterval = setInterval(() => decPanzoom(), 10);
};
self.stopZoom = function () {
    clearInterval(self.zoomInterval);
};

self.resetZoom = function () {
    let lMap = document.getElementById("board");
    let lJpg = document.getElementById("map-jpg");
    let lScale = 1.1*lMap.offsetHeight/lJpg.offsetHeight;
    mPanZoom.zoomAbs(0, 0, lScale);
    let lZoomX=(lMap.offsetWidth * (1 - lScale)) / 2;
    let lZoomY=(lMap.offsetHeight * (1 - lScale)) / 2;
    mPanZoom.moveTo(lZoomX, lZoomY);
    let t = vPanZoom.getTransform();
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

