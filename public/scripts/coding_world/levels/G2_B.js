define(function () {


    var musicLoops = [
        {
            loopName: 'G2_BASS',
            source:   'G2/1 - BASS.wav'
        },
        {
            loopName: 'G2_SYNTH2',
            source:   'G2/1 - SYNTH 2.wav'
        },
        {
            loopName: 'G2_VOIX1',
            source:   'G2/1 - VOIX 1.wav'
        },
        {
            loopName: 'G2_VOIX2',
            source:   'G2/1 - VOIX 2.wav'
        },
        {
            loopName: 'G2_2VOIX3',
            source:   'G2/2 - VOIX 3.wav'
        }
    ]


    var sounds = [
        {
            soundName: 'G2_CLAP',
            soundSource: 'samples/G2/CLAP.wav'
        },
        {
            soundName: 'G2_KICK',
            soundSource: 'samples/G2/KICK.wav'
        },
        {
            soundName: 'G2_SNARE',
            soundSource: 'samples/G2/SNARE.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',

        'var clap = new Instrument("G2_CLAP")',
        'var kick = new Instrument("G2_KICK")',
        'var snare = new Instrument("G2_SNARE")'
    ]

    var portions = [
        {
            solution: [
                '// Réduire la valeur dans i === 5.5 a permis de trouver le bon moment auquel ajouter un son',
				'for (var i = 1.5; i < 17; i = i + 4)',
				'{',
				'    pattern.addSound(snare, i)',
                '    if (i === 5.5) {',
				'        pattern.addSound(snare, i + 1)',
				'    }',
				'}',
                '',
                'pattern.addSound(snare, 2.25)',
                'pattern.addSound(snare, 6.25)',
                'pattern.addSound(snare, 10.25)',
                'pattern.addSound(snare, 13.75)',
                'pattern.addSound(snare, 16)',
                'pattern.addSound(snare, 16.25)',
                'pattern.addSound(snare, 16.75)'
            ],
            base: [
                '// Essaie de faire baisser la valeur dans i === 9.5 et regarde comment ça affecte le son',
				'for (var i = 1.5; i < 17; i = i + 4)',
				'{',
				'    pattern.addSound(snare, i)',
                '    if (i === 9.5){',
                '        pattern.addSound(snare, i + 1)',
                '    }',
				'}',
                '',
                'pattern.addSound(snare, 2.25)',
                'pattern.addSound(snare, 6.25)',
                'pattern.addSound(snare, 10.25)',
                'pattern.addSound(snare, 13.75)',
                'pattern.addSound(snare, 16)',
                'pattern.addSound(snare, 16.25)',
                'pattern.addSound(snare, 16.75)'
            ]
        },
        {
            solution: [
                 '// Réduire la valeur dans i === 4.5 a permis de trouver le bon moment pour faire sauter des temps avant de recommencer à ajouter des sons',
				'for (var i = 2.5; i < 17; i = i + 1)',
				'{',
				'    pattern.addSound(kick, i)',
                '    if (i === 4.5) {',
                '        i = i + 3',
                '    } else if (i === 8.5) {',
                '        i = i + 2',
                '    } else if (i === 12.5) {',
                '        i = i + 2',
                '    }',
				'}',
                '',
                'pattern.addSound(kick, 1)',
                'pattern.addSound(kick, 3.75)',
                'pattern.addSound(kick, 5)',
                'pattern.addSound(kick, 8.75)',
                'pattern.addSound(kick, 9)',
                'pattern.addSound(kick, 11.75)',
                'pattern.addSound(kick, 13)'
            ],
            base: [
				'// Essaie de faire baisser la valeur dans i === 5.5 et regarde comment ça affecte le son',
				'for (var i = 2.5; i < 17; i = i + 1)',
				'{',
				'    pattern.addSound(kick, i)',
                '    if (i === 5.5){',
                '        i = i + 3',
                '    } else if ( i === 8.5) {',
                '        i = i + 2',
                '    } else if ( i === 12.5) {',
                '        i = i + 2',
                '    }',
				'}',
                '',
                'pattern.addSound(kick, 1)',
                'pattern.addSound(kick, 3.75)',
                'pattern.addSound(kick, 5)',
                'pattern.addSound(kick, 8.75)',
                'pattern.addSound(kick, 9)',
                'pattern.addSound(kick, 11.75)',
                'pattern.addSound(kick, 13)'
            ]
        },
        {
            solution: [
				'for (var i = 3; i < 17; i = i + 8)',
				'{',
				'    pattern.addSound(clap, i)',
				'}',
                '',
                'pattern.addSound(clap, 7)',
                'pattern.addSound(clap, 15)'
            ],
            base: [
                '// Prenons un petit break. Il suffit de changer les valeurs des dernières lignes pour retrouver le bon rhytme',
				'for (var i = 3; i < 17; i = i + 8)',
				'{',
				'    pattern.addSound(clap, i)',
				'}',
                '',
				'pattern.addSound(clap, 4)',
                'pattern.addSound(clap, 12)'
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
