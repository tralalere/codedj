define(function () {


    var musicLoops = [
        {
            loopName: 'G2_1bass',
            source:   'G2/1 - BASS.wav'
        },
        {
            loopName: 'G2_1synth2',
            source:   'G2/1 - SYNTH 2.wav'
        },
        {
            loopName: 'G2_1voix1',
            source:   'G2/1 - VOIX 1.wav'
        },
        {
            loopName: 'G2_1voix2',
            source:   'G2/1 - VOIX 2.wav'
        },
        {
            loopName: 'G2_2voix3',
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
        'var pattern  = new Pattern({loopLimit: 2})',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',

        'var clap = new Instrument("G2_CLAP")',
        'var kick = new Instrument("G2_KICK")',
        'var snare = new Instrument("G2_SNARE")'
    ]

    var portions = [
        {
            solution: [
                '// Réduire la valeur à 5.5 dans i === 5.5 permet de trouver le bon moment pour ajouter un son',
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
                '// Essaie de faire baisser la valeur 9.5 dans i === 9.5 et regarde comment ce changement affecte les sons',
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
                 '// Réduire à 4.5 la valeur dans i === 4.5 permet de sauter des temps avant de recommencer à ajouter des sons',
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
				'// Essaie de faire baisser un peu la valeur 5.5 dans i === 5.5 et regarde comment ce changement affecte les sons',
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
        }
    ]

    var end = [
			'for (var i = 3; i < 17; i = i + 8)',
			'{',
			'    pattern.addSound(clap, i)',
			'}',
            'pattern.addSound(clap, 7)',
            'pattern.addSound(clap, 15)'
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
