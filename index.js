/*
 * shaungshuang site function
 * 
 * @author errorrik
 */

function g( id ) {
    return document.getElementById( id );
}

function setOpacity( elem, opacity ) {
    if ( /msie/i.test( navigator.userAgent ) ) {
        elem.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:"+
            Math.floor(opacity * 100) +")";
    } else {
        elem.style.opacity = opacity;
    }
}

function show( elem ) {
    elem.style.display = '';
}

function hide( elem ) {
    elem.style.display = 'none';
}

function Tween( option ) {
    option = option || {};
    var duration  = option.duration || 500;
    var step      = option.step || 20;
    var inProcess = 0;
    var fn = option.fn || Tween.easeIn;


    function tween( stepProcess, onfinish ) {
        if ( inProcess ) {
            return false;
        }

        var currentStep = 1;
        var interval = duration / step;
        inProcess = 1;

        function doTween() {
            if ( currentStep == step ) {
                stepProcess( fn( currentStep, step ) );
                inProcess = 0;
                onfinish && onfinish();
                return;
            }

            stepProcess( fn( currentStep, step ) );
            currentStep++;
            setTimeout( doTween, interval );
        }

        setTimeout( doTween, interval );
        return true;
    }

    
    return tween;
};

Tween.easeIn = function ( currentStep, step ) {
    return 1 - Math.pow( 1 - currentStep / step, 3 );
};

var mainTween = Tween();

var MAIN_ID = 'Main';
var NAV_ID = 'Nav';

var Scene = function () {
    var SCENE_WIDTH = 1280;

    function getStepProcess( end ) {
        var main = g( MAIN_ID );
        var start = main.scrollLeft;

        return function ( rate ) {
            main.scrollLeft = start + Math.floor( ( end - start ) * rate );
        };
    }

    return {
        show: function ( index ) {
            mainTween( getStepProcess( SCENE_WIDTH * index ), {
                onfinish: function () {
                    Nav.reset();
                }
            } );
        },

        getLeft: function () {
            return g( MAIN_ID ).scrollLeft;
        }
    };
}();

var Nav = function () {
    var OFFSET_LEFT    = 198;
    var RESET_INTERVAL = 200;
    var currentLeft    = OFFSET_LEFT;
    var scrollTime;

    function getStepProcess( end ) {
        var nav = g( NAV_ID );
        var start = currentLeft;

        return function ( rate ) {
            currentLeft = start + Math.floor( ( end - start ) * rate );
            nav.style.left = currentLeft + 'px';
        };
    }

    function mainScroll() {
        scrollTime = new Date;
    }

    function resetNav() {
        if ( scrollTime && (new Date) - scrollTime > RESET_INTERVAL ) {
            Nav.reset();
        }

        setTimeout( resetNav, RESET_INTERVAL );
    }

    return {
        reset: function () {
            var end = Scene.getLeft() + OFFSET_LEFT;
            mainTween( getStepProcess( end ) );
            scrollTime = null;
        },

        init: function () {
            g( MAIN_ID ).onscroll = mainScroll;
            setTimeout( resetNav, RESET_INTERVAL );
        }
    };
}();

var Position = {
    show: function ( pos ) {
        g( pos.toUpperCase() ).style.display = 'block';
    },

    hide: function ( pos ) {
        g( pos.toUpperCase() ).style.display = 'none';
    }
};

var Exhibit = function () {
    var START = 1;
    var END   = 6;
    var IOS_PREFIX     = 'ExhibitIos';
    var ANDROID_PREFIX = 'ExhibitAndroid';
    var STAY_SECOND    = 5;

    var before = START;
    var current = before + 1;

    function startNext(){
        setTimeout( next, STAY_SECOND * 1000 );
    }

    function next() {
        before = current;
        current++ ;
        if ( current > END ) {
            current = START;
        }

        var currentAndroid = g( ANDROID_PREFIX + current );
        var currentIos     = g( IOS_PREFIX + current );
        var beforeAndroid  = g( ANDROID_PREFIX + before );
        var beforeIos      = g( IOS_PREFIX + before );
        var tween = Tween();
        tween( function ( rate ) {
                show( currentAndroid );
                show( currentIos );
                setOpacity( beforeAndroid, 1 - rate );
                setOpacity( beforeIos, 1 - rate );
                setOpacity( currentAndroid, rate );
                setOpacity( currentIos, rate );
            }, function () {
                hide( beforeAndroid );
                hide( beforeIos );
                startNext();
            } );
    }

    return {
        init: function () {
            for ( var i = START; i <= END; i++ ) {
                hide( g( IOS_PREFIX + i ) );
                hide( g( ANDROID_PREFIX + i ) );
            }

            show( g( IOS_PREFIX + before ) );
            show( g( ANDROID_PREFIX + before ) );

            startNext();
        }
    };
}();

function init() {
    Nav.init();
}

window.onload = Exhibit.init;

