define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G3_BASS',
            soundSource: 'loops/G3/1 - BASS.mp3'
        },
        {
            soundName: 'G3_SYNTH',
            soundSource: 'loops/G3/1 - SYNTH.mp3'
        },
        {
            soundName: 'G3_2VOIX',
            soundSource: 'loops/G3/2 - VOIX.mp3'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var synth = new Instrument("G3_SYNTH")',
        'var piano = new Instrument("G3_PIANO")',
        'var voix  = new Instrument("G3_2VOIX")'
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
                'pattern.addSound(piano, 1)'
            ],
            base: [
                'pattern.addSound(piano,  2.5)'
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
