define([], function () {

    function createTuneConstructor (eventBus) {

        function Tune (params) {
            params = params || {}

            this.end = false
            this.patterns = params.patterns || []
            this.loop     = (typeof params.loop !== 'undefined') ? params.loop : false

            var tune = this
            eventBus.on('reset', function () {
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
            this.end = false
            this.playPattern(this.patterns[0].id)
        }

        Tune.prototype.playPattern = function (patternId) {
            //var pattern = this.patterns[patternId]
            var pattern = this.patterns.find(function(pattern){
                return pattern.id == patternId;
            })
            var tune    = this
            pattern.play()

            eventBus.emit('switch view tab',pattern.id)

            if(patternId + 1 == this.patterns.length){
                tune.end =  true
            }

            var nextId  = ((patternId + 1) % this.patterns.length)

            this.playTimer = setTimeout(function () {
                    if(tune.end){
                        eventBus.emit('pattern has reached loop limit')
                        tune.stop()
                        console.log('Tune terminer')
                        return
                    }
                 
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
