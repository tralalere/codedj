define([
    'toxilibs/event_bus_queued',
    'toxilibs/execute',
    'coding_world/core/user_to_core'
], function (globalEventBus, execute, userToCoreKeys) {

    var worldRef

    globalEventBus.on('world ready', function (world) {
        worldRef = world
        worldRef.api.userToCoreKeys = userToCoreKeys

        run(world.exposedCode())
    })

    globalEventBus.on('code execution requested', run)

    function run (sourceCode) {
        var userToCoreCode = userToCoreKeysCode()
        sourceCode = userToCoreCode.declaration.concat(worldRef.startCode(), sourceCode, userToCoreCode.assignation, worldRef.endCode()).join('\n')
        execute({
            source: sourceCode,
            scope:  worldRef.api
        })
        worldRef.eventBus.emit('code executed')
    }

    function userToCoreKeysCode () {
        var declarationCode = []
        var assignationCode = []

        for (var key in userToCoreKeys) {
            var objectCode = 'userToCoreKeys.' + key
            declarationCode.push('var ' + key + ' = ' + objectCode)
            assignationCode.push(objectCode + ' = ' + key)
        }

        return {
            declaration: declarationCode,
            assignation: assignationCode
        }
    }

})
