define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G2_2SYNTH',
            soundSource: 'loops/new_loops/G2/2 - SYNTH.wav'
        },
        {
            soundName: 'G2_2VOIX',
            soundSource: 'loops/new_loops/G2/2 - VOIX 1.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var synth   = new Instrument("G2_2SYNTH")',
        'var voix = new Instrument("G2_2VOIX")'
    ]

    var portions = [
        {
            solution: [
                'pattern.addSound(synth, 1)'
            ],
            base: [
                'pattern.addSound(synth, 2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(voix, 1)'
            ],
            base: [
                'pattern.addSound(voix,  2.5)'
            ]
        }
    ]

    var end = [

    ]


    return {
        init: init,
        portions: portions,
        end: end,
        musicLoops: musicLoops,
        sounds: sounds,
        minimumGoodAnswers: 2
    }


})
