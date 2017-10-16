define([
    'toxilibs/event_bus_queued',
    './view/main',
    'globals',
    'core/levels_navigator',
    'steps',

    'core/challenge_view',
    './javascript_module',
    './samples_manager'
], function (globalEventBus, initView, globals, levelsNavigator) {

    initView()

    globals.challengeInputWidth = 300
    globals.errorsCount = 0
    globals.levelID     = levelsNavigator.startLevelID


    function init () {
        initEvents()

        globalEventBus.emit('page loaded')
        globalEventBus.emit('user ready to start')
        globalEventBus.emit('change volume custom', 100)
    }


    function initEvents () {
        globalEventBus.on('level changed', launchNewLevel)
        globalEventBus.on('all levels complete', onAllLevelsComplete)
    }


    function launchNewLevel () {
        setTimeout(function () {
            globalEventBus.emit('user ready to start')
        }, 3000)
    }


    function onAllLevelsComplete () {
        $('.wonWorld').removeClass('invisible')
        setAccess(2)
    }

    function setAccess(world){
        var worlds = localStorage.getItem('accessToWorld')
        if(!worlds){
            worlds = []
        } else{
            worlds.split(',')
        }

        if(worlds.indexOf(world.toString()) == -1){
            worlds.push(world)
            localStorage.setItem('accessToWorld', worlds)
        }
    }

    return init

})
