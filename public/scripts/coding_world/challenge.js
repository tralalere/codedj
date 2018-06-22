define([
    'toxilibs/event_bus_queued',
    '../music_player/music_player',
], function (globalEventBus, musicPlayer) {

    function Challenge (challengeData) {
        this.challengedIndex = 0
        this.challengeData   = challengeData
        this.setupCodes(challengeData)

        this.loopsPlaying = false
        loadLoops(challengeData)
    }


    Challenge.prototype.nextQuestion = function () {
        this.challengedIndex = (this.challengedIndex + 1) % this.challengeData.portions.length
        this.setupCodes(this.challengeData)
    }


    Challenge.prototype.useCurentQuestionLater = function () {
        this.challengeData.portions.push(this.challengeData.portions.splice(this.challengedIndex, 1)[0])
    }


    Challenge.prototype.setupCodes = function () {
        var portionsBefore = []
        var portionsAfter  = []
        
        if (!this.challengeData.isolatePortions) {
            for (var i = 0; i < this.challengeData.portions.length; i++) {
                var portion = this.challengeData.portions[i].solution
                if (typeof portion === 'object') {
                    portion = portion.join('\n')
                }
                if (i < this.challengedIndex) {
                    portionsBefore.push(portion)
                } else if (i > this.challengedIndex) {
                    portionsAfter.push(portion)
                }
            }
        }

        var challengedPortion = this.challengeData.portions[this.challengedIndex]

        this.solution = {
            start:   this.challengeData.init.concat(portionsBefore),    // Not dry but must not be a reference
            exposed: challengedPortion.solution,
            end:     portionsAfter.concat(this.challengeData.end)
        }
        this.base     = {
            start:   this.challengeData.init.concat(portionsBefore),
            exposed: challengedPortion.base,
            end:     portionsAfter.concat(this.challengeData.end)
        }

        console.log(this.base)
        console.log(this.solution)

        addSpaceToBaseAndSolution(this.solution.exposed)
        addSpaceToBaseAndSolution(this.solution.end)

        addSpaceToBaseAndSolution(this.exposed)
        addSpaceToBaseAndSolution(this.end)


    }


    Challenge.prototype.launchLoops = function () {
        var loops = this.challengeData.musicLoops
        if (!this.loopsPlaying && typeof loops !== 'undefined') {
            for (var i = 0; i < loops.length; i++) {
                globalEventBus.emit('play sound requested', {
                    name: loops[i].loopName
                })
            }
        }
    }


    Challenge.prototype.minimumGoodAnswers = function () {
        return this.challengeData.minimumGoodAnswers
    }


    function loadLoops (data) {
        for (var i = 0; i < data.musicLoops.length; i++) {
            var loop = data.musicLoops[i]
            musicPlayer.addLoop(loop)
        }

        for (var j = 0; j < data.sounds.length; j++) {
            musicPlayer.addSound(data.sounds[j])
        }
    }

    function addSpaceToBaseAndSolution (arraySting){
        if(arraySting && arraySting.length > 0){
            arraySting.forEach(function(val){
                console.log(val)
            })
        }

    }



    return Challenge


})
