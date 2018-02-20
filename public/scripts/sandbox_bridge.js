define([
    'jquery',
    'toxilibs/event_bus_queued',
    'toxilibs/execute'
], function ($, globalEventBus) {

    var eventBus = globalEventBus('sandbox')
    globalEventBus.twoWayBlock('solutionWorld', 'sandbox')


    var worker = new Worker('scripts/sandbox_worker.js')
    worker.addEventListener('message', function (e) {
        if ('eventName' in e.data) {
            var args = []
            args = args.concat(e.data.eventName)
            args = args.concat(e.data.args)
            eventBus.emit.apply(eventBus, args)
        }
    })


    workerEventProxy('code execution requested')
    workerEventProxy('world creation requested')
    workerEventProxy('reset')


    eventBus.on('samples loop stop requested', function (params) {
        eventBus.emit('loop stop requested', params)
    })



    var argsToArray = Array.prototype.slice

    function workerEventProxy (eventName) {

        function listener () {
            var args = argsToArray.call(arguments)

            worker.postMessage({
                eventName: eventName,
                args: args
            })
        }

        eventBus.on(eventName, listener)

        return listener
    }


})