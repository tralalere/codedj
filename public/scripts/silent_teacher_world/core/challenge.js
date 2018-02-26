define([
    'toxilibs/event_bus_queued',
    'toxilibs/timer'
], function (eventBus, Timer) {
    'use strict'



    function Challenge (params) {

        this.levelID    = params.levelID
        this.questionID = params.questionID

        this.fullLabel = this.levelID + '_' + this.questionID


        this.question = params.question.generate()
        this.answer   = this.question.answer

        this.callback = params.callback


        initTimer(this, params)

        eventBus.emit('challenge created', this)

    }





    //************************** TIMER **************************

    function initTimer (challenge, params) {

        params.noTimer = true //FIXME NO TIMER !

        if (!params.noTimer) {
            params.endCallback = function () {
                challenge.tooLate()
            }
        }

        params.duration = params.timeoutTime

        challenge.timer = new Timer(params)
        challenge.timer.launch()
    }


    Challenge.prototype.pause = function () {
        this.timer.pause()
    }


    Challenge.prototype.unPause = function () {
        this.timer.unPause()
    }





    //************************** ANSWERING AND END **************************


    Challenge.prototype.tooLate = function () {
        this.wasTooLate = true
        this.afterAnswer(null, null)
    }



    function formatedUserAnswer (answer, userAnswer, win) {
        if (isNaN(parseInt(userAnswer, 10)) && userAnswer !== 'false' && userAnswer !== 'true') {
            userAnswer = "'" + userAnswer + "'"
        }

        if (typeof answer === 'string' && win) {
            userAnswer = "'" + answer + "'"
        }

        return userAnswer
    }


    Challenge.prototype.submitAnswer = function (userAnswer) {
        this.pause()

        if (this.answerSubmitted || this.wasTooLate) {
            return
        }

        this.answerSubmitted = true

        userAnswer = userAnswer.replace(/^\s+|\s+$/g, '').replace(/^'+|'+$/g, '').replace(/^"+|"+$/g, '')

        if (userAnswer === 'unlock') {
            eventBus.emit('worlds unlocked')
        }

        var win = (userAnswer === String(this.answer)) || userAnswer === 'ooo' //FIXME only in debug mode ?

        userAnswer = formatedUserAnswer(this.answer, userAnswer, win)

        this.afterAnswer(userAnswer, win)
    }


    Challenge.prototype.afterAnswer = function (userAnswer, win) {

        this.totalTime = this.timer.totalTime()

        eventBus.emit('challenge answer given', this, userAnswer, win)

        var challenge = this

        setTimeout(function () {
            challenge.callback(win)
        }, win ? 2000 : 3000)
    }


    Challenge.prototype.destroy = function () {
        this.pause()
        eventBus.emit('challenge destroyed', this)
    }







    return Challenge

})
