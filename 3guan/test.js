function show( elem, display ) {
    elem.style.display = display || '';
}

function hide( elem ) {
    elem.style.display = 'none';
}

function g( id ) {
    return document.getElementById( id );
}

function showResult( values ) {
    var index = 0;
    for ( var i = 0; i < types.length; i++ ) {
        var type = types[ i ];
        if ( type.check( values ) ) {
            index = i;
            break;
        }
    }
    g( 'result-img' ).src = 'img/result' + ( index + 1 ) + '.png';
    g( 'result-info' ).innerHTML = types[ index ].desc;

    hide( g( 'question' ) );
    hide( g( 'start-title' ) );
    show( g( 'result' ) );
    hide( g( 'foot' ) );
    show( g( 'finish-title' ) );
}

function sendWeibo() {
    g( 'question-form' ).submit();
    alert( '发送微博成功！' );
}

(function () {

    g( 'finish' ).onclick = function () {
        var form = g( 'question-form' );
        var start = 1;
        var end = 15;
        var values = [];

        for ( var i = start; i <= end; i++ ) {
            var value = '';
            var radios = form[ 'q' + i ];
            var len = radios.length;
            while ( len-- ) {
                var radio;
                if ( ( radio = radios[ len ] ) && radio.checked ) {
                    value = radio.value;
                    break;
                }
            }

            if ( !value ) {
                alert( '请选择完成测试选项！' );
                return;
            }

            values.push( value );
        }

        showResult( values );
    };

    g( 'send' ).onclick = sendWeibo;
})();

var VALUE = {
    a: '1',
    b: '2',
    c: '3',
    d: '4'
};

var types = [
    {
        desc: '您的三观类型是普通型三观 —— 朋友太普通啦，一点儿也不奇葩，三观算正吧~继续保持',
        check: function ( values ) {
            return values[ 0 ] == VALUE.a
                    && values[ 1 ] == VALUE.b
                    && values[ 5 ] == VALUE.b;
        }
    },
    {
        desc: '36 24 36  恩？不好意思那是我的三围…… 咳咳；您的三观类类型是饱满型三观 —— 映射到生活中也许就是那批高知，文艺，阳光，且正直的人吧~',
        check: function ( values ) {
            return values[ 2 ] == VALUE.a
                    && values[ 5 ] == VALUE.a
                    && values[ 6 ] == VALUE.c;
        }
    },
    {
        desc: '您的三观类型是灾后重建型三观 —— 最近是不是收到什么刺激了……好在恢复得比较快……继续保持阿……',
        check: function ( values ) {
            return values[ 3 ] == VALUE.a
                    && values[ 4 ] == VALUE.d
                    && values[ 7 ] == VALUE.b;
        }
    },
    {
        desc: '您的三观类型是缺损待补型三观 —— 类似营养不良…算不上什么病，但是得盯紧了阿！建议常跟自我修正型三观的好友在一起玩耍',
        check: function ( values ) {
            return values[ 0 ] == VALUE.c
                    && values[ 2 ] == VALUE.c
                    && values[ 8 ] == VALUE.a;
        }
    },
    {
        desc: '您的三观类型是重口基腐型三观 —— 映射到生活中就是腐、基、拉之国的统治者，是不是爱猫？是不是玩儿豆瓣？都中！！！',
        check: function ( values ) {
            return values[ 9 ] == VALUE.c
                    && values[ 11 ] == VALUE.d
                    && values[ 13 ] == VALUE.c;
        }
    },
    {
        desc: '您的三观类型是人间奇葩型三观 —— 三观科的医生都已经哭了~看你骨骼惊奇实乃百年一遇的奇葩！好好保持将来必有一番作为~',
        check: function ( values ) {
            return values[ 1 ] == VALUE.a
                    && values[ 6 ] == VALUE.a
                    && values[ 7 ] == VALUE.a;
        }
    },
    {
        desc: '您的三观类型是自我修正型三观 —— 二次元的黑基腐，三次元的阳光少年~强大的人生观、价值观影响着你日夜颠倒的世界观',
        check: function ( values ) {
            return values[ 3 ] == VALUE.c
                    && values[ 7 ] == VALUE.c
                    && values[ 12 ] == VALUE.a;
        }
    },
    {
        desc: '您的三观类型是清新玉女型三观 —— 恩？你不信？慢着…不用脱裤子给我看…那是在潜意识里的你~恩，你信或者你不信，清新玉女就是你',
        check: function ( values ) {
            return values[ 4 ] == VALUE.b
                    && values[ 10 ] == VALUE.a
                    && values[ 11 ] == VALUE.b;
        }
    },
    {
        desc: '您的三观类型是无敌型三观 —— 恭喜你中奖了！500朵新鲜动人的翔都归你，有黑硬粗，也有黄软希~这个冬天不再寒冷！！',
        check: function ( values ) {
            return values[ 0 ] == VALUE.b
                    && values[ 1 ] == VALUE.c
                    && values[ 2 ] == VALUE.a
                    && values[ 3 ] == VALUE.c
                    && values[ 4 ] == VALUE.d
                    && values[ 5 ] == VALUE.b
                    && values[ 6 ] == VALUE.b
                    && values[ 7 ] == VALUE.b
                    && values[ 8 ] == VALUE.a;
        }
    }
];

