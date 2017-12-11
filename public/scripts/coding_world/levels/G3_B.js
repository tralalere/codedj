define(function () {


    var musicLoops = [
        {
            loopName: 'G3_BASS',
            source:   'G3/1 - BASS.mp3'
        },
        {
            loopName: 'G3_PIANO',
            source:   'G3/1 - PIANO.mp3'
        },
        {
            loopName: 'G3_VOIX',
            source:   'G3/1 - VOIX.mp3'
        },
        {
            loopName: 'G3_2ARP',
            source:   'G3/2 - ARP.mp3'
        }
    ]


    var sounds = [
        {
            soundName: 'G3_CLAP',
            soundSource: 'samples/G3/CLAP.mp3'
        },
        {
            soundName: 'G3_HITHAT',
            soundSource: 'samples/G3/HH.mp3'
        },
        {
            soundName: 'G3_KICK',
            soundSource: 'samples/G3/KICK.mp3'
        },
        {
            soundName: 'G3_SNARE',
            soundSource: 'samples/G3/SNARE.mp3'
        }
    ]

    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',
        'var clap = new Instrument("G3_CLAP")',
        'var hh = new Instrument("G3_HITHAT")',
        'var kick = new Instrument("G3_KICK")',
        'var snare = new Instrument("G3_SNARE")'
    ]

    var portions = [
        {
            solution: [
                '// Il fallait donc bien mettre 3 pour que des claps soient ajoutés aux temps 3, 7, 11, et 15',
                'for (var i = 1; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(hh, i)',
                'if (i%4 === 3){',
                'pattern.addSound(clap, i)',
                '}',
                '}'
            ],
            base: [
                '// change une valeur dans i%4 === 1 pour retrouver le bon rhytme',
                'for (var i = 1; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(hh, i)',
                'if (i%4 === 1){',
                'pattern.addSound(clap, i)',
                '}',
                '}'
            ]
        },
        {
            solution: [
                '// Avec les valeurs 0.5 et 1.5 inversées, et la condition i === 1 passée à i === 13, on retrouve le bon rhytme ',
                'for (var i = 1; i < 17; i+=4)',
                '{',
                'pattern.addSound(kick, i)',
                'if (i === 5){',
                'pattern.addSound(kick, (i-0.5))',
                '} else if ( i === 9) {',
                'pattern.addSound(kick, (i-1.5))',
                '} else if ( i === 13) {',
                'pattern.addSound(kick, (i+3.75))',
                '}',
                '}'
            ],
            base: [
                '// change une valeur dans chaque section if pour retrouver le bon rhytme',
                'for (var i = 1; i < 17; i+=4)',
                '{',
                'pattern.addSound(kick, i)',
                'if (i === 5){',
                'pattern.addSound(kick, (i-1.5))',
                '} else if ( i === 9) {',
                'pattern.addSound(kick, (i-0.5))',
                '} else if ( i === 1) {',
                'pattern.addSound(kick, (i+3.75))',
                '}',
                '}'
            ]
        },
        {
            solution: [
                '// Avec une valeur passée à 4, le bon rhytme est retrouvé',
                'for (var i = 3; i < 17; i = i + 4)',
                '{',
                'pattern.addSound(snare, i)',
                '}'
            ],
            base: [
                '// change la valeur dans i = i + 2 pour retrouver le bon rhytme',
                'for (var i = 3; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(snare, i)',
                '}'
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
