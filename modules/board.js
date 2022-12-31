"use strict";

var mDiv;
var mSlots;

var mBoxSize;
var mScale=1;

var mPanZoom=null;
var root;

var mapPositions = {
  '-1':{
        'borders':{
            '1':[1382,685,90],
        },
  },
  '-2':{
        'borders':{
            '28':[2343,1646,135],
            '29':[2134,1543,90],
            '30':[1976,1362,180],
        },
  },
  '-3':{
        'borders':{
            '26':[3225,1801,135],
            '28':[2700,1189,180],
        },
  },
  '-4':{
        'borders':{
            '17':[4842,2045,90],
            '18':[4542,2056,135],
        },
  },
  '-5':{
        'borders':{
            '15':[5247,3061,135],
            '16':[4941,2671,180],
            '17':[4931,2297,225],
        },
  },
  '-6':{
        'borders':{
            '13':[4260,3570,180],
            '14':[4386,3050,225],
            '15':[4825,3074,135],
        },
  },
  '-7':{
        'borders':{
            '10':[1719,3181,270],
            '11':[3108,3699,315],
            '12':[3642,3738,0],
            '9':[711,2948,270],
        },
  },
  '1':{
        'units':[[1300,1062],[1386,1062]],
        'ships':[[1028,1049],[982,1079],[936,1113]],
        'borders':{
            '2':[1478,1177,45],
        },
  },
  '10':{
        'units':[[1807,2909],[1848,2987]],
        'ships':[[2302,3325],[2384,3337],[2466,3349]],
        'borders':{
            '11':[2722,3682,0],
        },
  },
  '11':{
        'units':[[2854,3519],[2958,3476]],
        'ships':[[2827,3310],[2917,3310],[3007,3310]],
        'borders':{
            '12':[3477,3579,0],
        },
  },
  '12':{
        'units':[[3723,3591],[3770,3662]],
        'ships':[[3751,3380],[3686,3416],[3621,3452]],
        'borders':{
            '13':[3965,3527,30],
        },
  },
  '13':{
        'units':[[4083,3483],[4008,3559]],
        'ships':[[4008,3383],[3963,3344],[3918,3305]],
        'borders':{
            '14':[4158,3429,225],
        },
  },
  '14':{
        'units':[[4212,3108],[4204,3197]],
        'ships':[[4117,3042],[4103,3120],[4089,3198]],
        'borders':{
            '15':[4453,2866,0],
            '17':[4387,2547,315],
            '18':[4278,2651,270],
            '20':[4225,2735,180],
        },
  },
  '15':{
        'units':[[4518,2689],[4603,2721]],
        'borders':{
            '16':[4796,2688,315],
            '17':[4535,2575,270],
        },
  },
  '16':{
        'units':[[4798,2484],[4709,2533]],
        'borders':{
            '17':[4743,2466,225],
        },
  },
  '17':{
        'units':[[4753,2128],[4853,2128]],
        'borders':{
            '18':[4448,2334,180],
        },
  },
  '18':{
        'units':[[4124,2394],[4215,2346]],
        'ships':[[4459,2114],[4407,2174],[4331,2202]],
        'borders':{
            '19':[3982,2562,180],
            '20':[4148,2639,60],
            '22':[4043,2323,270],
        },
  },
  '19':{
        'units':[[3848,2525],[3895,2437]],
        'borders':{
            '20':[3869,2796,90],
            '21':[3842,2625,135],
            '22':[3819,2411,225],
        },
  },
  '2':{
        'units':[[1605,1263],[1667,1329]],
        'ships':[[1597,1151],[1544,1178],[1494,1209]],
        'borders':{
            '3':[1632,1455,135],
            '30':[1854,1472,0],
        },
  },
  '20':{
        'units':[[3623,2884],[3712,2884]],
        'ships':[[4063,2842],[4013,2896],[3963,2950]],
        'borders':{
            '21':[3638,2816,180],
        },
  },
  '21':{
        'units':[[3492,2715],[3585,2715]],
        'ships':[[3275,2724],[3309,2792],[3343,2860]],
        'borders':{
            '22':[3494,2563,315],
            '24':[3320,2531,270],
        },
  },
  '22':{
        'units':[[3566,2509],[3709,2448]],
        'ships':[[3941,2188],[3865,2208],[3789,2228]],
        'borders':{
            '23':[3520,2419,180],
        },
  },
  '23':{
        'units':[[3178,2292],[3272,2299]],
        'ships':[[3497,2324],[3457,2288],[3417,2252]],
        'borders':{
            '24':[3097,2410,135],
            '26':[3108,2258,270],
        },
  },
  '24':{
        'units':[[2844,2370],[2934,2370]],
        'ships':[[2753,2674],[2711,2720],[2669,2766]],
        'borders':{
            '25':[2919,2702,0],
            '26':[2925,2319,135],
            '27':[2751,2374,255],
        },
  },
  '25':{
        'units':[[2959,2561],[3005,2626]],
        'ships':[[2915,2946],[2873,2992],[2831,3038]],
  },
  '26':{
        'units':[[3027,2013],[3134,2013]],
        'ships':[[3507,2040],[3555,1956],[3603,1872]],
        'borders':{
            '27':[2767,2195,180],
            '28':[2793,1991,180],
        },
  },
  '27':{
        'units':[[2475,2095],[2543,2139]],
        'ships':[[2457,2232],[2523,2272],[2585,2320]],
        'borders':{
            '28':[2603,2003,270],
            '31':[2290,1977,180],
        },
  },
  '28':{
        'units':[[2418,1699],[2511,1737]],
        'borders':{
            '29':[2173,1668,225],
            '31':[2267,1834,150],
        },
  },
  '29':{
        'units':[[1979,1629],[2067,1629]],
        'borders':{
            '30':[19898,1660,270],
            '31':[1972,1777,90],
        },
  },
  '3':{
        'units':[[1317,1414],[1408,1451]],
        'ships':[[1166,1273],[1081,1273],[996,1273]],
        'borders':{
            '30':[1689,1665,315],
            '4':[1338,1615,90],
            '5':[1652,1781,90],
        },
  },
  '30':{
        'units':[[1736,1153],[1777,1219]],
        'ships':[[1743,952],[1710,997],[1681,1043]],
  },
  '31':{
        'units':[[2253,2327],[2324,2382]],
        'ships':[[2135,2432],[2209,2480],[2279,2538]],
        'borders':{
            '33':[2405,2773,180],
        },
  },
  '32':{
        'units':[[1865,2524],[1880,2401]],
        'ships':[[1747,2530],[1701,2574],[1657,2620]],
  },
  '33':{
        'units':[[2185,2745],[2276,2745]],
        'ships':[[2351,2940],[2301,2982],[2251,3024]],
  },
  '4':{
        'units':[[1273,1758],[1362,1758]],
        'ships':[[1114,1684],[1081,1733],[1058,1781]],
        'borders':{
            '5':[1380,1960,90],
            '6':[1158,1992,135],
        },
  },
  '5':{
        'units':[[1616,1985],[1667,2049]],
        'ships':[[1481,2102],[1553,2138],[1636,2166]],
        'borders':{
            '29':[1694,1923,315],
            '6':[1341,2111,135],
        },
  },
  '6':{
        'units':[[977,2140],[1040,2209]],
        'ships':[[569,1690],[491,1706],[413,1724]],
        'borders':{
            '7':[682,2183,180],
            '8':[780,2426,180],
        },
  },
  '7':{
        'units':[[443,2237],[539,2237]],
        'ships':[[269,2186],[247,2254],[229,2322]],
        'borders':{
            '8':[465,2408,0],
        },
  },
  '8':{
        'units':[[546,2392],[647,2392]],
        'ships':[[425,2522],[375,2570],[325,2626]],
        'borders':{
            '9':[533,2656,90],
        },
  },
  '9':{
        'units':[[503,2809],[601,2809]],
        'ships':[[1269,2692],[1185,2692],[1101,2692]],
        'borders':{
            '10':[1471,2911,45],
        },
  },
};

function player2color(aPlayer) {
    if (aPlayer=='') {
        return 0
    }
    var playerInfo = root.gamedatas.players[aPlayer];
    var c = playerInfo.color;
    return {
        "ff0000"    : 1,
        "008000"   : 2,
        "0000ff"    : 3,
        "ffa500"    : 4,
        "982fff"    : 6,
        "72c3b1"   : 5,
    }[c]
}

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

    // init troop zones
    root.troopZones={};
    for (var id in mapPositions) {
        if (mapPositions[id].troops != null) {
            root.troopZones[id]=new ebg.zone();
            var z=dojo.place('<div id="troopZone-'+id+'"/>', "map-tokens");
            z.style.left=mapPositions[id].troops[0][0]+"px";
            z.style.top=mapPositions[id].troops[0][1]+"px";
            z.style.width="84px";
            z.style.height="84px";
            root.troopZones[id].create(root, "troopZone-"+id 84, 84);
            root.troopZones[id].setPattern('custom');
            root.troopZones[id].itemIdToCoords=function(i,control_width) {
                if (i==0) {
                    return{x:mapPositions[id].troops[0][0], y:mapPositions[id].troops[0][1], w:84, h:84}
                } else {
                    return{x:mapPositions[id].troops[1][0], y:mapPositions[id].troops[1][1], w:84, h:84}
                }
            }
        }
    }
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

// Tokens

function clearMap() {
    var token=dojo.empty("map-tokens");
};

function addToken(tId,tClass,tPlayer,tValue,tProv,tWeight) {
    var token=dojo.place('<div id="'+tId+'" class="token"/>', "map-tokens");

root.troopZones[tProv].placeInZone(tId,tWeight);

    var tX;
    var tY;
    if (tClass==0) {
        tX=2;
        tY=46;
    } else if (tClass==1) {
        tX=2;
        tY=132;
        tPlayer='';
    } else {
        tX=2+(tClass-1)*88;
        tY=46+(player2color(tPlayer)-1)*86;
    }
    token.style.backgroundPosition="-"+tX+"px -"+tY+"px";
    //~ var mX;
    //~ var mY;
    //~ if (tClass==0) {
        //~ mX=mapPositions[tProv].units[0][0];
        //~ mY=mapPositions[tProv].units[0][1];
    //~ } else if (tClass==4) {
        //~ mX=mapPositions[tProv].ships[tSlot-1][0];
        //~ mY=mapPositions[tProv].ships[tSlot-1][1];
    //~ } else {
        //~ mX=mapPositions[tProv].units[tSlot-1][0];
        //~ mY=mapPositions[tProv].units[tSlot-1][1];
    //~ }
    //~ token.style.left=mX+"px";
    //~ token.style.top=mY+"px";
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
        ][player2color(tPlayer)];
    }
    return token
}

function addBorder(bPlayer,bValue,bFrom,bTo) {
    var border=dojo.place('<div class="borderToken"/>', "map-tokens");
    var bX=354;
    var bY=46+(player2color(bPlayer))*61;
    border.style.backgroundPosition="-"+bX+"px -"+bY+"px";
    var mX=mapPositions[bFrom].borders[bTo][0];
    var mY=mapPositions[bFrom].borders[bTo][1];
    border.style.left=mX+"px";
    border.style.top=mY+"px";
    border.style.transform="rotate("+mapPositions[bFrom].borders[bTo][2]+"deg)";
    if (bValue!=null) {
        var value=dojo.place('<div class="border-value">'+bValue+'</div>', border);
        value.style.color=[
            'white',
            'cyan',
            'magenta',
            'yellow',
            'blue',
            'red',
            'green'
        ][player2color(bPlayer)];
        value.style.transform="rotate("+(-mapPositions[bFrom].borders[bTo][2])+"deg)";
    }
    return border
}

