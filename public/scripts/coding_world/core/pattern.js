define([
    './note',
    './user_to_core',
    'toxilibs/event_bus_queued',
    './timeline_tab'
], function (Note, userToCoreKeys,globalEventBus,createTabConstructor) {
    var eventBus = globalEventBus('view')
    var Tab = createTabConstructor(eventBus)
    function createPatternConstructor (eventBus) {
        var IDCounter = 0

        function Pattern (params) {
            console.log('tempo', userToCoreKeys.tempo)

            this.id             = IDCounter++

            params              = params                || {}
            this.mesuresCount   = params.mesuresCount   || 4
            this.beatsPerMesure = params.beatsPerMesure || 4
            this.notes          = []
            this.beatDuration   = params.beatDuration || (60 * 1000) / userToCoreKeys.tempo
            this.loop           = (typeof params.loop !== 'undefined') ? params.loop : false
            this.loopLimit      = params.loopLimit
            this.loopTimes      = 0


            this.name           = (typeof params !== 'undefined' && typeof params !== 'object') ? params : 'pattern'+this.id
            if(this.id !== 0){
                this.tab        = new Tab(this.name)
            }



            var pattern = this
            eventBus.on('reset', function () {
                pattern.stop()
                IDCounter = 0
            })

            eventBus.on('loop stop requested', function () {
                pattern.stop()
            })

            eventBus.emit('new pattern', this)
        }


        Pattern.prototype.addSound = function (sample, start, params) {
            params = params || {}
            if (Math.floor(start) > this.totalBeats()) {
                return
            }
            var note = new Note({
                pattern:   this,
                sample:    sample,
                start:     start,
                volume:    params.volume,
                transpose: params.transpose,
                duration:  params.duration
            })

            this.notes.push(note)

            eventBus.emit('note added', note)
            
            if(this.tab){
                this.tab.add(note.sample)
            }
            


        }


        Pattern.prototype.play = function () {
            //this.beatDuration = (60 * 1000) / userToCoreKeys.tempo
            var pattern = this
            pattern.playBeat(1)
        }




        Pattern.prototype.stop = function () {
            clearTimeout(this.playTimer)
        }


        Pattern.prototype.playBeat = function (beat, delay) {
           // this.beatDuration = (60 * 1000) / userToCoreKeys.tempo
            delay = delay || 0
            if (beat === 1) {
                this.startTime = Date.now()
            }
            eventBus.emit('pattern beat played', this, beat)
            playNotes(this.notesAtTime(beat), delay, this.beatDuration)
            var nextTime = this.startTime + beat * this.beatDuration
            var pattern  = this

            if (!this.loop && beat >= this.totalBeats()) {
                return
            }
            var nextBeat = (beat % this.totalBeats()) + 1
            this.playTimer = setTimeout(function () {
                if (beat >= pattern.totalBeats()) {
                    eventBus.emit('loop stop requested', {samples: true})
                    if (pattern.loopLimit) {
                        pattern.loopTimes++
                        if (pattern.loopTimes >= pattern.loopLimit) {
                            eventBus.emit('pattern has reached loop limit')
                            return
                        }
                    }
                }
                pattern.playBeat(nextBeat, Date.now() - nextTime)
            }, nextTime - Date.now())
        }


        function playNotes (notes, delay, beatDuration) {
            for (var i = 0; i < notes.length; i++) {
                var note = notes[i]
                var beatDelay = note.start - Math.floor(note.start)
                var silenceLength = 1000 - (beatDuration * beatDelay)
                note.play(silenceLength + delay)
            }
        }


        Pattern.prototype.totalBeats = function () {
            return this.mesuresCount * this.beatsPerMesure
        }


        Pattern.prototype.duration = function () {
            return this.mesuresCount * this.beatsPerMesure * this.beatDuration
        }


        Pattern.prototype.notesAtTime = function (time) {
            var notes = []
            for (var i = 0; i < this.notes.length; i++) {
                var note = this.notes[i]
                if (Math.floor(note.start) === time) {
                    notes.push(note)
                }
            }
            return notes
        }


        return Pattern

    }


    return createPatternConstructor

})
