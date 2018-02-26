define([], function () {

    function Sample (params) {
        this.instrument  = params.instrument
        this.soundName   = params.soundName
        this.soundSource = params.soundSource
        this.ownVolume   = (typeof params.volume === 'undefined') ? 1 : params.volume
        this.eventBus    = params.eventBus

        this.eventBus.emit('sample created', params)
    }


    Sample.prototype.volume = function () {
        return this.instrument.volume * this.ownVolume
    }


    Sample.prototype.play = function (note, delay) {
        this.eventBus.emit('play note requested', {
            note:   note,
            volume: note.volume * this.volume(),
            delay:  delay
        })
    }


    Sample.prototype.export = function () {
        return {
            soundName: this.soundName
        }
    }


    return Sample

})
