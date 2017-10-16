define(function () {
    'use strict'

    var fallbackDelay = 1000 / 60

    function fallback (callback) {
        window.setTimeout(callback, fallbackDelay)
    }

    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || fallback

})
