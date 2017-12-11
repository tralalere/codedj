define(function () {


    var musicLoops = [
        {
            loopName: 'G1_1piano',
            source:   'G1/1 - PIANO.mp3'
        },
        {
            loopName: 'G1_1voix2',
            source:   'G1/1 - VOIX 2.mp3'
        },
        {
            loopName: 'G1_2arp2',
            source:   'G1/2 - ARP 2.mp3'
        },
        {
            loopName: 'G1_2bass',
            source:   'G1/2 - BASS.mp3'
        },
        {
            loopName: 'G1_2synth2',
            source:   'G1/2 - SYNTH 2.mp3'
        },
        {
            loopName: 'G1_2voix1',
            source:   'G1/2 - VOIX 1.mp3'
        }
    ]


    var sounds = [
        {
            soundName: 'G1_HITHAT',
            soundSource: 'samples/G1/HH.mp3'
        },
        {
            soundName: 'G1_KICK',
            soundSource: 'samples/G1/KICK.mp3'
        },
        {
            soundName: 'G1_RIM',
            soundSource: 'samples/G1/RIM.mp3'
        },
        {
            soundName: 'G1_SNARE',
            soundSource: 'samples/G1/SNARE.mp3'
        },
        {
            soundName: 'G1_CONGA_1',
            soundSource: 'samples/G1/CONGA_1.mp3'
        },
        {
            soundName: 'G1_CONGA_2',
            soundSource: 'samples/G1/CONGA_2.mp3'
        },
        {
            soundName: 'G1_CONGA_3',
            soundSource: 'samples/G1/CONGA_3.mp3'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern({loopLimit: 2})',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',

        'var hh = new Instrument("G1_HITHAT")',
        'var kick = new Instrument("G1_KICK")',
        'var rim = new Instrument("G1_RIM")',
        'var snare = new Instrument("G1_SNARE")',

        'var conga1 = new Instrument("G1_CONGA_1")',
        'var conga2 = new Instrument("G1_CONGA_2")',
        'var conga3 = new Instrument("G1_CONGA_3")'
    ]

    var portions = [
        {
            solution: [
                '//	Mettre 1 à la place de 2 comme premier paramètre à la ligne baseRhythm(1, 16, conga1, 8) permet de trouver le bon rythme.',
                'function baseRhythm (start, end, instrument, jump) {',
                '    for (var i = start; i <= end; i += jump)',
                '    {',
                '        pattern.addSound(instrument, i)',
                '    }',
                '}',
                '',
                'pattern.addSound(hh, 12.75)',
                'baseRhythm(1, 16, hh, 1)',
                'baseRhythm(1, 16, conga1, 8)',
                'baseRhythm(2.5, 16, conga1, 8)',
                'baseRhythm(8.5, 16, conga1, 8)'
            ],
            base: [
                '// La fonction baseRhythm permet de régler un rhythme basique pour un morceau.',
                '//	Mais il y a une erreur sur un paramètre à la ligne baseRhythm(2, 16, conga1, 8).',
                '// A toi de changer ce paramètre pour retrouver le bon rythme !',
                'function baseRhythm (start, end, instrument, jump) {',
                '    for (var i = start; i <= end; i += jump)',
                '    {',
                '        pattern.addSound(instrument, i)',
                '    }',
                '}',
                '',
                'pattern.addSound(hh, 12.75)',
                'baseRhythm(1, 16, hh, 1)',
                'baseRhythm(2, 16, conga1, 8)',
                'baseRhythm(2.5, 16, conga1, 8)',
                'baseRhythm(8.5, 16, conga1, 8)'
            ]
        },
        {
		    solution: [
        '//	Mettre conga1 à la place de hh comme troisième paramètre à la ligne baseRhythm(1, 16, conga1, 8) permet de jouer le bon son.',
        'function baseRhythm (start, end, instrument, jump) {',
        '    for (var i = start; i <= end; i += jump)',
        '    {',
        '        pattern.addSound(instrument, i)',
        '    }',
        '}',
        '',
        'pattern.addSound(hh, 12.75)',
        'baseRhythm(1, 16, hh, 1)',
        'baseRhythm(1, 16, conga1, 8)',
        'baseRhythm(2.5, 16, conga1, 8)',
        'baseRhythm(8.5, 16, conga1, 8)'
    ],
            base: [
                '// la fonction baseRhythm permet de régler un rhythme basique pour un morceau.',
                '//	Mais il y a une erreur sur un paramètre à la ligne baseRhythm(1, 16, hh, 8).',
                '// A toi de changer ce paramètre pour retrouver le bon rythme !',
                'function baseRhythm (start, end, instrument, jump) {',
                '    for (var i = start; i <= end; i += jump)',
                '    {',
                '        pattern.addSound(instrument, i)',
                '    }',
                '}',
                '',
                'pattern.addSound(hh, 12.75)',
                'baseRhythm(1, 16, hh, 1)',
                'baseRhythm(1, 16, hh, 8)',
                'baseRhythm(2.5, 16, conga1, 8)',
                'baseRhythm(8.5, 16, conga1, 8)'
            ]
        },
        {
		    solution: [
        '//	Mettre 8 à la place de 4 comme quatrième paramètre à la ligne baseRhythm([1, 2.5, 8.5], 16, conga1, 8) permet de retrouver le bon rythme.',
        'function baseRhythm (starts, end, instrument, jump) {',
        '    for (var startIndex = 0; startIndex <= starts.length; startIndex += 1)',
        '    {',
        '        for (var i = starts[startIndex]; i <= end; i += jump)',
        '        {',
        '            pattern.addSound(instrument, i)',
        '        }',
        '    }',
        '}',
        '',
        'pattern.addSound(hh, 12.75)',
        'baseRhythm([1], 16, hh, 1)',
        'baseRhythm([1, 2.5, 8.5], 16, conga1, 8)'
    ],
            base: [
                '// la fonction baseRhythm permet de régler un rhythme basique pour un morceau.',
                '// Elle a été enrichie, joue avec les paramètres pour comprendre comment elle fonctionne.',
                '// Il y a un paramètre faux à la ligne baseRhythm([1, 2.5, 8.5], 16, conga1, 4).',
                '// A toi de changer ce paramètre pour retrouver le bon rythme !',
                'function baseRhythm (starts, end, instrument, jump) {',
                '    for (var startIndex = 0; startIndex <= starts.length; startIndex += 1)',
                '    {',
                '        for (var i = starts[startIndex]; i <= end; i += jump)',
                '        {',
                '            pattern.addSound(instrument, i)',
                '        }',
                '    }',
                '}',
                '',
                'pattern.addSound(hh, 12.75)',
                'baseRhythm([1], 16, hh, 1)',
                'baseRhythm([1, 2.5, 8.5], 16, conga1, 4)'
            ]
        },
        {
		    solution: [
        '//	Mettre 8,5 à la place de 6 comme troisième paramètre à la ligne baseRhythm([1, 2.5, 8.5], 16, conga1, 8) permet de retrouver le bon rythme.',
        'function baseRhythm (starts, end, instrument, jump) {',
        '    for (var startIndex = 0; startIndex <= starts.length; startIndex += 1)',
        '    {',
        '        for (var i = starts[startIndex]; i <= end; i += jump)',
        '        {',
        '            pattern.addSound(instrument, i)',
        '        }',
        '    }',
        '}',
        '',
        'pattern.addSound(hh, 12.75)',
        'baseRhythm([1], 16, hh, 1)',
        'baseRhythm([1, 2.5, 8.5], 16, conga1, 8)'
    ],
            base: [
                '// la fonction baseRhythm permet de régler un rhythme basique pour un morceau.',
                '// Elle a été enrichie, joue avec les paramètres pour comprendre comment elle fonctionne.',
                '// Il y a un paramètre faux à la ligne baseRhythm([1, 2.5, 6], 16, conga1, 8).',
                '// A toi de changer ce paramètre pour retrouver le bon rythme !',
                'function baseRhythm (starts, end, instrument, jump) {',
                '    for (var startIndex = 0; startIndex <= starts.length; startIndex += 1)',
                '    {',
                '        for (var i = starts[startIndex]; i <= end; i += jump)',
                '        {',
                '            pattern.addSound(instrument, i)',
                '        }',
                '    }',
                '}',
                '',
                'pattern.addSound(hh, 12.75)',
                'baseRhythm([1], 16, hh, 1)',
                'baseRhythm([1, 2.5, 6], 16, conga1, 8)'
            ]
        },
        {
		    solution: [
        '//	Mettre 16 à la place de 10 comme troisième paramètre à la ligne baseRhythm(1, 16, conga1, 8) permet de retrouver le bon rythme.',
        'function baseRhythm (start, end, instrument, jump)',
        '{',
        '    for (var i = start; i <= end; i += jump)',
        '    {',
        '        pattern.addSound(instrument, i)',
        '    }',
        '}',
        '',
        'pattern.addSound(hh, 12.75)',
        'baseRhythm(1, 16, hh, 1)',
        'baseRhythm(1, 16, conga1, 8)',
        'baseRhythm(2.5, 16, conga1, 8)',
        'baseRhythm(8.5, 16, conga1, 8)'
    ],
            base: [
                '// la fonction baseRhythm permet de régler un rhythme basique pour un morceau.',
                '//	Mais il y a une erreur sur un paramètre à la ligne baseRhythm(1, 10, conga1, 8).',
                '// A toi de remettre le bon rythme !',
                'function baseRhythm (start, end, instrument, jump)',
                '{',
                '    for (var i = start; i <= end; i += jump)',
                '    {',
                '        pattern.addSound(instrument, i)',
                '    }',
                '}',
                '',
                'pattern.addSound(hh, 12.75)',
                'baseRhythm(1, 16, hh, 1)',
                'baseRhythm(1, 10, conga1, 8)',
                'baseRhythm(2.5, 16, conga1, 8)',
                'baseRhythm(8.5, 16, conga1, 8)'
            ]
        },
        {
		    solution: [
        '//	Mettre 8 à la place de 4 comme quatrième paramètre à la ligne baseRhythm(1, 16, conga1, 8) permet de retrouver le bon rythme.',
        'function baseRhythm (start, end, instrument, jump)',
        '{',
        '    for (var i = start; i <= end; i += jump)',
        '    {',
        '        pattern.addSound(instrument, i)',
        '    }',
        '}',
        '',
        'pattern.addSound(hh, 12.75)',
        'baseRhythm(1, 16, hh, 1)',
        'baseRhythm(1, 16, conga1, 8)',
        'baseRhythm(2.5, 16, conga1, 8)',
        'baseRhythm(8.5, 16, conga1, 8)'
    ],
            base: [
                '// la fonction baseRhythm permet de régler un rhythme basique pour un morceau.',
                '//	Mais il y a une erreur sur un paramètre à la ligne baseRhythm(1, 16, conga1, 4).',
                '// A toi de remettre le bon rythme !',
                'function baseRhythm (start, end, instrument, jump)',
                '{',
                '    for (var i = start; i <= end; i += jump)',
                '    {',
                '        pattern.addSound(instrument, i)',
                '    }',
                '}',
                '',
                'pattern.addSound(hh, 12.75)',
                'baseRhythm(1, 16, hh, 1)',
                'baseRhythm(1, 16, conga1, 4)',
                'baseRhythm(2.5, 16, conga1, 8)',
                'baseRhythm(8.5, 16, conga1, 8)'
            ]
        }

    ]

    var end = [
        'function baseRhythmEnd (start, end, instrument, jump)',
        '{',
        '    for (var i = start; i <= end; i += jump)',
        '    {',
        '        pattern.addSound(instrument, i)',
        '    }',
        '}',
        'pattern.addSound(snare, 3)',
        'pattern.addSound(snare, 7)',
        'pattern.addSound(snare, 11)',
        'pattern.addSound(snare, 15)',
        'pattern.addSound(kick, 1)',
        'pattern.addSound(kick, 3.5)',
        'pattern.addSound(kick, 4.5)',
        'pattern.addSound(kick, 5)',
        'pattern.addSound(kick, 8.75)',
        'pattern.addSound(kick, 9)',
        'pattern.addSound(kick, 11.5)',
        'pattern.addSound(kick, 12.5)',
        'pattern.addSound(kick, 13)',
        'pattern.addSound(kick, 16.5)',
        'pattern.addSound(kick, 16.75)',
        'pattern.addSound(rim, 2)',
        'pattern.addSound(rim, 6)',
        'pattern.addSound(rim, 10)',
        'pattern.addSound(rim, 14)',
        'pattern.addSound(conga3, 3)',
        'pattern.addSound(conga3, 11)',
        'baseRhythmEnd(2.75, 16, conga2, 2)',
        'baseRhythmEnd(5.75, 16, conga2, 8)',
        'baseRhythmEnd(4.5, 7, conga2, 1)',
        'baseRhythmEnd(12.5, 15, conga2, 1)'
    ]


    return {
        init: init,
        portions: portions,
        end: end,
        musicLoops: musicLoops,
        sounds: sounds,
        minimumGoodAnswers: 4,
        isolatePortions: true
    }


})
