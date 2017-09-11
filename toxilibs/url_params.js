/*eslint-disable no-use-before-define */
if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}
/*eslint-enable no-use-before-define */

define(function () {
    'use strict'

    function urlParams (url, mode) {
        if (url === '#' || url === 'all') {
            mode = url
            url = false
        }

        url  = url  || document.location.href
        mode = mode || 'params'

        return urlParamsStrict(url, mode)
    }


    urlParams.pushSearchParam = function (key, value) {
        var search = window.location.search
        var url = window.location.pathname + search
        url += /\?/.test(search) ? '&' : '?'
        url += key + '=' + value
        url += window.location.hash
        history.pushState('', document.title, url)
    }


    function urlParamsStrict (url, mode) {
        var result = {}

        var hashSplit  = url.split('#')
        var beforeHash = hashSplit[0]

        if (includeParams(mode)) {
            var strParams = beforeHash.split('?')[1]
            addParamsFromString(result, strParams)
        }

        if (includeHashParams(mode)) {
            addParamsFromString(result, hashSplit[1])
        }

        return result
    }


    function includeParams (mode) {
        return mode === 'params' || mode === 'all'
    }


    function includeHashParams (mode) {
        return mode === '#' || mode === 'all'
    }


    function addParamsFromString (result, string) {
        if (!string) {
            return
        }

        var keysValues = string.split('&')

        keysValues.forEach(function (keyValue) {
            keyValue = keyValue.split('=')

            var key   = keyValue[0]
            var value = keyValue[1]

            value = (typeof value === 'undefined') ? false : decodeURIComponent(value)

            result[key] = value
        })
    }

    return urlParams
})
