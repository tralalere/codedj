define([
    'toxilibs/event_bus_queued',
    'toxilibs/random',
    'globals',
    'steps', //FIXME remove dependency
    'core/challenge'
], function (eventBus, random, globals, steps, Challenge) {
    'use strict'

    var highestSolvedQuestionID
    var currentQuestion
    var currentTmpQuestion


    // eventBus.on('user wants to start', function () {    // FIXME Is it use somewhere ?
    //     goToLevelAndLaunch(globals.levelID)
    // })


    // eventBus.on('next level', goToLevel)    // FIXME Is it use somewhere ?

    // eventBus.on('user wants to go to level', goToLevelAndLaunch)    // FIXME Is it use somewhere ?

    eventBus.on('user ready to start', launchCurrentLevel)

    eventBus.on('page loaded', function () {
        eventBus.emit('levels loaded', steps)
    })



    function goToLevel (newlevelID) {
        globals.levelID = newlevelID
        highestSolvedQuestionID   = 0
        eventBus.emit('level changed', newlevelID)
    }


    // function goToLevelAndLaunch (newlevelID) {
    //     goToLevel(newlevelID)
    //     launchCurrentLevel()
    // }


    function goToNextLevel () {
        eventBus.emit('level won', globals.levelID) //FIXME move ?
        if (isLastLevel(globals.levelID)) {
            end()
        } else {
            goToLevel(nextLevelID(globals.levelID))
        }
    }


    function launchCurrentLevel () {
        launchNewChallenge(0)
    }


    function setCurrentQuestions () {
        var level = levelForID(globals.levelID)
        currentTmpQuestion = level.questions[globals.currentQuestionID] //FIXME
        currentQuestion    = level.questions[highestSolvedQuestionID]
    }



    var tooLateCounter = 0

    function updateTooLateCounter () {
        if (globals.currentChallenge && globals.currentChallenge.wasTooLate) {
            tooLateCounter += 1
        } else {
            tooLateCounter = 0
        }
    }


    function endChallenge (result) {
        eventBus.emit('challenge ended')

        updateTooLateCounter()

        currentTmpQuestion.times  = currentTmpQuestion.times  || 1  //FIXME
        currentTmpQuestion.errors = currentTmpQuestion.errors || 0  //FIXME

        emitChallengeResult(result)

        launchNextChallenge(result)

    }


    function emitChallengeResult (result) {
        if (result) {
            eventBus.emit('user won question', {
                levelID:           globals.levelID,
                currentQuestionId: globals.currentQuestionID,
                errors:            currentTmpQuestion.errors
            })
        } else if (result === false) {
            eventBus.emit('user gave wrong answer')
        }
    }


    function launchNextChallenge (result) {
        if (result) {
            launchNextChallengeAfterWin()
        } else if (result === false) {
            launchNextChallengeAfterLose()
        } else {
            relaunchChallenge()
        }
    }


    function relaunchChallenge () {
        launchNewChallenge(globals.currentQuestionID)
    }


    function launchNewChallenge (questionID) {
        if (typeof highestSolvedQuestionID === 'undefined') {
            highestSolvedQuestionID = 0
        }
        highestSolvedQuestionID = Math.max(highestSolvedQuestionID, questionID)
        if (globals.currentQuestionID !== questionID) {
            random.resetAllFairChoices()
            globals.currentQuestionID = questionID
        }
        setCurrentQuestions()
        
        eventBus.emit('challenge changed')

        globals.currentChallenge = new Challenge({
            levelID:        globals.levelID,
            questionID:     globals.currentQuestionID,
            question:       currentTmpQuestion,
            callback:       endChallenge,
            noTimer:        (tooLateCounter >= 1),
            timeoutTime:    currentTmpQuestion.timeoutTime //FIXME
        })
    }



    function goToNextQuestion () {
        var level = levelForID(globals.levelID)
        if (highestSolvedQuestionID >= level.questions.length - 1) { //FIXME
            goToNextLevel()
        } else {
            launchNewChallenge(globals.currentQuestionID + 1)
        }
    }


    function launchNextChallengeAfterWin () {
        if (globals.currentQuestionID === highestSolvedQuestionID) {
            if (currentQuestion.times > 1) {
                currentQuestion.times -= 1
                relaunchChallenge()
            } else {
                goToNextQuestion()
            }
        } else {
            launchNewChallenge(highestSolvedQuestionID)
        }
    }


    function launchNextChallengeAfterLose () {
        if (currentTmpQuestion.errorExpected) {
            currentTmpQuestion.errorExpected = false
            relaunchChallenge()
        } else {
            currentTmpQuestion.errors += 1
            currentTmpQuestion.times = Math.min(3, currentQuestion.times + 1)
            if (globals.currentQuestionID > 0 && currentTmpQuestion.errors > 1) {
                launchNewChallenge(Math.floor(Math.random() * (globals.currentQuestionID - 1)))
            } else {
                relaunchChallenge()
            }
        }
    }



    function end () {
        globals.levelID = 'end' //FIXME
        eventBus.emit('all levels complete')
    }



    var startLevelID = steps[0].id
    var lastLevelID  = steps[steps.length - 1].id


    function getLevelIndex (levelID) {
        for (var i = 0; i < steps.length; i++) {
            if (levelID === steps[i].id) {
                return i
            }
        }
        return false
    }


    function levelForID (levelID) {
        var index = getLevelIndex(levelID)
        if (index === false) {
            return false
        } else {
            return steps[index]
        }
    }


    function nextLevelID (levelID) {
        var currentIndex = getLevelIndex(levelID)
        if (currentIndex === false || currentIndex >= steps.length) {
            return false
        }
        return isLastLevel(levelID) ? false : steps[currentIndex + 1].id
    }


    function isLastLevel (levelID) {
        return levelID === lastLevelID
    }


    function levelExists (levelID) {
        return getLevelIndex(levelID) !== false
    }



    return {
        isLastLevel:  isLastLevel,
        levelExists:  levelExists,
        startLevelID: startLevelID,
        lastLevelID:  lastLevelID,
        levelForID:   levelForID,
        nextLevelID:  nextLevelID
    }


})
