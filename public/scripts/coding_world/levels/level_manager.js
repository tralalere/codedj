var lang = 'fr';
if(navigator.language || navigator.userLanguage){
    lang = navigator.language || navigator.userLanguage;
};
if(localStorage.getItem('lang')){
    lang = localStorage.getItem('lang');
}
define([
    'toxilibs/event_bus_queued',
    'toxilibs/sound',
    '../core/world_main',
    '../challenge',
    './G1_A',
    './G1_B',
    './'+lang+'/G1_B_step2A',
    './'+lang+'/G1_B_step2B',
    './'+lang+'/G1_B_step2C',
    './G1_C',
    './G1_D',
    './'+lang+'/G1_D_step1A',
    './'+lang+'/G1_D_step1B',
    './'+lang+'/G1_D_step6',
    './G1_E',
    './G1_F',
    './G2_A',
    './G2_B',
    './'+lang+'/G2_B_step4A',
    './'+lang+'/G2_B_step4B',
    './G2_C',
    './G2_D',
    './'+lang+'/G2_D_step5B',
    './G2_E',
    './G2_F',
    './G3_A',
    './G3_B',
    './'+lang+'/G3_B_step4C',
    './'+lang+'/G3_B_step5A',
    './G3_C',
    './G3_D',
    './'+lang+'/G3_D_step3A',
    './'+lang+'/G3_D_step3B',
    './G3_E',
    './G3_F',
    './G3_G'
], function (globalEventBus, Sound, World, Challenge,
    G1_AData, G1_BData, G1_B_step2AData, G1_B_step2BData, G1_B_step2CData, G1_CData, G1_DData, G1_D_step1AData, G1_D_step1BData, G1_D_step6Data, G1_EData, G1_FData,
    G2_AData, G2_BData, G2_B_step4AData, G2_B_step4BData, G2_CData, G2_DData, G2_D_step5BData, G2_EData, G2_FData,
    G3_AData, G3_BData, G3_B_step4CData, G3_B_step5AData, G3_CData, G3_DData, G3_D_step3AData, G3_D_step3BData, G3_EData, G3_FData, G3_GData) {

    var levelsData = [
        G1_D_step1AData, G1_D_step1BData,
        G1_B_step2AData, G1_B_step2BData, G1_B_step2CData,
        G3_D_step3AData, G3_D_step3BData,
        G2_B_step4AData, G2_B_step4BData, G3_B_step4CData,
        G3_B_step5AData, G2_D_step5BData,
        G1_D_step6Data
    ]
    var currentLevelIndex = 0
    var challenge
    var nextChallenge
    var userAskedForSolution
    var consecutiveGoodAnswers



    function init () {
        globalEventBus.on('lang changed', function (lang) {
            localStorage.setItem('lang', lang)
            location.reload();
        })

        setChallenge(levelsData[currentLevelIndex])

        globalEventBus.on('pattern beat played', function (pattern, beat) {
            if (beat === 1) {
                challenge.launchLoops()
                challenge.loopsPlaying = true
            }
        })

        globalEventBus.on('loop stop requested', function (params) {
            if (params.stopAll || params.loops) {
                challenge.loopsPlaying = false
            }
        })

        globalEventBus.on('user ask for solution', function () {
            if (!userAskedForSolution) {
                challenge.useCurentQuestionLater()
            }
            consecutiveGoodAnswers = 0
            userAskedForSolution = true
        })
    }


    function setChallenge (levelData) {
        challenge = new Challenge(levelData)
        consecutiveGoodAnswers = 0
    }


    function nextChallenge () {
        if (currentLevelIndex + 1 >= levelsData.length) {
            return false
        } else {
            currentLevelIndex++
            setChallenge(levelsData[currentLevelIndex])
            return true
        }
    }


    function launchQuestion () {
        userAskedForSolution = false

        challenge.base.end.push('tune.play()')   // FIXME
        new World(globalEventBus('solutionWorld'), challenge.solution)   // eslint-disable-line no-new
        new World(globalEventBus('userWorld'), challenge.base)      // eslint-disable-line no-new
    }


    function nextQuestion () {
        challenge.nextQuestion()
    }


    function validateGoodAnswer () {
        if (!userAskedForSolution) {
            consecutiveGoodAnswers++
        }
    }


    function userFinishLevel () {
        return consecutiveGoodAnswers >= challenge.minimumGoodAnswers()
    }



    return {
        init:            init,
        nextChallenge:   nextChallenge,
        nextQuestion:    nextQuestion,
        launchQuestion:  launchQuestion,
        userFinishLevel: userFinishLevel,
        validateGoodAnswer: validateGoodAnswer
    }

})
