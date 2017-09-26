define([
    'jquery'
], function ($) {


    function Timeline (params) {
        this.initView(params)
        this.sampleName = params.sampleName
    }


    Timeline.prototype.initView = function (params) {
        this.view = $('<tr>')

        this.view.append('<th class="btn">' + params.sampleName)
        for (var i = 0; i < params.beats; i++) {
            var $beat = $('<tr></tr>')
            this.view.append($beat)
            for (var j = 0; j < 1; j += 0.25) {
                $beat.append('<td class="beat_' +  beatToClass(i + j + 1) + '"></td>')
            }
        }

        params.container.append(this.view)
    }


    Timeline.prototype.displayNote = function (params) {
        this.view.find('.beat_' + beatToClass(params.beat)).addClass(params.class)
    }


    Timeline.prototype.show = function () {
        this.view.show()
    }


    Timeline.prototype.hide = function () {
        this.view.hide()
    }


    function beatToClass (beat) {
        var int = Math.floor(beat)
        var decimal = (beat - int) * 100
        return int + '_' + decimal
    }



    return Timeline

})
