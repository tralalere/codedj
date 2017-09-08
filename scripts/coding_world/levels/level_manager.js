define([
    'toxilibs/event_bus_queued',
    'toxilibs/sound',
    '../core/world_main',
    '../challenge',
    './G1_A',
    './G1_B',
    './G1_C',
    './G1_D',
    './G1_E',
    './G1_F',
    './G2_A',
    './G2_B',
    './G2_C',
    './G2_D',
    './G2_E',
    './G2_F',
    './G3_A',
    './G3_B',
    './G3_C',
    './G3_D',
    './G3_E',
    './G3_F',
    './G3_G'
], function (globalEventBus, Sound, World, Challenge,
    G1_AData, G1_BData, G1_CData, G1_DData, G1_EData, G1_FData, G2_AData, G2_BData, G2_CData, G2_DData, G2_EData, G2_FData, G3_AData, G3_BData, G3_CData, G3_DData, G3_EData, G3_FData, G3_GData) {

    var levelsData = [
        G1_AData, G1_DData, G1_CData, G1_BData, G1_EData, G1_FData,
        G2_AData, G2_BData, G2_CData, G2_DData, G2_EData, G2_FData,
        G3_AData, G3_BData, G3_CData, G3_DData, G3_EData, G3_FData, G3_GData
    ]
    var currentLevelIndex = 0
    var challenge
    var nextChallenge
    var userAskedForSolution
    var consecutiveGoodAnswers



    function init () {
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
