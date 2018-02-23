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
    globals.levelID = levelsNavigator.startLevelID


    function init () {
        initEvents()

        globalEventBus.emit('page loaded')
        globalEventBus.emit('user ready to start')
        globalEventBus.emit('change volume custom', 100)

        $('.wonWorld').on('click', function(event){
            event.isImmediatePropagationStopped()
            $('.wonWorld').addClass('invisible')
        })
    }


    function initEvents () {
        globalEventBus.on('level changed', launchNewLevel)
        globalEventBus.on('all levels complete', onAllLevelsComplete)
        globalEventBus.on('worlds unlocked', unlockWorlds)
    }


    function launchNewLevel () {
        setTimeout(function () {
            globalEventBus.emit('user ready to start')
        }, 3000)
    }


    function onAllLevelsComplete () {
        $('.missionCompleted').addClass('missionWon')
        setTimeout(function () {
            $('.wonWorld').removeClass('invisible')
        }, 5000);

        setAccess(2)
    }

    function unlockWorlds () {
        setAccess(2)
        setAccess(3)
    }

    function setAccess (world) {
        var worlds = localStorage.getItem('accessToWorld')
        if (!worlds) {
            worlds = []
        } else {
            worlds = worlds.split(',')
        }

        if (worlds.indexOf(world.toString()) === -1) {
            worlds.push(world)
            localStorage.setItem('accessToWorld', worlds)
        }
    }

    return init

})
