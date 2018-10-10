var lang = 'fr'
if(navigator.language || navigator.userLanguage){
    lang = navigator.language || navigator.userLanguage
    if (lang !== 'fr' && lang.substring(0, 2) !== 'fr') {
        lang = 'en'
    } else {
        lang = 'fr'
    }
}
if(localStorage.getItem('lang')){
    if(localStorage.getItem('lang') !== 'en'){
        if (localStorage.getItem('lang') !== 'fr' || localStorage.getItem('lang').substring(0, 2) !== 'fr') {
            localStorage.setItem('lang', 'en')
            location.reload();
        }
    }
    lang = localStorage.getItem('lang')
}

define([
    'jquery',
    'toxilibs/event_bus_queued',
    'pages/home_view'
], function ($, globalEventBus, initView) {

    initView()

    function init (event) {
        globalEventBus.on('lang changed', function (lang) {
            localStorage.setItem('lang', lang)
            location.reload();
        })
        
        event = (typeof event === 'undefined') ? 'home view ready' : event
        $('.iconCodeDj').addClass('invisible')
        $('#challenges_container, .wrapChallengeTimeline').removeClass('box_shadow_container')
        initDomEvents()
        globalEventBus.emit('page loaded')
        globalEventBus.emit(event)
    }

    function initDomEvents () {

        $('.creditText').on('click', function () {
            showPopUp('credit')
        })
        $('.mentionText').on('click', function () {
            showPopUp('mentions')
        })
        $('.faqText').on('click', function () {
            showPopUp('foire_aux_questions')
        })
        $('.recoText').on('click', function () {
            showPopUp('recoText')
        })
        $('a').on('click', function (event) {
            event.stopPropagation()
        })

        $('#btn_world3').on('click', function () {
            if (filterAccessWorld(3)) {
                goToWorld(3)
            } else {
                showPopUp('lockWorld')
            }
        })

        $('#btn_world2').on('click', function () {
            if (filterAccessWorld(2)) {
                $('#viewApp').empty()
                goToWorld(2)
            } else {
                showPopUp('lockWorld')
            }
        })

        $('#btn_world1').on('click', function () {
            goToWorld(1)
        })

        $('.goToSelectWorld').on('click', function () {
            window.location.href = '.?monde=select'
        })
    }

    function filterAccessWorld (world) {
        var worlds = localStorage.getItem('accessToWorld')
        if (!worlds) {
            worlds = []
        } else {
            worlds.split(',')
        }
        if (worlds.indexOf(world.toString()) !== -1) {
            return true
        }
    }

    function showPopUp (select) {
        $('.blocPopUp .pop').empty()
        $.getJSON('json/'+lang+'/text.json', function (data) {
            $('.blocPopUp .pop').html(data[select])
        })
        $('.blocPopUp').fadeIn()
    }

    function goToWorld (world) {
        window.location.href = '.?monde=' + world
    }

    return init

})
