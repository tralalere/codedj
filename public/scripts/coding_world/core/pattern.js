define([
    './note',
    './user_to_core',
    'toxilibs/event_bus_queued',
    './timeline_tab',
    '../../ext_libs/lodash/lodash',
], function (Note, userToCoreKeys,globalEventBus,createTabConstructor,lodash) {
    var eventBus = globalEventBus('view')
    var Tab = createTabConstructor(eventBus)


    function createPatternConstructor (eventBus) {
        var IDCounter = 0
        
        function Pattern (params) {
            this.id             = IDCounter++

            params              = params                || {}
            this.mesuresCount   = params.mesuresCount   || 4
            this.beatsPerMesure = params.beatsPerMesure || 4
            this.notes          = []
            this.beatDuration   = (60 * 1000) / userToCoreKeys.tempo
            this.loop           = (typeof params.loop !== 'undefined') ? params.loop : true
            this.loopLimit      = params.loopLimit
            this.loopTimes      = 0

            this.name           = (typeof params !== 'undefined' && typeof params !== 'object') ? params : 'pattern id:'+this.id
            
            if(params.name){
                this.name = params.name
            }
            
            if(this.id !== 0){
                this.tab        = new Tab(this.name)
            } else{
                if(params.name){
                    eventBus.emit('change name first Tab', this)

                }
            }



            var pattern = this
            
            
            
            eventBus.on('reset', function () {
                pattern.stop()
                IDCounter = 0
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
                soundName: params.soundName,
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
            this.beatDuration = (60 * 1000) / userToCoreKeys.tempo
            var pattern = this
            pattern.playBeat(1)
        }


        Pattern.prototype.stop = function () {
            clearTimeout(this.playTimer)
        }


        Pattern.prototype.playBeat = function (beat, delay) {
            this.beatDuration = (60 * 1000) / userToCoreKeys.tempo
            delay = delay || 0
            if (beat === 1) {
                this.startTime = Date.now()
            }
            var beatAndPattern = {beat : beat, patternId : this.id}
            eventBus.emit('pattern beat played',beatAndPattern)
            playNotes(this.notesAtTime(beat), delay, this.beatDuration)
            var nextTime = this.startTime + beat * this.beatDuration
            var pattern  = this

            if (!this.loop && beat >= this.totalBeats()) {
                return
            }
            var nextBeat = (beat % this.totalBeats()) + 1
            this.playTimer = setTimeout(function () {
                if (beat >= pattern.totalBeats()) {
                    eventBus.emit('samples loop stop requested', {samples: true})
                    eventBus.emit('reset')
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


        Pattern.prototype.export = function () {

            // TODO : extraction des notes à refaire plus proprement, objet recrée pour le stringify.
            
            var myObjectNotes = {}

            var notesCloned = lodash.cloneDeep(this.notes)

            notesCloned.forEach(function (val, key) {
                myObjectNotes[key] = {
                    soundName:  lodash.cloneDeep(val.soundName),
                    start:      lodash.cloneDeep(val.start),
                    volume:     lodash.cloneDeep(val.volume),
                    transpose:  lodash.cloneDeep(val.transpose),
                    isCorrect:  lodash.cloneDeep(val.isCorrect),
                    isSolutionNote: lodash.cloneDeep(val.isSolutionNote),
                    sample: lodash.cloneDeep(val.sample),
                    duration: lodash.cloneDeep(val.duration)
                }

                if (myObjectNotes[key].soundName === "CongaA" || myObjectNotes[key].soundName === "CongaB" || myObjectNotes[key].soundName === "CongaC" )
                {

                    var newInstrumentConga = {}

                    var nameFieldConga = ["CongaA","CongaB","CongaC"]

                    var instrumentFromConga = lodash.cloneDeep(myObjectNotes[key].sample.instrument)

                    newInstrumentConga = {
                        soundSource:newInstrumentConga.soundSource,
                        soundName:newInstrumentConga.soundName,
                        ownVolume:newInstrumentConga.ownVolume,
                        __proto__:newInstrumentConga.__proto__,
                        volume: newInstrumentConga.volume,
                        samples:{},
                    }

                    for(const name of nameFieldConga){
                        newInstrumentConga[name] = {
                            eventBus:instrumentFromConga[name].eventBus,
                            soundSource:instrumentFromConga[name].soundSource,
                            soundName:instrumentFromConga[name].soundName,
                            ownVolume:instrumentFromConga[name].ownVolume,
                        }

                        newInstrumentConga.samples[name] = newInstrumentConga[name]
                    }

                    myObjectNotes[key].sample.instrument = lodash.cloneDeep(newInstrumentConga)

                } else{
                    for(var item in  myObjectNotes[key].sample.samples){

                        var instrument = lodash.cloneDeep(myObjectNotes[key].sample.samples[item].instrument)

                        var newInstrument = {}

                        newInstrument = {
                            sound:instrument.sound,
                            soundName:instrument.soundName,
                            volume:instrument.volume,
                            play:instrument.play,
                            mainSample:{
                                eventBus:instrument.mainSample.eventBus,
                                ownVolume:instrument.mainSample.ownVolume,
                                soundName:instrument.mainSample.soundName,
                                soundSource:instrument.mainSample.soundSource,
                            }
                        }

                        myObjectNotes[key].sample.samples[item].instrument = lodash.cloneDeep(newInstrument)
                        myObjectNotes[key].sample[item].instrument = lodash.cloneDeep(newInstrument)

                    }
                }



            }, this)

            var myPattern = JSON.stringify(myObjectNotes)



            return {
                id: this.id,
                totalBeats: this.totalBeats(),
                name:this.name,
                notes: myPattern,
                duration:this.duration()

            }

        }


        return Pattern

    }


    return createPatternConstructor

})
