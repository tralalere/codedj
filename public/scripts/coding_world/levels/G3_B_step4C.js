define(function () {


    var musicLoops = [
        {
            loopName: 'G3_1bass',
            source:   'G3/1 - BASS.wav'
        },
        {
            loopName: 'G3_1piano',
            source:   'G3/1 - PIANO.wav'
        },
        {
            loopName: 'G3_1voix',
            source:   'G3/1 - VOIX.wav'
        },
        {
            loopName: 'G3_2arp',
            source:   'G3/2 - ARP.wav'
        }
    ]


    var sounds = [
        {
            soundName: 'G3_CLAP',
            soundSource: 'samples/G3/CLAP.wav'
        },
        {
            soundName: 'G3_HITHAT',
            soundSource: 'samples/G3/HH.wav'
        },
        {
            soundName: 'G3_KICK',
            soundSource: 'samples/G3/KICK.wav'
        },
        {
            soundName: 'G3_SNARE',
            soundSource: 'samples/G3/SNARE.wav'
        }
    ]

    var init = [
        'tempo = 130',
        'var pattern  = new Pattern({loopLimit: 2})',

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
                '// Mettre 3 à la place du 1 dans (i%4 === 3) permet au clap d\'être joué aux temps 3, 7, 11, et 15',
                'for (var i = 1; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(hh, i)',
                'if (i%4 === 3){',
                'pattern.addSound(clap, i)',
                '}',
                '}'
            ],
            base: [
                '// Change une valeur dans i%4 === 1 pour retrouver le bon rythme',
                '// % est un signe qui permet de trouver le RESTE d\'une division.',
                '// Par exemple 7 divisé par 2 donne 3 et il reste 1, donc 7%2 donne 1.',
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
                '// Avec une valeur passée à 4, le bon rythme est retrouvé',
                'for (var i = 3; i < 17; i = i + 4)',
                '{',
                'pattern.addSound(snare, i)',
                '}'
            ],
            base: [
                '// Change la valeur dans i = i + 2 pour retrouver le bon rythme',
                'for (var i = 3; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(snare, i)',
                '}'
            ]
        },
        {
            solution: [
                '// Mettre 3 à la place du 6 dans (i%4 === 3) permet au clap d\'être joué aux temps 3, 7, 11, et 15',
                'for (var i = 1; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(hh, i)',
                'if (i%4 === 3){',
                'pattern.addSound(clap, i)',
                '}',
                '}'
            ],
            base: [
                '// Change une valeur dans i%4 === 6 pour retrouver le bon rythme',
                '// % est un signe qui permet de trouver le RESTE d\'une division.',
                '// Par exemple 7 divisé par 2 donne 3 et il reste 1, donc 7%2 donne 1.',
                'for (var i = 1; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(hh, i)',
                'if (i%4 === 6){',
                'pattern.addSound(clap, i)',
                '}',
                '}'
            ]
        }
    ]

    var end = [
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
    ]


    return {
        init: init,
        portions: portions,
        end: end,
        isolatePortions: true,
        musicLoops: musicLoops,
        sounds: sounds,
        minimumGoodAnswers: 2
    }


})
