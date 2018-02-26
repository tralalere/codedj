importScripts('./ext_libs/require.js')

require.config({
    urlArgs: (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'bust=' + Date.now() : '',
    paths: {
        toxilibs: '../toxilibs'
    }
})

require([
    'toxilibs/event_bus_queued',
    'coding_world/core/world_main',
    'coding_world/user_code/user_code',
    'coding_world/goal/comparer'
], function (globalEventBus, World) {


    addEventListener('message', function (e) {
        if ('eventName' in e.data) {
            var args = []
            args = args.concat(e.data.eventName)
            args = args.concat(e.data.args)
            globalEventBus.emit.apply(globalEventBus, args)
        }
    })


    globalEventBus.twoWayBlock('solutionWorld', 'userWorld')
    globalEventBus.twoWayBlock('solutionWorld', 'sandbox')
    var eventBus = globalEventBus('sandbox')



    globalEventBus.on('world creation requested', function (worldName, code) {
        new World(worldName, code)  //eslint-disable-line no-new
    })


    globalEventBus.on('world ready', function (world) {
        postMessage({
            eventName: world.name + ' code ready',
            args: [world.exposedCode()]
        })
    })


    eventBus.on('new pattern', function (pattern) {
        postMessage({
            eventName: 'new pattern',
            args: [pattern.export()]
        })
    })


    eventBus.on('play note requested', function (params) {
        postMessage({
            eventName: 'play note requested',
            args: [{
                note:   params.note.export(),
                volume: params.volume,
                delay:  params.delay
            }]
        })
    })


    eventBus.on('ready to display notes', function (notes) {
        var serializedNotes = notes.map(function (note) {
            return note.export()
        })

        postMessage({
            eventName: 'ready to display notes',
            args: [serializedNotes]
        })
    })


    eventBus.on('pattern beat played', function (beat) {
        postMessage({
            eventName: 'pattern beat played',
            args: [beat]
        })
    })



    eventBus.on('samples loop stop requested', function (params) {
        eventBus.emit('loop stop requested', params)

        postMessage({
            eventName: 'samples loop stop requested',
            args: [params]
        })
    })


    eventBus.on('pattern has reached loop limit', function () {
        postMessage({
            eventName: 'pattern has reached loop limit',
            args: []
        })
    })


    eventBus.on('patterns compared', function (errors) {
        postMessage({
            eventName: 'patterns compared',
            args: [errors]
        })
    })


    eventBus.on('new tab', function (tab) {
        postMessage({
            eventName: 'tab creation requested',
            args: [tab.name]
        })
    })


    eventBus.on('add instrument to tab', function (params) {
        postMessage({
            eventName: 'add instrument to tab',
            args: [{
                soundName: params.soundName,
                tabName:   params.tabName
            }]
        })
    })


    eventBus.on('user to core values updated', function (keys) {
        postMessage({
            eventName: 'user to core values updated',
            args: [keys]
        })
    })


    eventBus.on('sample created', function (params) {
        postMessage({
            eventName: 'sample created',
            args: [{
                soundName: params.soundName,
                soundSource: params.soundSource
            }]
        })
    })


})
