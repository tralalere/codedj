define(function () {


    var musicLoops = [
        {
            loopName: 'G2_SYNTH2',
            source:   'G2/1 - SYNTH 2.wav'
        },
        {
            loopName: 'G2_SYNTH',
            source:   'G2/1 - SYNTH.wav'
        },
        {
            loopName: 'G2_VOIX2',
            source:   'G2/1 - VOIX 2.wav'
        },
        {
            loopName: 'G2_2BASS',
            source:   'G2/2 - BASS.wav'
        },
        {
            loopName: 'G2_2VOIX',
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
        'var pattern  = new Pattern()',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',

        'var clap = new Instrument("G2_CLAP")',
        'var kick = new Instrument("G2_KICK")'
    ]

    var portions = [
        {
            solution: [
                '// Il fallait bien changer i = i + 2 en i = i + 4 pour que le for saute 4 beat à chaque fois que sa boucle se repète.',
				'for (var i = 3; i < 17; i = i + 4)',
				'{',
				'    pattern.addSound(clap, i)',
				'}'
            ],
            base: [
                '//Quelque chose ne va pas avec ce for... Essaie de changer la valeur dans i+2 pour voir comment retrouver le bon rhytme',
				'for (var i = 3; i < 17; i = i + 2)',
				'{',
				'    pattern.addSound(clap, i)',
				'}'
            ]
        },
        {
            solution: [
				'// Il fallait que la valeur soit 2.5, car i % 4 est une manière de trouver le reste de la division de i par 4',
				'// on voulait que le for saute un beat aux moments 2.5, 6.5, 10.5, et 14.5 : il reste 2.5 quand on divise ces nombres par 4',
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
				'// Essaie de faire baisser la valeur 1.5 dans i % 4 = 1.5 et regarde comment ça affecte le son',
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
