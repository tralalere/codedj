define([
    'jquery',
    'toxilibs/event_bus_queued'
], function ($, globalEventBus) {

    var barsNumber = 10
    var maxHeight  = 100


    function init () {
        globalEventBus.on('volume updated', function (volume) {
            drawVolumeController(volume * 100)
        })
        initDomEvents()
    }


    function initDomEvents () {
        $('.blocVolume .plus').on('click', function () {
            globalEventBus.emit('change volume requested', true)
        })
        $('.blocVolume .moins').on('click', function () {
            globalEventBus.emit('change volume requested', false)
        })

        $("#volumcontroller>div").on('click',function () {
            var volume = parseInt($(this).attr('value'))
            globalEventBus.emit('change volume custom',volume)
        })
    }


    function drawVolumeController(nowselected){
        for (var i = 0; i < barsNumber; i++){
            heightBar = Math.abs(maxHeight - (i * 10));
            margintop = maxHeight - heightBar;
            if (margintop <= 0) {
                margintop=0;
            }
            var el
            el = $("#volumcontroller>div")[i]
            if (heightBar <= nowselected){
                $(el).css({'background-color':'#ff0d7b'})
            } else {
                $(el).css({'background-color':'rgba(144, 25, 101,0.5)'})
            }
        }
    }


    return init
})
