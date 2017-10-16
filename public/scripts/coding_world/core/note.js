define([], function () {


    function Note (params) {
        params         = params || {}
        this.pattern   = params.pattern
        this.sample    = params.sample
        this.start     = params.start     || 1
        this.transpose = params.transpose || 0
        this.volume    = (typeof params.volume   === 'undefined') ? 1 : params.volume
        this.duration  = (typeof params.duration === 'undefined') ? 1 : params.duration
    }


    Note.prototype.soundName = function () {
        return this.sample.soundName
    }


    Note.prototype.soundSource = function () {
        return this.sample.soundSource || this.sample.soundName
    }


    Note.prototype.play = function (delay) {
        this.sample.play(this, delay)
    }


    Note.prototype.isSimilarTo = function (otherNote) {
        return  otherNote.soundName() === this.soundName() &&
                otherNote.start       === this.start &&
                otherNote.volume      === this.volume &&
                otherNote.transpose   === this.transpose
    }


    return Note

})
