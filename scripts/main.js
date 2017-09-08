require.config({
    urlArgs: (typeof window !== 'undefined' && (window.location.protocol === 'file:' || window.location.hostname === 'localhost')) ? 'bust=' + Date.now() : '',
    baseUrl: 'scripts',
    paths: {
        jquery:    'ext_libs/jquery-1.11.2.min',
        ace:       'ext_libs/ace/ace',
        soundjs:   'ext_libs/soundjs.min',
        toxilibs:  '/toxilibs',
        level:     'silent_teacher_world/core/level',
        steps:     'silent_teacher_world/steps',
        globals:   'silent_teacher_world/globals',
        core:      'silent_teacher_world/core',
        tether:    'ext_libs/tether-1.4.0/dist/js/tether.min',
        bootstrap: 'ext_libs/bootstrap-4.0.0-alpha.6-dist/js/bootstrap.min',
        perfectScrollbar: 'ext_libs/perfect-scrollbar/js/perfect-scrollbar',
        perfectScrollbarJQuery: 'ext_libs/perfect-scrollbar/js/perfect-scrollbar.jquery'
    },
    shim: {
        ace: {
            exports: 'ace'
        },
        soundjs: {
            exports: 'createjs.Sound'
        }
    }
})


require([
    'jquery',
    'toxilibs/event_bus_queued',
    'toxilibs/url_params',
    'pages/home',
    'pages/win',
    'silent_teacher_world/silent_teacher_world',
    'coding_world/coding_world',
    'coding_world/sandbox_world',
    'tether',
    'bootstrap',
    'perfectScrollbar',
    'perfectScrollbarJQuery',
], function ($, globalEventBus, getUrlParams, initHome, initWin, initSilentTeacherWorld, initCodingWorld, initSandboxWorld) {

    var urlParams = getUrlParams()

    $(function () {
        if (urlParams.monde === '1') {
            initSilentTeacherWorld()
        } else if (urlParams.monde === '2') {
            $('.loader').removeClass('invisible')
            setTimeout(initCodingWorld, 1000)
        } else if (urlParams.monde === '3') {
            initSandboxWorld()
        } else if (urlParams.win) {
            initWin(urlParams.win)
        } else if (urlParams.monde === 'select') {
            initHome('world select')
        } else {
            initHome()
        }
        $('.logoImg').on('click', function(){
            $('#viewApp').empty()
            window.location.href = '.?monde'
        })
        //Todo: fix this (scroll mobile device)
        $(document).on('touchmove',function(e){
            e.preventDefault();
        });

    })
})
