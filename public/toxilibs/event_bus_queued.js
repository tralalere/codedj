define(['./event_capabilities_queued'], function (addEventCapabilities) {


    function eventBus (nameSpace) {
        return eventBus.createOrFindEventNameSpace(nameSpace)
    }

    addEventCapabilities(eventBus)

    return eventBus

})
