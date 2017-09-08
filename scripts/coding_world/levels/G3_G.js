define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G3_2PIANO',
            soundSource: 'loops/new_loops/G3/2 - PIANO.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var piano = new Instrument("G3_2PIANO")'
    ]

    var portions = [
        {
            solution: [
                'pattern.addSound(piano, 1)'
            ],
            base: [
                'pattern.addSound(piano, 2.5)'
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
        minimumGoodAnswers: 1
    }


})
