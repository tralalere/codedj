define([], function () {

    function createTuneConstructor (eventBus) {

        function Tune (params) {
            params = params || {}

            this.patterns = params.patterns || []
            this.loop     = (typeof params.loop !== 'undefined') ? params.loop : true

            var tune = this
            eventBus.on('reset', function () {
                tune.stop()
            })

            eventBus.on('loop stop requested', function () {
                tune.stop()
            })

            eventBus.emit('new tune', this)
        }

        Tune.prototype.add = function () {
            for (var i in arguments) {
                this.patterns.push(arguments[i])
            }
        }

        Tune.prototype.play = function () {
            this.playPattern(0)
        }

        Tune.prototype.playPattern = function (patternId) {
            var pattern = this.patterns[patternId]
            var tune    = this

            pattern.play()

            if (!this.loop && patternId + 1 >= this.patterns.length) {
                return
            }

            var nextId  = ((patternId + 1) % this.patterns.length)

            this.playTimer = setTimeout(function () {
                tune.playPattern(nextId)
            }, pattern.duration())
        }

        Tune.prototype.stop = function () {
            clearTimeout(this.playTimer)
        }

        return Tune

    }


    return createTuneConstructor

})
