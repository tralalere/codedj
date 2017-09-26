define([
    'jquery',
    'toxilibs/event_bus_queued',
    './core/world_main',

    './view/main',
    './view/editor',
    './user_code/user_code',
    'music_player/music_player'
], function ($, globalEventBus, World) {

    var initialCode = [
        'var pattern = new Pattern()',
        '',
        'var hitHat = new Instrument(\'samples/G1/HH.wav\')',
        'var kick   = new Instrument(\'samples/G1/KICK.wav\')',
        'var rim    = new Instrument(\'samples/G1/RIM.wav\')',
        'var shaker = new Instrument(\'samples/G1/SHAKER_1.wav\')',
        'var snare  = new Instrument(\'samples/G1/SNARE.wav\')',
        'var tom    = new Instrument(\'samples/G1/TOM.wav\')',
        'var clap   = new Instrument(\'samples/G2/CLAP.wav\')',
        'var conga  = new Instrument()',
        '',
        'conga.addSample(\'CongaA\',\'samples/G1/CONGA_1.wav\')',
        'conga.addSample(\'CongaB\',\'samples/G1/CONGA_2.wav\')',
        'conga.addSample(\'CongaC\',\'samples/G1/CONGA_3.wav\')',
        '',
        'pattern.addSound(snare, 2)',
        'pattern.addSound(snare, 4)',
        'pattern.addSound(snare, 6)',
        'pattern.addSound(snare, 8)',
        'pattern.addSound(snare, 10)',
        'pattern.addSound(snare, 12)',
        'pattern.addSound(snare, 14)',
        'pattern.addSound(snare, 16)',
        'pattern.addSound(shaker, 16)',
        '',
        'pattern.play()'
    ]

    function init () {
        $('#btn_save').removeClass('invisible')
        $('#btn_load').removeClass('invisible')
        $('#btn_solution').addClass('invisible')

        globalEventBus.emit('html ready')
        globalEventBus.emit('volume updated', 100)
        globalEventBus.emit('monde3')
        new World(globalEventBus, {
            exposed: initialCode.join('\n')
        })

    }


    globalEventBus.on('save sound', saveSound)


    function saveSound (pattern) {

    }



    return init

})
