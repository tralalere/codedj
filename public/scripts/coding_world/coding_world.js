var lang = 'fr';
if(navigator.language || navigator.userLanguage){
    lang = navigator.language || navigator.userLanguage;
};
if(localStorage.getItem('lang')){
    lang = localStorage.getItem('lang');
}
define([
    'toxilibs/event_bus_queued',
    './levels/level_manager',
    'toxilibs/sound',

    './view/main',
    './view/editor',
    './goal/comparer',
    './user_code/user_code',
    'music_player/music_player'
], function (globalEventBus, levelManager, Sound) {


    function init () {

        globalEventBus.twoWayBlock('solutionWorld', 'view')
        globalEventBus.twoWayBlock('solutionWorld', 'userWorld')
        globalEventBus.twoWayBlock('solutionWorld', 'musicPlayer')


        globalEventBus.on('patterns compared', function (codeHasErrors) {
            if (!codeHasErrors) {
                globalEventBus.emit('user finish level')
            }
        })


        globalEventBus.on('user want to go next', function () {
            levelManager.validateGoodAnswer()
            if (levelManager.userFinishLevel()) {
                if (!levelManager.nextChallenge()) {
                    onAllLevelsComplete()
                    return
                }
            } else {
                levelManager.nextQuestion()
            }
            Sound.onAllSoundsLoaded(function () {
                levelManager.launchQuestion()
            })
        })

        levelManager.init()

        Sound.onAllSoundsLoaded(function () {
            globalEventBus.emit('html ready')
            globalEventBus.emit('volume updated', 100)
            levelManager.launchQuestion()
        })

    }


    function onAllLevelsComplete () {
        if(lang == 'fr'){
            $('#world2 .wonWorld .worldUnlocked').html('monde des morceaux')
        } else{
            $('#world2 .wonWorld .worldUnlocked').html('world of Tracks!')
        }
        $('.wonWorld').removeClass('invisible')
        setAccess(3)
    }

    function setAccess (world) {
        var worlds = localStorage.getItem('accessToWorld')
        if (!worlds) {
            worlds = []
        } else {
            worlds = worlds.split(',')
        }

        if (worlds.indexOf(world.toString()) == -1) {
            worlds.push(world)
            localStorage.setItem('accessToWorld', worlds)
        }
    }


    return init

})
