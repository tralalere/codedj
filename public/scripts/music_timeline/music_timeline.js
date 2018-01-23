define([
    'jquery'
], function ($) {


    function Timeline (params) {
        this.initView(params)
        this.sampleName = params.sampleName
    }


    /*TODO : Ajout de mesure sous la timeline pour Amine*/

    Timeline.prototype.initView = function (params) {
        this.view = $('<tr>')
        var soundName = params.sampleName.split('/')
        soundName = soundName[soundName.length - 1]

        this.view.append('<th class="btn">' + soundName.split('.')[0])

        this.beatReference = $('<tr class="numberReference">')
        this.beatReference.append('<th class="btn">')



        for (var i = 0; i < params.beats; i++) {
            var $beat = $('<tr></tr>')
            var $beatForRef = $('<tr></tr>')

            this.view.append($beat)
            this.beatReference.append($beatForRef)

            
            for (var j = 0; j < 1; j += 0.25) {
                var k = j*100;
                $beat.append('<td style="left:'+k+'%" class=" beat_' +  beatToClass(i + j + 1) + '"></td>')
            }

            $beatForRef.append('<td class="beat_ref_' + i + ' beat_ref"><div>' + (i + 1) + '</div></td>')
        }

        params.container.append(this.view)

        if ($('.numberReference').length == 0) {
            params.container.append(this.beatReference)
        }

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
