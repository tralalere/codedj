(function (exports) {
    'use strict'

    var argsToArray = Array.prototype.slice




    function addEventCapabilities (object, globalParams) {

        globalParams  = globalParams || {}
        var parent    = globalParams.parent
        var nameSpace = globalParams.nameSpace

        var master    = parent || object


        if (!parent) {

            addNameSpacingCapabilities(object)

            object.listenersFor = {}
            object.emitQueue    = []

        }



        // Adds a listener on a certain event
        object.on = function (eventName, callback) {
            if (!master.listenersFor[eventName]) {
                master.listenersFor[eventName] = []
            }

            var listener = {
                origin:    originOfCall(),
                nameSpace: nameSpace,
                callback:  callback
            }

            master.listenersFor[eventName].push(listener)
            return listener
        }


        object.removeListener = function (eventName, callbackOrListener) {

            var listeners = master.listenersFor[eventName]

            if (listeners) {

                var index
                if (typeof callbackOrListener === 'function') {
                    index = findListenerIndexWithCallback(listeners, callbackOrListener)
                } else {
                    index = findListenerIndex(listeners, callbackOrListener)
                }

                if (index >= 0) {
                    listeners.splice(index, 1)
                }
            }

        }


        object.removeAllListenersFor = function (eventName) {
            if (master.listenersFor[eventName]) {
                master.listenersFor[eventName] = []
            }
        }


        object.removeAllListeners = function () {
            master.listenersFor = {}
        }




        var emitQueue = master.emitQueue


        // Triggers all listener on a certain event.
        // Use: emit(eventName, arg1, arg2, arg3, ...)
        object.emit = function () {
            emitQueue.push({
                emitSync:  emitSync,
                arguments: arguments
            })
            if (emitQueue.length <= 1) {
                checkQueue()
            }
        }


        function checkQueue () {
            if (emitQueue.length > 0) {
                var firstInQueue = emitQueue[0]
                firstInQueue.emitSync.apply(null, firstInQueue.arguments)
                emitQueue.shift()
                checkQueue()
            }
        }


        object.emitSync = function () {
            console.warn("Please try to avoid calling emitSync. Here for event '" + arguments[0] + "'")
            emitSync.apply(null, arguments)
        }


        function emitSync () {

            var blockedListenerNameSpaces = master.blockedNameSpaces[nameSpace] || []

            var args      = argsToArray.call(arguments)
            var eventName = args.shift()

            var listeners = master.listenersFor[eventName] || []

            for (var i = 0; i < listeners.length; i++) {
                if (blockedListenerNameSpaces.indexOf(listeners[i].nameSpace) === -1) {
                    try {
                        listeners[i].callback.apply(master, args)
                    } catch (error) {
                        displayCustomError(eventName, error, listeners[i].origin)
                    }
                }
            }

        }



        object.emitter = function (eventName, params) {
            params = params || {}
            var emit = (params.sync ? object.emitSync : object.emit)
            return function () {
                var args = argsToArray.call(arguments)
                if (params.filter) {
                    for (var i = 0; i < args.length; i++) {
                        args[i] = params.filter(args[i])
                    }
                }
                args.unshift(eventName)
                emit.apply(null, args)

            }
        }


    }





    function addNameSpacingCapabilities (object) {

        var nameSpaces = {}

        object.blockedNameSpaces = {}


        object.block = function (params) {
            object.blockedNameSpaces[params.from] = object.blockedNameSpaces[params.from] || []
            object.blockedNameSpaces[params.from].push(params.to)
        }


        object.twoWayBlock = function (nameSpaceA, nameSpaceB) {
            object.block({from: nameSpaceA, to: nameSpaceB})
            object.block({from: nameSpaceB, to: nameSpaceA})
        }


        object.createOrFindEventNameSpace = function (nameSpace) {

            if (!nameSpaces[nameSpace]) {

                nameSpaces[nameSpace] = {}
                addEventCapabilities(nameSpaces[nameSpace], {
                    parent:    object,
                    nameSpace: nameSpace
                })

            }

            return nameSpaces[nameSpace]

        }
    }






    function findListenerIndex (listeners, listener) {
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i] === listener) {
                return i
            }
        }
        return -1
    }


    function findListenerIndexWithCallback (listeners, callback) {
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i].callback === callback) {
                return i
            }
        }
        return -1
    }


    function originOfCall () {
        var error = new Error('fake error')
        return error.stack ? error.stack.split('\n')[3] : undefined
    }


    function displayCustomError (eventName, error, origin) {
        displayWhereListenerWasAttached(eventName, origin)
        displayWhereErrorOccured(error)
        throw error
    }


    function displayWhereListenerWasAttached (eventName, origin) {
        var errorMessage = 'Error was on event \'' + eventName + '\''
        if (origin) {
            errorMessage += '. Listener for \'' + eventName + '\' was attached\n' + origin
        }
        console.warn(errorMessage)
    }


    function displayWhereErrorOccured (error) {
        if (error.stack) {
            var stackLines = error.stack.split('\n')
            var errorLines = ''
            for (var i = 2; i < stackLines.length; i++) {
                errorLines += '\n' + stackLines[i]
            }
            console.warn('Error occured ' + errorLines)
        }
    }



    if (typeof define !== 'undefined') {
        define(function () {
            return addEventCapabilities
        })
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = addEventCapabilities
    } else {
        exports.addEventCapabilities = addEventCapabilities
    }


})(typeof exports === 'undefined' ? this : exports)
