define([
    'jquery',
    'toxilibs/event_bus_queued',
    'pages/home',
    'perfectScrollbarJQuery'

], function ($, eventBus, initDomEvents, initHome) {
    require('perfectScrollbarJQuery')
    var $homeTemplate
    var $viewContainer

    var $loadPostHome
    var $postHome
    var $preHome
    var $viewApp
    var $body

    var $blocPopUp
    var $credit

    function init () {
        //$('.loader').addClass('invisible')
        $('#viewApp').perfectScrollbar({
            suppressScrollX: true
        })
        initHtml()
        unlockWorld()
        eventBus.on('home view ready', function () {
            //$viewContainer.prepend($homeTemplate)
            $viewApp.empty()
            $viewApp.prepend($postHome)
            $('.animateLogo').fadeIn(function () {
                $('#progress').fadeIn(function () {
                    setInterval(function () {
                        modifValues()
                    }, 10)
                })
            }).addClass('animateBigLogo')
            
            $('#viewApp').perfectScrollbar('update')
        })
        eventBus.on('world select', function () {
            $('.loader').addClass('invisible')
            $viewApp.empty()
            $viewApp.prepend($preHome)
            $('#viewApp').perfectScrollbar('update')
            $('body').addClass('secondBack')
        })

        $($credit).on('click', function () {
            $($blocPopUp).fadeIn()
        })

        $($blocPopUp).on('click', function (event) {
            event.stopPropagation()
            $($blocPopUp).fadeOut()
        })

        $('.pop').on('click', function (event) {
            event.stopPropagation()
        })
        $('#preHome #back').click(function () {
            window.location.href = '.?monde'
            initHome()
            return false
        })
    }


    function initHtml () {
        $loadPostHome = $('#loadPostHome')
        $postHome = $('#postHome')
        $preHome = $('#preHome')
        $viewApp = $('#viewApp')
        $body = $('body')

        $blocPopUp = $('.blocPopUp')
        $credit = $('.credit')

        //$homeTemplate = $('#home_template')
        //$viewContainer = $('#challenges_container')
    }

    function unlockWorld () {

        var worlds = localStorage.getItem('accessToWorld')
        if (!worlds) {
            worlds = []
        } else {
            worlds.split(',')
        }
        for (var i = 2; i < 4; i++) {
            if (worlds && worlds.indexOf(i.toString()) !== -1) {
                $('#' + 'btn_world' + i).removeClass('lock')
            }
        }
    }

    function modifValues () {
        var val = $('#progress progress').attr('value')
        if (val >= 100) {
            val = 100
            $('#progress').fadeOut(function () {
                $('.blocLogo').animate({top: 0}, 800)
            })
            //$('.bloc-store').fadeIn()
            $('.blocAnimation').delay(1500).fadeIn()
            $('.encart').delay(1500).fadeOut()
            $('.blocAnimationBefore').delay(1500).fadeIn('slow', function () {
                $('.hideLeftStart').addClass('hideLeftEnd')
                $('.hideRightStart').addClass('hideRightEnd')
                setTimeout(function () {
                    $('#postHome .containTraitBottom .btnCodeDj').addClass('btnTopZero')
                    $('#postHome .containTraitTop .btnCodeDj').addClass('btnTopCent')
                }, 500)
            })
        }
        var newVal = Number(val) + 0.5
        var txt = Math.floor(newVal) + '%'

        $('#progress progress').attr('value', newVal).text(txt)
        $('#progress strong').html(txt)
    }

    return init

})
