var lang = 'fr';
if(navigator.language || navigator.userLanguage){
    lang = navigator.language || navigator.userLanguage;
};

if(localStorage.getItem('lang')){

    if (localStorage.getItem('lang') !== 'fr' || localStorage.getItem('lang').substring(0, 2) !== 'fr') {
        if(localStorage.getItem('lang') !== 'en'){
            localStorage.setItem('lang', 'en')
            location.reload();
        }
    }
    
    lang = localStorage.getItem('lang')
}

if (lang !== 'fr' || lang.substring(0, 2) !== 'fr') {
    lang = 'en'
} else {
    lang = 'fr'
}


var signinCallback = function (result) {
    if (result.access_token) {
        ready(result.access_token);
    }
};

function ready(accessToken) {
    console.log(accessToken)
    token = accessToken;
    this.gapi = gapi;
    this.authenticated = true;
    this.gapi.client.request({
        path: '/youtube/v3/channels',
        params: {
            part: 'snippet',
            mine: true
        },
        callback: function (response) {
            if (response.error) {
                console.log(response.error.message)
            } else {
                $('#channel-name').text(response.items[0].snippet.title)
                $('#channel-thumbnail').attr('src', response.items[0].snippet.thumbnails.default.url)

                $('.pre-sign-in').hide()
                $('.post-sign-in').show()
            }
        }.bind(this)
    });
}

require.config({
    urlArgs: (typeof window !== 'undefined' && (window.location.protocol === 'file:' || window.location.hostname === 'localhost')) ? 'bust=' + Date.now() : '',
    baseUrl: 'scripts',
    paths: {
        jquery:    'ext_libs/jquery-1.11.2.min',
        ace:       'ext_libs/ace/ace',
        soundjs:   'ext_libs/soundjs.min',
        toxilibs:  '../toxilibs',
        level:     'silent_teacher_world/core/level',
        steps:     'silent_teacher_world/steps',
        globals:   'silent_teacher_world/globals',
        core:      'silent_teacher_world/core',
        tether:    'ext_libs/tether-1.4.0/dist/js/tether.min',
        bootstrap: 'ext_libs/bootstrap-4.0.0-alpha.6-dist/js/bootstrap.min',
        perfectScrollbar: 'ext_libs/perfect-scrollbar/js/perfect-scrollbar',
        perfectScrollbarJQuery: 'ext_libs/perfect-scrollbar/js/perfect-scrollbar.jquery',
        jqueryUi: '//code.jquery.com/ui/1.12.0/jquery-ui.min'
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
    'jqueryUi',
    'tether',
    'bootstrap',
    'perfectScrollbar',
    'perfectScrollbarJQuery'

], function ($, globalEventBus, getUrlParams, initHome, initWin, initSilentTeacherWorld, initCodingWorld, initSandboxWorld, jqueryUi) {

    var urlParams = getUrlParams()

    $(function () {
        $('.translate-fr').on('click', function(){
            globalEventBus.emit('lang changed', 'fr')
        })

        $('.translate-en').on('click', function(){
            globalEventBus.emit('lang changed', 'en')
        })

        $('.tab-mobile div').on('click',function(){
            $('.tab-mobile div').removeClass('active')
            $(this).addClass('active')
        });

        
        $('#resizable').resizable()

        $.getJSON('json/'+lang+'/text.json', function (data) {
            $('.btnNext span').html(data['button']['next'])
            $('.btnPrevious span').html(data['button']['previous'])
            $('.btnWorld span').html(data['button']['begin'])
            $('.goToSelectWorld span').html(data['button']['play'])
            $('#world1 .titleWorldWin').html(data['woldWinBeats'])
            $('#world2 .titleWorldWin').html(data['woldWinTracks'])
            $('.missionCompleted').html(data['missionCompleted'])
            $('.levelWon').html(data['levelWon'])

            $('.titleWorld.samples span').html(data['button']['titleWorld-samples'])
            $('.titleWorld.rythmes span').html(data['button']['titleWorld-rhytmes'])
            $('.titleWorld.morceaux span').html(data['button']['titleWorld-morceaux'])

            $('.creditText').html(data['button']['creditText'])
            $('.mentionText').html(data['button']['mentionText'])
            $('.faqText').html(data['button']['faqText'])
            $('.sourcesGitHub').html(data['button']['sourcesGitHub'])

            $('.encart').html(data['partenaires'])
            
            
            $('#finishedHour').html(data['finishedHour'])

            $('.getCertificate a').html(data['getCertificate'])


        })

        $('#signinButton').on('click', function(){
            $('#blocPopUp-youtube').fadeOut();
        })

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
        $('.logoImg').on('click', function () {
            $('#viewApp').empty()
            window.location.href = '.?monde'
        })

        //Todo: fix this (scroll mobile device)
        $(document).on('touchmove', function (e) {
            e.preventDefault()
        })

        // Set the name of the hidden property and the change event for visibility
        var hidden, visibilityChange
        if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
            hidden = 'hidden'
            visibilityChange = 'visibilitychange'
        } else if (typeof document.msHidden !== 'undefined') {
            hidden = 'msHidden'
            visibilityChange = 'msvisibilitychange'
        } else if (typeof document.webkitHidden !== 'undefined') {
            hidden = 'webkitHidden'
            visibilityChange = 'webkitvisibilitychange'
        }



// If the page is hidden, pause the sound;
// if the page is shown, play the sound
        function handleVisibilityChange () {
            if (urlParams.monde === '1') {
                if (document[hidden]) {
                    globalEventBus.emit('change volume custom', 0)
                } else {
                    globalEventBus.emit('change volume custom', 50)
                }
            } else if (urlParams.monde === '2' || urlParams.monde === '3') {

                globalEventBus.emit('change focus',document[hidden]);

            }

        }

// Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof document.addEventListener === 'undefined' || typeof document[hidden] === 'undefined') {
            console.log('This application requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.')
        } else {
            // Handle page visibility change
            document.addEventListener(visibilityChange, handleVisibilityChange, false)
        }


    })
})
