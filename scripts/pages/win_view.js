define([
    'jquery',
    'toxilibs/event_bus_queued'
], function ($, eventBus) {

    var $winTemplate
    var $viewContainer

    function init () {
        initHtml()

        eventBus.on('win view ready', function () {
            $viewContainer.prepend($winTemplate)
        })
    }


    function initHtml () {
        $winTemplate   = $('#win_template')
        $viewContainer = $('#challenges_container')
    }


    return init

})
