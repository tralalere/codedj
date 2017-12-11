define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G2_PAD',
            soundSource: 'loops/G2/1 - PAD.wav'
        },
        {
            soundName: 'G2_SYNTH',
            soundSource: 'loops/G2/1 - SYNTH.wav'
        },
        {
            soundName: 'G2_VOIX1',
            soundSource: 'loops/G2/1 - VOIX 1.wav'
        },
        {
            soundName: 'G2_VOIX3',
            soundSource: 'loops/G2/1 - VOIX 3.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var pad   = new Instrument("G2_PAD")',
        'var synth = new Instrument("G2_SYNTH")',
        'var voix1  = new Instrument("G2_VOIX1")',
        'var voix3  = new Instrument("G2_VOIX3")'
    ]

    var portions = [
        {
            solution: [
                'pattern.addSound(pad, 1)'
            ],
            base: [
                'pattern.addSound(pad, 2.5)'
            ]
        },
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
                'pattern.addSound(voix1, 1)'
            ],
            base: [
                'pattern.addSound(voix1, 2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(voix3, 1)'
            ],
            base: [
                'pattern.addSound(voix3, 2.5)'
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
