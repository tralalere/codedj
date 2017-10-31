define([
    'jquery',
    'toxilibs/event_bus_queued',
    './core/world_main',
    './core/user_to_core',

    './view/main',
    './view/editor',
    './user_code/user_code',
    'music_player/music_player'
], function ($, globalEventBus, World, userToCoreKeys) {

    var initialCode = [
        'var pattern = new Pattern()',
        '',
        'var hitHat = new Instrument(\'samples/G1/HH.wav\')',
        'var kick   = new Instrument(\'samples/G1/KICK.wav\')',
        'var rim    = new Instrument(\'samples/G1/RIM.wav\')',
        'var shaker = new Instrument(\'samples/G1/SHAKER_1.wav\')',
        'var snare  = new Instrument(\'samples/G1/SNARE.wav\')',
        'var tom    = new Instrument(\'samples/G1/TOM.wav\')',
        'var conga  = new Instrument()',
        '',
        'conga.addSample(\'CongaA\',\'samples/G1/CONGA_1.wav\')',
        'conga.addSample(\'CongaB\',\'samples/G1/CONGA_2.wav\')',
        'conga.addSample(\'CongaC\',\'samples/G1/CONGA_3.wav\')',
        '',
        'pattern.addSound(rim, 2)',
        'pattern.addSound(rim, 4)',
        'pattern.addSound(tom, 6)',
        'pattern.addSound(tom, 8)',
        'pattern.addSound(snare, 10)',
        'pattern.addSound(snare, 12)',
        'pattern.addSound(snare, 14)',
        'pattern.addSound(snare, 16)',
        'pattern.addSound(shaker, 16)',
        '',
        'pattern.play()'
    ]


    var tunes    = []
    var patterns = []

    var userToken

    function init () {
        userToken = Date.now()
        $('#btn_save').removeClass('invisible')
        $('#btn_load').removeClass('invisible')
        $('#btn_solution').addClass('invisible')

        globalEventBus.emit('html ready')
        globalEventBus.emit('volume updated', 100)
        globalEventBus.emit('monde3')
        globalEventBus.on('reset', function () {
            tunes    = []
            patterns = []
        })
        globalEventBus.on('new pattern', function (pattern) {
            patterns.push(pattern)
        })
        globalEventBus.on('new tune', function (tune) {
            tunes.push(tune)
        })

        new World(globalEventBus, {
            exposed: initialCode.join('\n')
        })




    }






    globalEventBus.on('save creation requested', saveCreation)


    function saveCreation () {
        var notes = []

        if (tunes.length > 0) {
            for (var i in tunes) {
                var tune = tunes[i]
                browsePatterns(tune.patterns, notes)
            }
        } else {
            browsePatterns(patterns, notes)
        }

        $.get(document.location.origin+document.location.pathname+'export', {notes: JSON.stringify(notes), token: userToken}, function () {
            window.location = document.location.origin+document.location.pathname+'/download?token=' + userToken
        })
    }


    function browsePatterns (patterns, notes) {
        for (var i in patterns) {
            var pattern = patterns[i]
            extractNotes(pattern, i, notes)
        }
    }


    function extractNotes (pattern, patternIndex, notes) {
        for (var i in pattern.notes) {
            var note = pattern.notes[i]
            var patternDuration = Math.floor(pattern.duration() * patternIndex)
            notes.push({
                start: (note.start - 1) * Math.floor((60 * 1000) / userToCoreKeys.tempo) + patternDuration,
                soundName: note.soundSource()
            })
        }
    }



    return init

})
