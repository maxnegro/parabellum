"use strict";

var Board = (function () {
    // ****************
    // ***** Init *****
    // ****************

    var self = {};
    self.root;

    var mDiv;
    var box;
    var mBoxSize;
    self.PanZoom=null;

    self.Init = function (pRoot) {
        this.root = aRoot;
        vDiv = document.getElementById("map");
        // PanZoom
        mDiv=document.getElementById("map");
        box=document.querySelector("#board");
        mBoxSize = {
            x: box.offsetWidth,
            y: box.offsetHeight,
        };
        this.InitPanZoom();
        this.provinces={
            '1':{
                'name':       'Britannia',
                'support':    1,
                'slot':       {'x':1276, 'y':1062, 'dir':'H'},
                'docks':      {
                    '1':{
                        'slot':       {'x':1502, 'y':1090},
                    },
                    '2':{
                        'slot':       {'x':1207, 'y':1047},
                    },
                },
                'borders':      {
                    '2':{
                        'slot':       {'x':1515, 'y':1184, 'angle':45},
                    },
                },
            },
            '2':{
                'name':       'Belgica',
                'support':    2,
                'slot':       {'x':1581, 'y':1263, 'dir':'D'},
                'docks':      {
                    '1':{
                        'slot':       {'x':1600, 'y':1196},
                    },
                },
                'borders':      {
                    '1':{
                        'slot':       {'x':1515, 'y':1184, 'angle':225},
                    },
                    '3':{
                        'slot':       {'x':1669, 'y':1462, 'angle':135},
                    },
                    '30':{
                        'slot':       {'x':1891, 'y':1479, 'angle':0},
                    },
                },
            },
            '3':{
                'name':       'Lugdunensis',
                'support':    3,
                'slot':       {'x':1293, 'y':1414, 'dir':'D'},
                'docks':      {
                    '1':{
                        'slot':       {'x':1354, 'y':1336},
                    },
                },
                'borders':      {
                    '2':{
                        'slot':       {'x':1669, 'y':1462, 'angle':315},
                    },
                    '4':{
                        'slot':       {'x':1375, 'y':1622, 'angle':90},
                    },
                    '5':{
                        'slot':       {'x':1689, 'y':1788, 'angle':90},
                    },
                    '29':{
                        'slot':       {'x':1758, 'y':1758, 'angle':0},
                    },
                    '30':{
                        'slot':       {'x':1726, 'y':1672, 'angle':315},
                    },
                },
            },
            '4':{
                'name':       'Aquitania',
                'support':    2,
                'slot':       {'x':1249, 'y':1758, 'dir':'H'},
                'docks':      {
                    '2':{
                        'slot':       {'x':1149, 'y':1721},
                    },
                },
                'borders':      {
                    '3':{
                        'slot':       {'x':1375, 'y':1622, 'angle':270},
                    },
                    '5':{
                        'slot':       {'x':1417, 'y':1967, 'angle':90},
                    },
                    '6':{
                        'slot':       {'x':1195, 'y':1999, 'angle':135},
                    },
                },
            },
            '5':{
                'name':       'Narbonensis',
                'support':    3,
                'slot':       {'x':1592, 'y':1985, 'dir':'D'},
                'docks':      {
                    '4':{
                        'slot':       {'x':1563, 'y':2050},
                    },
                    '5':{
                        'slot':       {'x':1747, 'y':2091},
                    },
                },
                'borders':      {
                    '3':{
                        'slot':       {'x':1689, 'y':1788, 'angle':270},
                    },
                    '4':{
                        'slot':       {'x':1417, 'y':1967, 'angle':270},
                    },
                    '6':{
                        'slot':       {'x':1378, 'y':2118, 'angle':135},
                    },
                    '29':{
                        'slot':       {'x':1731, 'y':1930, 'angle':315},
                    },
                    '31':{
                        'slot':       {'x':1817, 'y':2073, 'angle':0},
                    },
                },
            },
            '6':{
                'name':       'Tarraconensis',
                'support':    3,
                'slot':       {'x':953, 'y':2140, 'dir':'D'},
                'docks':      {
                    '2':{
                        'slot':       {'x':952, 'y':1906},
                    },
                    '4':{
                        'slot':       {'x':1237, 'y':2252},
                    },
                },
                'borders':      {
                    '4':{
                        'slot':       {'x':1195, 'y':1999, 'angle':315},
                    },
                    '5':{
                        'slot':       {'x':1378, 'y':2118, 'angle':315},
                    },
                    '7':{
                        'slot':       {'x':719, 'y':2190, 'angle':180},
                    },
                    '8':{
                        'slot':       {'x':817, 'y':2433, 'angle':180},
                    },
                },
            },
            '7':{
                'name':       'Lusitania',
                'support':    2,
                'slot':       {'x':419, 'y':2237, 'dir':'H'},
                'docks':      {
                    '3':{
                        'slot':       {'x':300, 'y':2219},
                    },
                },
                'borders':      {
                    '6':{
                        'slot':       {'x':719, 'y':2190, 'angle':0},
                    },
                    '8':{
                        'slot':       {'x':502, 'y':2415, 'angle':0},
                    },
                },
            },
            '8':{
                'name':       'Baetica',
                'support':    2,
                'slot':       {'x':522, 'y':2392, 'dir':'H'},
                'docks':      {
                    '3':{
                        'slot':       {'x':475, 'y':2527},
                    },
                    '4':{
                        'slot':       {'x':785, 'y':2638},
                    },
                },
                'borders':      {
                    '6':{
                        'slot':       {'x':817, 'y':2433, 'angle':0},
                    },
                    '7':{
                        'slot':       {'x':502, 'y':2415, 'angle':180},
                    },
                    '9':{
                        'slot':       {'x':570, 'y':2663, 'angle':90},
                    },
                },
            },
            '9':{
                'name':       'Mauretania',
                'support':    2,
                'slot':       {'x':479, 'y':2809, 'dir':'H'},
                'docks':      {
                    '3':{
                        'slot':       {'x':460, 'y':2683},
                    },
                    '4':{
                        'slot':       {'x':1237, 'y':2751},
                    },
                },
                'borders':      {
                    '8':{
                        'slot':       {'x':570, 'y':2663, 'angle':270},
                    },
                    '10':{
                        'slot':       {'x':1508, 'y':2918, 'angle':45},
                    },
                },
            },
            '10':{
                'name':       'Africa Proconsularis',
                'support':    2,
                'slot':       {'x':1783, 'y':2909, 'dir':'D'},
                'docks':      {
                    '6':{
                        'slot':       {'x':1898, 'y':2859},
                    },
                },
                'borders':      {
                    '9':{
                        'slot':       {'x':1508, 'y':2918, 'angle':225},
                    },
                    '11':{
                        'slot':       {'x':2759, 'y':3689, 'angle':0},
                    },
                },
            },
            '11':{
                'name':       'Cyrenaica et Creta',
                'support':    2,
                'slot':       {'x':2830, 'y':3519, 'dir':'H'},
                'docks':      {
                    '6':{
                        'slot':       {'x':2842, 'y':3360},
                    },
                },
                'borders':      {
                    '10':{
                        'slot':       {'x':2759, 'y':3689, 'angle':180},
                    },
                    '12':{
                        'slot':       {'x':3514, 'y':3586, 'angle':0},
                    },
                },
            },
            '12':{
                'name':       'Aegyptus',
                'support':    2,
                'slot':       {'x':3699, 'y':3591, 'dir':'D'},
                'docks':      {
                    '9':{
                        'slot':       {'x':3700, 'y':3500},
                    },
                },
                'borders':      {
                    '11':{
                        'slot':       {'x':3514, 'y':3586, 'angle':180},
                    },
                    '13':{
                        'slot':       {'x':4002, 'y':3534, 'angle':30},
                    },
                },
            },
            '13':{
                'name':       'Arabia Petraea',
                'support':    2,
                'slot':       {'x':4059, 'y':3483, 'dir':'V'},
                'docks':      {
                    '9':{
                        'slot':       {'x':4003, 'y':3438},
                    },
                },
                'borders':      {
                    '12':{
                        'slot':       {'x':4002, 'y':3534, 'angle':210},
                    },
                    '14':{
                        'slot':       {'x':4195, 'y':3436, 'angle':225},
                    },
                },
            },
            '14':{
                'name':       'Syria et Iudaea',
                'support':    3,
                'slot':       {'x':4188, 'y':3108, 'dir':'V'},
                'docks':      {
                    '9':{
                        'slot':       {'x':4160, 'y':3059},
                    },
                },
                'borders':      {
                    '13':{
                        'slot':       {'x':4195, 'y':3436, 'angle':45},
                    },
                    '15':{
                        'slot':       {'x':4490, 'y':2873, 'angle':0},
                    },
                    '17':{
                        'slot':       {'x':4424, 'y':2554, 'angle':315},
                    },
                    '18':{
                        'slot':       {'x':4315, 'y':2658, 'angle':270},
                    },
                    '20':{
                        'slot':       {'x':4262, 'y':2742, 'angle':180},
                    },
                },
            },
            '15':{
                'name':       'Mesopotamia',
                'support':    2,
                'slot':       {'x':4494, 'y':2689, 'dir':'H'},
                'docks':      {
                },
                'borders':      {
                    '14':{
                        'slot':       {'x':4490, 'y':2873, 'angle':180},
                    },
                    '16':{
                        'slot':       {'x':4833, 'y':2695, 'angle':315},
                    },
                    '17':{
                        'slot':       {'x':4572, 'y':2582, 'angle':270},
                    },
                },
            },
            '16':{
                'name':       'Assyria',
                'support':    2,
                'slot':       {'x':4774, 'y':2484, 'dir':'H'},
                'docks':      {
                },
                'borders':      {
                    '15':{
                        'slot':       {'x':4833, 'y':2695, 'angle':135},
                    },
                    '17':{
                        'slot':       {'x':4780, 'y':2473, 'angle':225},
                    },
                },
            },
            '17':{
                'name':       'Armenia',
                'support':    2,
                'slot':       {'x':4729, 'y':2128, 'dir':'H'},
                'docks':      {
                },
                'borders':      {
                    '14':{
                        'slot':       {'x':4424, 'y':2554, 'angle':135},
                    },
                    '15':{
                        'slot':       {'x':4572, 'y':2582, 'angle':90},
                    },
                    '16':{
                        'slot':       {'x':4780, 'y':2473, 'angle':45},
                    },
                    '18':{
                        'slot':       {'x':4485, 'y':2341, 'angle':180},
                    },
                },
            },
            '18':{
                'name':       'Cappadocia',
                'support':    3,
                'slot':       {'x':4100, 'y':2394, 'dir':'H'},
                'docks':      {
                    '11':{
                        'slot':       {'x':4292, 'y':2256},
                    },
                },
                'borders':      {
                    '14':{
                        'slot':       {'x':4315, 'y':2658, 'angle':90},
                    },
                    '17':{
                        'slot':       {'x':4485, 'y':2341, 'angle':0},
                    },
                    '19':{
                        'slot':       {'x':4019, 'y':2569, 'angle':180},
                    },
                    '20':{
                        'slot':       {'x':4185, 'y':2646, 'angle':60},
                    },
                    '22':{
                        'slot':       {'x':4080, 'y':2330, 'angle':270},
                    },
                },
            },
            '19':{
                'name':       'Galatia',
                'support':    3,
                'slot':       {'x':3824, 'y':2525, 'dir':'V'},
                'docks':      {
                },
                'borders':      {
                    '18':{
                        'slot':       {'x':4019, 'y':2569, 'angle':0},
                    },
                    '20':{
                        'slot':       {'x':3906, 'y':2803, 'angle':90},
                    },
                    '21':{
                        'slot':       {'x':3879, 'y':2632, 'angle':135},
                    },
                    '22':{
                        'slot':       {'x':3856, 'y':2418, 'angle':225},
                    },
                },
            },
            '20':{
                'name':       'Lycia et Cilicia',
                'support':    3,
                'slot':       {'x':3599, 'y':2884, 'dir':'H'},
                'docks':      {
                    '9':{
                        'slot':       {'x':3706, 'y':2855},
                    },
                },
                'borders':      {
                    '14':{
                        'slot':       {'x':4262, 'y':2742, 'angle':0},
                    },
                    '18':{
                        'slot':       {'x':4185, 'y':2646, 'angle':240},
                    },
                    '19':{
                        'slot':       {'x':3906, 'y':2803, 'angle':270},
                    },
                    '21':{
                        'slot':       {'x':3675, 'y':2823, 'angle':180},
                    },
                },
            },
            '21':{
                'name':       'Asia',
                'support':    3,
                'slot':       {'x':3468, 'y':2715, 'dir':'H'},
                'docks':      {
                    '10':{
                        'slot':       {'x':3355, 'y':2751},
                    },
                },
                'borders':      {
                    '19':{
                        'slot':       {'x':3879, 'y':2632, 'angle':315},
                    },
                    '20':{
                        'slot':       {'x':3675, 'y':2823, 'angle':0},
                    },
                    '22':{
                        'slot':       {'x':3531, 'y':2570, 'angle':315},
                    },
                    '24':{
                        'slot':       {'x':3357, 'y':2538, 'angle':270},
                    },
                },
            },
            '22':{
                'name':       'Bithynia et Pontus',
                'support':    3,
                'slot':       {'x':3542, 'y':2509, 'dir':'H'},
                'docks':      {
                    '11':{
                        'slot':       {'x':3601, 'y':2385},
                    },
                },
                'borders':      {
                    '18':{
                        'slot':       {'x':4080, 'y':2330, 'angle':90},
                    },
                    '19':{
                        'slot':       {'x':3856, 'y':2418, 'angle':45},
                    },
                    '21':{
                        'slot':       {'x':3531, 'y':2570, 'angle':135},
                    },
                    '23':{
                        'slot':       {'x':3557, 'y':2426, 'angle':180},
                    },
                },
            },
            '23':{
                'name':       'Thracia',
                'support':    2,
                'slot':       {'x':3154, 'y':2292, 'dir':'H'},
                'docks':      {
                    '11':{
                        'slot':       {'x':3425, 'y':2339},
                    },
                },
                'borders':      {
                    '22':{
                        'slot':       {'x':3557, 'y':2426, 'angle':0},
                    },
                    '24':{
                        'slot':       {'x':3134, 'y':2417, 'angle':135},
                    },
                    '26':{
                        'slot':       {'x':3145, 'y':2265, 'angle':270},
                    },
                },
            },
            '24':{
                'name':       'Macedonia et Epirus',
                'support':    3,
                'slot':       {'x':2820, 'y':2370, 'dir':'H'},
                'docks':      {
                    '8':{
                        'slot':       {'x':2798, 'y':2661},
                    },
                    '10':{
                        'slot':       {'x':3086, 'y':2523},
                    },
                },
                'borders':      {
                    '21':{
                        'slot':       {'x':3357, 'y':2538, 'angle':90},
                    },
                    '23':{
                        'slot':       {'x':3134, 'y':2417, 'angle':315},
                    },
                    '25':{
                        'slot':       {'x':2956, 'y':2709, 'angle':0},
                    },
                    '26':{
                        'slot':       {'x':2962, 'y':2326, 'angle':135},
                    },
                    '27':{
                        'slot':       {'x':2788, 'y':2381, 'angle':255},
                    },
                },
            },
            '25':{
                'name':       'Achaia',
                'support':    1,
                'slot':       {'x':2935, 'y':2561, 'dir':'D'},
                'docks':      {
                    '8':{
                        'slot':       {'x':2861, 'y':2788},
                    },
                    '10':{
                        'slot':       {'x':3022, 'y':2657},
                    },
                },
                'borders':      {
                    '24':{
                        'slot':       {'x':2956, 'y':2709, 'angle':180},
                    },
                },
            },
            '26':{
                'name':       'Moesia',
                'support':    3,
                'slot':       {'x':3003, 'y':2013, 'dir':'H'},
                'docks':      {
                    '11':{
                        'slot':       {'x':3431, 'y':2160},
                    },
                },
                'borders':      {
                    '23':{
                        'slot':       {'x':3145, 'y':2265, 'angle':90},
                    },
                    '24':{
                        'slot':       {'x':2962, 'y':2326, 'angle':315},
                    },
                    '27':{
                        'slot':       {'x':2804, 'y':2202, 'angle':180},
                    },
                    '28':{
                        'slot':       {'x':2830, 'y':1998, 'angle':180},
                    },
                },
            },
            '27':{
                'name':       'Dalmatia',
                'support':    2,
                'slot':       {'x':2451, 'y':2095, 'dir':'D'},
                'docks':      {
                    '7':{
                        'slot':       {'x':2479, 'y':2201},
                    },
                },
                'borders':      {
                    '24':{
                        'slot':       {'x':2788, 'y':2381, 'angle':75},
                    },
                    '26':{
                        'slot':       {'x':2804, 'y':2202, 'angle':0},
                    },
                    '28':{
                        'slot':       {'x':2640, 'y':2010, 'angle':270},
                    },
                    '31':{
                        'slot':       {'x':2327, 'y':1984, 'angle':180},
                    },
                },
            },
            '28':{
                'name':       'Pannonia',
                'support':    3,
                'slot':       {'x':2394, 'y':1699, 'dir':'H'},
                'docks':      {
                },
                'borders':      {
                    '26':{
                        'slot':       {'x':2830, 'y':1998, 'angle':0},
                    },
                    '27':{
                        'slot':       {'x':2640, 'y':2010, 'angle':90},
                    },
                    '29':{
                        'slot':       {'x':2210, 'y':1675, 'angle':225},
                    },
                    '31':{
                        'slot':       {'x':2304, 'y':1841, 'angle':150},
                    },
                },
            },
            '29':{
                'name':       'Raetia',
                'support':    3,
                'slot':       {'x':1955, 'y':1629, 'dir':'H'},
                'docks':      {
                },
                'borders':      {
                    '3':{
                        'slot':       {'x':1758, 'y':1758, 'angle':180},
                    },
                    '5':{
                        'slot':       {'x':1731, 'y':1930, 'angle':135},
                    },
                    '28':{
                        'slot':       {'x':2210, 'y':1675, 'angle':45},
                    },
                    '30':{
                        'slot':       {'x':19935, 'y':1667, 'angle':270},
                    },
                    '31':{
                        'slot':       {'x':2009, 'y':1784, 'angle':90},
                    },
                },
            },
            '30':{
                'name':       'Germania',
                'support':    3,
                'slot':       {'x':1712, 'y':1153, 'dir':'D'},
                'docks':      {
                    '1':{
                        'slot':       {'x':1678, 'y':1116},
                    },
                },
                'borders':      {
                    '2':{
                        'slot':       {'x':1891, 'y':1479, 'angle':180},
                    },
                    '3':{
                        'slot':       {'x':1726, 'y':1672, 'angle':135},
                    },
                    '29':{
                        'slot':       {'x':19935, 'y':1667, 'angle':90},
                    },
                },
            },
            '31':{
                'name':       'Italia',
                'support':    3,
                'slot':       {'x':2229, 'y':2327, 'dir':'D'},
                'docks':      {
                    '5':{
                        'slot':       {'x':2117, 'y':2342},
                    },
                    '7':{
                        'slot':       {'x':2146, 'y':1990},
                    },
                    '8':{
                        'slot':       {'x':2516, 'y':2517},
                    },
                },
                'borders':      {
                    '5':{
                        'slot':       {'x':1817, 'y':2073, 'angle':180},
                    },
                    '27':{
                        'slot':       {'x':2327, 'y':1984, 'angle':0},
                    },
                    '28':{
                        'slot':       {'x':2304, 'y':1841, 'angle':330},
                    },
                    '29':{
                        'slot':       {'x':2009, 'y':1784, 'angle':270},
                    },
                    '33':{
                        'slot':       {'x':2442, 'y':2780, 'angle':180},
                    },
                },
            },
            '32':{
                'name':       'Corsica et Sardinia',
                'support':    1,
                'slot':       {'x':1841, 'y':2524, 'dir':'V'},
                'docks':      {
                    '4':{
                        'slot':       {'x':1795, 'y':2517},
                    },
                    '5':{
                        'slot':       {'x':1897, 'y':2314},
                    },
                },
                'borders':      {
                },
            },
            '33':{
                'name':       'Sicilia',
                'support':    1,
                'slot':       {'x':2161, 'y':2745, 'dir':'H'},
                'docks':      {
                    '5':{
                        'slot':       {'x':2132, 'y':2728},
                    },
                    '6':{
                        'slot':       {'x':2336, 'y':2891},
                    },
                },
                'borders':      {
                    '31':{
                        'slot':       {'x':2442, 'y':2780, 'angle':0},
                    },
                },
            },
        };
        this.seas={
            '1':{
                'name':       'Mare Germanicum',
                'slot':       {'x':2100, 'y':1646, 'dir':'E'},
                'docks':      {
                    '1':{
                        'slot':       {'x':1502, 'y':1090},
                    },
                    '2':{
                        'slot':       {'x':1600, 'y':1196},
                    },
                    '3':{
                        'slot':       {'x':1354, 'y':1336},
                    },
                    '30':{
                        'slot':       {'x':1678, 'y':1116},
                    },
                },
            },
            '2':{
                'name':       'Mare Gallicum',
                'slot':       {'x':1400, 'y':2596, 'dir':'E'},
                'docks':      {
                    '1':{
                        'slot':       {'x':1207, 'y':1047},
                    },
                    '4':{
                        'slot':       {'x':1149, 'y':1721},
                    },
                    '6':{
                        'slot':       {'x':952, 'y':1906},
                    },
                },
            },
            '3':{
                'name':       'Oceanus',
                'slot':       {'x':2050, 'y':2366, 'dir':'E'},
                'docks':      {
                    '7':{
                        'slot':       {'x':300, 'y':2219},
                    },
                    '8':{
                        'slot':       {'x':475, 'y':2527},
                    },
                    '9':{
                        'slot':       {'x':460, 'y':2683},
                    },
                },
            },
            '4':{
                'name':       'Mare Hispanicum',
                'slot':       {'x':3370, 'y':2046, 'dir':'E'},
                'docks':      {
                    '5':{
                        'slot':       {'x':1563, 'y':2050},
                    },
                    '6':{
                        'slot':       {'x':1237, 'y':2252},
                    },
                    '8':{
                        'slot':       {'x':785, 'y':2638},
                    },
                    '9':{
                        'slot':       {'x':1237, 'y':2751},
                    },
                    '32':{
                        'slot':       {'x':1795, 'y':2517},
                    },
                },
            },
            '5':{
                'name':       'Mare Tyrrhenum',
                'slot':       {'x':3950, 'y':2278, 'dir':'E'},
                'docks':      {
                    '5':{
                        'slot':       {'x':1747, 'y':2091},
                    },
                    '31':{
                        'slot':       {'x':2117, 'y':2342},
                    },
                    '32':{
                        'slot':       {'x':1897, 'y':2314},
                    },
                    '33':{
                        'slot':       {'x':2132, 'y':2728},
                    },
                },
            },
            '6':{
                'name':       'Mare Siculum',
                'slot':       {'x':3320, 'y':2486, 'dir':'E'},
                'docks':      {
                    '10':{
                        'slot':       {'x':1898, 'y':2859},
                    },
                    '11':{
                        'slot':       {'x':2842, 'y':3360},
                    },
                    '33':{
                        'slot':       {'x':2336, 'y':2891},
                    },
                },
            },
            '7':{
                'name':       'Mare Adriaticum',
                'slot':       {'x':3460, 'y':1536, 'dir':'E'},
                'docks':      {
                    '27':{
                        'slot':       {'x':2479, 'y':2201},
                    },
                    '31':{
                        'slot':       {'x':2146, 'y':1990},
                    },
                },
            },
            '8':{
                'name':       'Mare Ionium',
                'slot':       {'x':3500, 'y':1776, 'dir':'E'},
                'docks':      {
                    '24':{
                        'slot':       {'x':2798, 'y':2661},
                    },
                    '25':{
                        'slot':       {'x':2861, 'y':2788},
                    },
                    '31':{
                        'slot':       {'x':2516, 'y':2517},
                    },
                },
            },
            '9':{
                'name':       'Mare Orientale',
                'slot':       {'x':4500, 'y':2166, 'dir':'E'},
                'docks':      {
                    '12':{
                        'slot':       {'x':3700, 'y':3500},
                    },
                    '13':{
                        'slot':       {'x':4003, 'y':3438},
                    },
                    '14':{
                        'slot':       {'x':4160, 'y':3059},
                    },
                    '20':{
                        'slot':       {'x':3706, 'y':2855},
                    },
                },
            },
            '10':{
                'name':       'Mare Aegeum',
                'slot':       {'x':4060, 'y':1936, 'dir':'E'},
                'docks':      {
                    '21':{
                        'slot':       {'x':3355, 'y':2751},
                    },
                    '24':{
                        'slot':       {'x':3086, 'y':2523},
                    },
                    '25':{
                        'slot':       {'x':3022, 'y':2657},
                    },
                },
            },
            '11':{
                'name':       'Pontus Euxinus',
                'slot':       {'x':3130, 'y':1696, 'dir':'E'},
                'docks':      {
                    '18':{
                        'slot':       {'x':4292, 'y':2256},
                    },
                    '22':{
                        'slot':       {'x':3601, 'y':2385},
                    },
                    '23':{
                        'slot':       {'x':3425, 'y':2339},
                    },
                    '26':{
                        'slot':       {'x':3431, 'y':2160},
                    },
                },
            },
        };
        this.barbarians={
            '1':{
                'name':       'Hibernia et Caledonia',
                'slot':       {'x':1380, 'y':500},
                'attack':     {
                    '1':{
                        'slot':       {'x':1419, 'y':692, 'angle':90},
                    },
                },
            },
            '2':{
                'name':       'Germania Magna',
                'slot':       {'x':2370, 'y':1320},
                'attack':     {
                    '28':{
                        'slot':       {'x':2380, 'y':1653, 'angle':135},
                    },
                    '29':{
                        'slot':       {'x':2171, 'y':1550, 'angle':90},
                    },
                    '30':{
                        'slot':       {'x':2013, 'y':1369, 'angle':180},
                    },
                },
            },
            '3':{
                'name':       'Sarmatia',
                'slot':       {'x':3300, 'y':1400},
                'attack':     {
                    '26':{
                        'slot':       {'x':3262, 'y':1808, 'angle':135},
                    },
                    '28':{
                        'slot':       {'x':2737, 'y':1196, 'angle':180},
                    },
                },
            },
            '4':{
                'name':       'Iberia',
                'slot':       {'x':4600, 'y':1800},
                'attack':     {
                    '17':{
                        'slot':       {'x':4879, 'y':2052, 'angle':90},
                    },
                    '18':{
                        'slot':       {'x':4579, 'y':2063, 'angle':135},
                    },
                },
            },
            '5':{
                'name':       'Regnum Parthicum',
                'slot':       {'x':5300, 'y':2650},
                'attack':     {
                    '15':{
                        'slot':       {'x':5284, 'y':3068, 'angle':135},
                    },
                    '16':{
                        'slot':       {'x':4978, 'y':2678, 'angle':180},
                    },
                    '17':{
                        'slot':       {'x':4968, 'y':2304, 'angle':225},
                    },
                },
            },
            '6':{
                'name':       'Arabia',
                'slot':       {'x':4800, 'y':3300},
                'attack':     {
                    '13':{
                        'slot':       {'x':4297, 'y':3577, 'angle':180},
                    },
                    '14':{
                        'slot':       {'x':4423, 'y':3057, 'angle':225},
                    },
                    '15':{
                        'slot':       {'x':4862, 'y':3081, 'angle':135},
                    },
                },
            },
            '7':{
                'name':       'Gaetulia',
                'slot':       {'x':1300, 'y':3600},
                'attack':     {
                    '9':{
                        'slot':       {'x':748, 'y':2955, 'angle':270},
                    },
                    '10':{
                        'slot':       {'x':1756, 'y':3188, 'angle':270},
                    },
                    '11':{
                        'slot':       {'x':3145, 'y':3706, 'angle':315},
                    },
                    '12':{
                        'slot':       {'x':3679, 'y':3745, 'angle':0},
                    },
                },
            },
        };
    };

    self.player2color=function(aPlayer) {
        if (aPlayer=='') {
            return 0
        }
        var playerInfo = this.root.gamedatas.players[aPlayer];
        var c = playerInfo.color;
        return {
            "ff0000"    : 1,
            "008000"   : 2,
            "0000ff"    : 3,
            "ffa500"    : 4,
            "982fff"    : 6,
            "72c3b1"   : 5,
        }[c]
    };

    self.InitPanZoom=function() {
        self.PanZoom=panzoom(mDiv, {
            minZoom: 0.12,
            maxZoom: 1,
            zoomDoubleClickSpeed: 1,
            beforeWheel: function (e) {
                // allow wheel-zoom only if altKey is down. Otherwise - ignore
                var shouldIgnore = !e.altKey;
                return shouldIgnore;
            },
        });

        self.PanZoom.on("transform", function (e) {
            var t = e.getTransform();
            mBoxSize.x=box.offsetWidth;
            mBoxSize.y=box.offsetHeight;
        });

        //~ onScreenWidthChange();
        self.resetZoom();

        document.getElementById("board").style.overflow = "hidden";

        let zbutton;
        zbutton = document.getElementById("button-zoom-plus");
        zbutton.addEventListener("mousedown", (e) => this.startZoomIn());
        zbutton.addEventListener("mouseleave", (e) => this.stopZoom());
        zbutton.addEventListener("mouseup", (e) => this.stopZoom());
        zbutton.addEventListener("touchstart", (e) => this.startZoomIn());
        zbutton.addEventListener("touchend", (e) => this.stopZoom());
        zbutton = document.getElementById("button-zoom-minus");
        zbutton.addEventListener("mousedown", (e) => this.startZoomOut());
        zbutton.addEventListener("mouseleave", (e) => this.stopZoom());
        zbutton.addEventListener("mouseup", (e) => this.stopZoom());
        zbutton.addEventListener("touchstart", (e) => this.startZoomOut());
        zbutton.addEventListener("touchend", (e) => this.stopZoom());
        zbutton = document.getElementById("button-zoom-center");
        zbutton.addEventListener("click", (e) => this.resetZoom());
        zbutton.addEventListener("touchstart", (e) => this.resetZoom());

        // init troop zones
        self.root.troopZones={};
        for (var id in this.provinces) {
            self.root.troopZones[id]=new ebg.zone();
            var z=dojo.place('<div id="troopZone-'+id+'"/>', "map-tokens");
            z.style.left=this.provinces[id].slot.x+"px";
            z.style.top=this.provinces[id].slot.y+"px";
            z.style.position="absolute";
            self.root.troopZones[id].create(self.root, "troopZone-"+id, 84, 84);
            switch (this.provinces[id].slot.dir) {
                case 'H':
                    z.className="troopZoneH";
                    z.style.maxWidth="200px";
                    // z.style.height="84px";
                    // self.root.troopZones[id].setPattern('horizontalfit');
                    break;
                case 'V':
                    z.className="troopZoneV";
                    // z.style.width="84px";
                    z.style.maxHeight="200px";
                    // self.root.troopZones[id].setPattern('verticalfit');
                    break;
                case 'D':
                    z.className="troopZoneD";
                    // z.style.maxWidth="144px";
                    // z.style.maxHeight="144px";
                    self.root.troopZones[id].setPattern('diagonal');
                    self.root.troopZones[id].item_margin = 60;
                    break;
                case 'E':
                    z.className="troopZoneE";
                    // z.style.maxWidth="208px";
                    // z.style.maxHeight="208px";
                    self.root.troopZones[id].setPattern('ellipticalfit');
                    break;
            }
        }
    };

    self.startZoomIn=function() {
        self.zoomInterval = setInterval(() => Board.incPanzoom(), 10);
    };
    self.startZoomOut=function() {
        self.zoomInterval = setInterval(() => Board.decPanzoom(), 10);
    };
    self.stopZoom=function() {
        clearInterval(self.zoomInterval);
    };

    self.resetZoom=function() {
        let lMap = document.getElementById("board");
        let lJpg = document.getElementById("map-jpg");
        let lScale = 1.1*lMap.offsetHeight/lJpg.offsetHeight;
        this.PanZoom.zoomAbs(0, 0, lScale);
        let lZoomY=(lMap.offsetHeight * (1 - lScale)) / 2;
        let lZoomX=0;
        this.PanZoom.moveTo(lZoomX, lZoomY);
        let t = this.PanZoom.getTransform();
        let lDiff = t.scale * (lJpg.offsetHeight - lMap.offsetHeight);
        this.PanZoom.moveBy(0, -lDiff / 2);
    };

    self.decPanzoom=function(evt) {
        if (mBoxSize == null) return;
        let e = this.PanZoom.getTransform();
        if (e == null) return;
        this.PanZoom.zoomTo(e.x + mBoxSize.x / 2, e.y + mBoxSize.y / 2, 1 / 1.02);
    };

    self.incPanzoom=function() {
        if (mBoxSize == null) return;
        let e = this.PanZoom.getTransform();
        if (e == null) return;
        this.PanZoom.zoomTo(e.x + mBoxSize.x / 2, e.y + mBoxSize.y / 2, 1.02);
    };

    self.RemovePanZoom=function() {
        if (this.PanZoom != null) {
            this.PanZoom.zoomTo(0, 0, 0.1);
            setTimeout(function () {
                if (this.PanZoom != null) this.PanZoom.dispose();
            }, 100);
        }
        document.getElementById("board").style.overflow = "inherit";
    };

    // Tokens

    self.clearMap=function() {
        var token=dojo.empty("map-tokens");
    };

    self.removeToken=function(tProv, tId) {
        console.log('Removing token '+tId+' from '+tProv);
        this.root.troopZones[tProv].removeFromZone( "troops-"+tId, true, null);
        return true;
    };

    self.addToken=function(tId,tClass,tPlayer,tValue,tProv,tWeight) {
        var existing = false;
        var token=dojo.byId("troops-"+tId);
        if (!token) {
            token=dojo.place('<div id="troops-'+tId+'" class="token"/>', "map-tokens");
            existing = false;
        } else {
            existing = true;
        }
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
            tY=46+(this.player2color(tPlayer)-1)*86;
        }
        token.style.backgroundPosition="-"+tX+"px -"+tY+"px";
        dojo.empty("troops-"+tId);
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
            ][this.player2color(tPlayer)];
        }
        if (existing) {
            var previousZone = token.parentNode.id;
            var previousId = previousZone.substr(10);
            if (previousId != tProv) {
                this.root.troopZones[previousId].removeFromZone('troops-'+tId,false,"troopZone-"+tProv);
                this.root.troopZones[tProv].placeInZone("troops-"+tId,tWeight);
            }
        } else {
            this.root.troopZones[tProv].placeInZone("troops-"+tId,tWeight);
        }
        return token
    };

    self.addBorder=function(bPlayer,bValue,bFrom,bTo) {
        var border=dojo.place('<div class="borderToken"/>', "map-tokens");
        var bX=354;
        var bY=46+(this.player2color(bPlayer))*61;
        border.style.backgroundPosition="-"+bX+"px -"+bY+"px";
        var mX=this.provinces[bFrom].borders[bTo].slot.x;
        var mY=this.provinces[bFrom].borders[bTo].slot.y;
        border.style.left=mX+"px";
        border.style.top=mY+"px";
        border.style.transform="rotate("+this.provinces[bFrom].borders[bTo].slot.andle+"deg)";
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
            ][this.player2color(bPlayer)];
            value.style.transform="rotate("+(-this.provinces[bFrom].borders[bTo].slot.angle)+"deg)";
        }
        return border
    };

    // ***** End *****
    return self;
})();
