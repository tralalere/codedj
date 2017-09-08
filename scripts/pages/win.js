define([
    'jquery',
    'toxilibs/event_bus_queued',
    'pages/win_view'
], function ($, globalEventBus, initView) {

    initView()

    function init () {
        $('.iconCodeDj').addClass('invisible')
        $('.leftArrow,.rightArrow').hide()
        $('#challenges_container').removeClass('box_shadow_container')
        
        globalEventBus.emit('page loaded')
        globalEventBus.emit('win view ready')

        initDomEvents()
    }

    function initDomEvents () {
        $('#btn_world1').on('click', function () {
            goToWorld(1)
        })
        $('#btn_world2').on('click', function () {
            goToWorld(2)
        })
    }


    function goToWorld (world) {
        window.location.href = '.?monde=' + world
    }


    return init

})
