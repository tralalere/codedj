define([], function () {


    function Note (params) {
        params         = params || {}
        this.pattern   = params.pattern
        this.sample    = params.sample
        this.soundName = params.soundName || this.sample.soundName
        this.start     = params.start     || 1
        this.transpose = params.transpose || 0
        this.volume    = (typeof params.volume   === 'undefined') ? 1 : params.volume
        this.duration  = (typeof params.duration === 'undefined') ? 1 : params.duration
    }


    Note.prototype.soundSource = function () {
        return this.sample.soundSource || this.sample.soundName
    }


    Note.prototype.play = function (delay) {
        this.sample.play(this, delay)
    }


    Note.prototype.isSimilarTo = function (otherNote) {
        return  otherNote.soundName   === this.soundName &&
                otherNote.start       === this.start &&
                otherNote.volume      === this.volume &&
                otherNote.transpose   === this.transpose
    }


    Note.prototype.export = function () {
        return {
            pattern:    this.pattern.export(),
            soundName:  this.soundName,
            soundSource:  this.soundSource(),
            start:      this.start,
            volume:     this.volume,
            transpose:  this.transpose,
            isCorrect:  this.isCorrect,
            isSolutionNote: this.isSolutionNote
        }
    }


    return Note

})
