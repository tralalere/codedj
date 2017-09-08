define([
    'jquery'
], function ($) {


    function Timeline (params) {
        this.initView(params)
    }


    Timeline.prototype.initView = function (params) {
        this.view = $('<tr>')

        this.view.append('<th class="btn">' + params.sampleName)
        for (var i = 0; i < params.beats; i++) {
        // for (var i = 0; i < params.beats; i += 0.25) {
            var $beat = $('<tr></tr>')
            this.view.append($beat)
            for (var j = 0; j < 1; j += 0.25) {
                $beat.append('<td class="beat_' +  beatToClass(i + j + 1) + '"></td>')
                // this.view.append('<td class="beat_' +  beatToClass(i + 1) + '"></td>')
            }
        }

        params.container.append(this.view)
    }


    Timeline.prototype.displayNote = function (params) {
        this.view.find('.beat_' + beatToClass(params.beat)).addClass(params.class)
    }


    function beatToClass (beat) {
        var int = Math.floor(beat)
        var decimal = (beat - int) * 100
        return int + '_' + decimal
    }



    return Timeline

})
