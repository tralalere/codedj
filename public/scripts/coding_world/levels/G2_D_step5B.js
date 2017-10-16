define(function () {


    var musicLoops = [
        {
            loopName: 'G2_1synth2',
            source:   'G2/1 - SYNTH 2.wav'
        },
        {
            loopName: 'G2_1synth',
            source:   'G2/1 - SYNTH.wav'
        },
        {
            loopName: 'G2_1voix2',
            source:   'G2/1 - VOIX 2.wav'
        },
        {
            loopName: 'G2_2bass',
            source:   'G2/2 - BASS.wav'
        },
        {
            loopName: 'G2_2voix1',
            source:   'G2/2 - VOIX 1.wav'
        },
    ]


    var sounds = [
        {
            soundName: 'G2_CLAP',
            soundSource: 'samples/G2/CLAP.wav'
        },
        {
            soundName: 'G2_KICK',
            soundSource: 'samples/G2/KICK.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern({loopLimit: 2})',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',

        'var clap = new Instrument("G2_CLAP")',
        'var kick = new Instrument("G2_KICK")'
    ]

    var portions = [
        {
            solution: [
				'// Mettre la valeur 2.5 dans i % 4 === 2.5 permet de retrouver le bon rythme',
				'// i % 4 permet de trouver le RESTE de la division de i par 4',
				'// On voulait que le for saute un beat aux moments 2.5, 6.5, 10.5, et 14.5 ',
				'// Justement, il reste 2.5 quand on divise ces nombres par 4',
				'for (var i = 1.5; i < 17; i = i + 1)',
				'{',
                '    pattern.addSound(kick, i)',
                '    if (i % 4 === 2.5) {',
                '        i = i+1',
                '    }',
				'}',
                '',
				'for (var i = 1; i < 17; i = i + 4)',
				'{',
				'    pattern.addSound(kick, i)',
				'}'
            ],
            base: [
				'// Essaie d\'augmenter un peu la valeur 1.5 dans i % 4 === 1.5 pour retrouver le bon rythme',
				'for (var i = 1.5; i < 17; i = i + 1)',
				'{',
                '    pattern.addSound(kick, i)',
                '    if (i % 4 === 1.5){',
                '        i = i+1',
                '    }',
				'}',
                '',
				'for (var i = 1; i < 17; i = i + 4)',
				'{',
                '    pattern.addSound(kick, i)',
                '}'
            ]
        },
		{
            solution: [
				'// Mettre la valeur 4 dans i % 4 === 2.5 permet de retrouver le bon rythme',
				'// i % 4 est une manière de trouver le RESTE de la division de i par 4',
				'// On voulait que le for saute un beat aux moments 2.5, 6.5, 10.5, et 14.5',
				'// Justement, il reste 2.5 quand on divise ces nombres par 4',
				'for (var i = 1.5; i < 17; i = i + 1)',
				'{',
                '    pattern.addSound(kick, i)',
                '    if (i % 4 === 2.5) {',
                '        i = i+1',
                '    }',
				'}',
                '',
				'for (var i = 1; i < 17; i = i + 4)',
				'{',
				'    pattern.addSound(kick, i)',
				'}'
            ],
            base: [
				'// Essaie d\'augmenter la valeur 2 dans i % 2 === 2.5 pour retrouver le bon rythme',
				'for (var i = 1.5; i < 17; i = i + 1)',
				'{',
                '    pattern.addSound(kick, i)',
                '    if (i % 2 === 2.5){',
                '        i = i+1',
                '    }',
				'}',
                '',
				'for (var i = 1; i < 17; i = i + 4)',
				'{',
                '    pattern.addSound(kick, i)',
                '}'
            ]
        },
		{
            solution: [
				'// Mettre la valeur 2.5 dans i % 4 === 2.5 permet de retrouver le bon rythme',
				'// i % 4 est une manière de trouver le RESTE de la division de i par 4',
				'// on voulait que le for saute un beat aux moments 2.5, 6.5, 10.5, et 14.5',
				'// Justement, il reste 2.5 quand on divise ces nombres par 4',
				'for (var i = 1.5; i < 17; i = i + 1)',
				'{',
                '    pattern.addSound(kick, i)',
                '    if (i % 4 === 2.5) {',
                '        i = i+1',
                '    }',
				'}',
                '',
				'for (var i = 1; i < 17; i = i + 4)',
				'{',
				'    pattern.addSound(kick, i)',
				'}'
            ],
            base: [
				'// Essaie de baisser un peu la valeur 3.5 dans i % 4 === 3.5 pour retrouver le bon rythme',
				'for (var i = 1.5; i < 17; i = i + 1)',
				'{',
                '    pattern.addSound(kick, i)',
                '    if (i % 4 === 3.5){',
                '        i = i+1',
                '    }',
				'}',
                '',
				'for (var i = 1; i < 17; i = i + 4)',
				'{',
                '    pattern.addSound(kick, i)',
                '}'
            ]
        },
		{
            solution: [
				'// Mettre la valeur 4 dans i % 4 === 2.5 permet de retrouver le bon rythme',
				'// i % 4 est une manière de trouver le RESTE de la division de i par 4',
				'// on voulait que le for saute un beat aux moments 2.5, 6.5, 10.5, et 14.5 : justement, il reste 2.5 quand on divise ces nombres par 4',
				'for (var i = 1.5; i < 17; i = i + 1)',
				'{',
                '    pattern.addSound(kick, i)',
                '    if (i % 4 === 2.5) {',
                '        i = i+1',
                '    }',
				'}',
                '',
				'for (var i = 1; i < 17; i = i + 4)',
				'{',
				'    pattern.addSound(kick, i)',
				'}'
            ],
            base: [
				'// Essaie de baisser la valeur 8 dans i % 8 === 2.5 pour retrouver le bon rythme',
				'for (var i = 1.5; i < 17; i = i + 1)',
				'{',
                '    pattern.addSound(kick, i)',
                '    if (i % 8 === 2.5){',
                '        i = i+1',
                '    }',
				'}',
                '',
				'for (var i = 1; i < 17; i = i + 4)',
				'{',
                '    pattern.addSound(kick, i)',
                '}'
            ]
        }
    ]

    var end = [
			'for (var i = 3; i < 17; i = i + 4)',
				'{',
				'    pattern.addSound(clap, i)',
				'}'

    ]


    return {
        init: init,
        portions: portions,
        end: end,
        musicLoops: musicLoops,
        sounds: sounds,
        minimumGoodAnswers: 2,
        isolatePortions: true
    }


})
