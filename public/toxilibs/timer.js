/*eslint-disable no-use-before-define */
if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}
/*eslint-enable no-use-before-define */

define(function () {
    'use strict'


    var defaultDuration = 30000


    function Timer (params) {
        params = params || {}

        this.endCallback              = params.endCallback
        this.secondsRemainingCallback = params.secondsRemainingCallback

        this.duration                 = params.duration || defaultDuration
        this.bonusDelay               = (typeof params.bonusDelay === 'undefined') ? (this.duration / 3) : params.bonusDelay

        this.paused                   = true
        this.wasNeverLaunched         = true
    }


    Timer.now = function () {
        return (new Date()).getTime()
    }


    Timer.prototype.launch = function (duration) {
        this.startedAt = Timer.now()
        this.pauseDuration = 0
        this.duration  = duration || this.duration
        run(this, this.duration)
    }


    Timer.prototype.addBonusDelay = function () {
        if ((this.timerStop - Timer.now()) < this.bonusDelay) {
            run(this, this.bonusDelay)
        }
    }


    Timer.prototype.add = function (duration) {
        if (this.paused) {
            this.remainingTimeAfterPause += duration
        } else if (this.ended()) {
            this.duration += duration
        } else {
            var remainingTime = this.timerStop - Timer.now() + duration
            run(this, remainingTime)
        }
    }


    Timer.prototype.togglePause = function () {
        if (this.paused) {
            this.unPause()
        } else {
            this.pause()
        }
    }


    Timer.prototype.pause = function () {
        if (!this.paused) {
            clearTimeouts(this)
            this.paused   = true
            this.pausedAt = Timer.now()
            this.remainingTimeAfterPause = this.timerStop - Timer.now()
        }
    }


    Timer.prototype.unPause = function () {
        if (this.wasNeverLaunched) {
            this.launch()
        } else if (this.paused) {
            run(this, this.remainingTimeAfterPause)
            this.pauseDuration += Timer.now() - this.pausedAt
        }
    }


    Timer.prototype.reset = function () {
        this.pause()
        this.pauseDuration = 0
        this.startedAt = Timer.now()
    }


    Timer.prototype.restart = function () {
        this.reset()
        this.launch(this.duration)
    }


    Timer.prototype.remainingTime = function () {
        if (this.paused) {
            return this.remainingTimeAfterPause
        } else {
            return this.timerStop - Timer.now()
        }
    }


    Timer.prototype.totalTime = function () {
        if (this.wasNeverLaunched) {
            return 0
        }

        var updatedAt = this.paused ? this.pausedAt : Timer.now()
        return updatedAt - this.startedAt - this.pauseDuration
    }



    function clearTimeouts (timer) {
        clearTimeout(timer.currentTimeout)
        clearTimeout(timer.secondsRemainingTimeout)
    }


    function remainingSecondsCallback (timer) {
        if (timer.secondsRemainingCallback) {
            var remaining = timer.remainingTime()
            if (remaining <= 0) {
                return
            }
            timer.secondsRemainingTimeout = setTimeout(function () {
                timer.secondsRemainingCallback(Math.round(timer.remainingTime() / 1000))
                remainingSecondsCallback(timer)
            }, remaining % 1000)
        }
    }


    Timer.prototype.ended = function () {
        if (this.paused) {
            return false
        } else {
            return Timer.now() >= this.timerStop
        }
    }


    function run (timer, delay) {
        timer.wasNeverLaunched = false

        clearTimeouts(timer)

        timer.paused     = false

        timer.timerStop  = Timer.now() + delay
        timer.timerDelay = delay


        if (delay <= 0) {
            if (timer.endCallback) {
                timer.endCallback()
            }
            return
        }

        remainingSecondsCallback(timer)

        if (timer.endCallback) {
            timer.currentTimeout = setTimeout(timer.endCallback, delay)
        }

    }


    return Timer


})
