define(function () {


    var musicLoops = [
        {
            loopName: 'G2_1synth2',
            source:   'G2/1 - SYNTH 2.mp3'
        },
        {
            loopName: 'G2_1synth',
            source:   'G2/1 - SYNTH.mp3'
        },
        {
            loopName: 'G2_1voix2',
            source:   'G2/1 - VOIX 2.mp3'
        },
        {
            loopName: 'G2_2bass',
            source:   'G2/2 - BASS.mp3'
        },
        {
            loopName: 'G2_2voix1',
            source:   'G2/2 - VOIX 1.mp3'
        },
    ]


    var sounds = [
        {
            soundName: 'G2_CLAP',
            soundSource: 'samples/G2/CLAP.mp3'
        },
        {
            soundName: 'G2_KICK',
            soundSource: 'samples/G2/KICK.mp3'
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
                '// The rhythm gets fixed by putting 2.5 in i % 4 === 2.5',
                '// We wanted the for loop to jump a beat, at the beat 2.5, 6.5, 10.5, 14.5',
                '// Actually, 2.5 remains when we divide these numbers by 4',
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
                '// Change a value in ( i % 4 === 1.5 ) to fix the rhythm',
                '// % is a sign that allows finding the REMAINDER of a division',
                '// For example 7 divided by 1.5 equals 4, and 1 remains, which means 7%1.5 equals 1.',
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
                '// The rhythm gets fixed by putting 4 in i % 4 === 2.5',
                '// We wanted the for loop to jump a beat, at the beat 2.5, 6.5, 10.5, 14.5',
                '// Actually, 2.5 remains when we divide these numbers by 4',
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
                '// Change a value in ( i % 2 === 2.5 ) to fix the rhythm',
                '// % is a sign that allows finding the REMAINDER of a division',
                '// For example 7 divided by 1.5 equals 4, and 1 remains, which means 7%1.5 equals 1.',
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
                '// The rhythm gets fixed by putting 2.5 in i % 4 === 2.5',
                '// We wanted the for loop to jump a beat, at the beat 2.5, 6.5, 10.5, 14.5',
                '// Actually, 2.5 remains when we divide these numbers by 4',
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
                '// Change a value in ( i % 4 === 3.5 ) to fix the rhythm',
                '// % is a sign that allows finding the REMAINDER of a division',
                '// For example 7 divided by 1.5 equals 4, and 1 remains, which means 7%1.5 equals 1.',
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
                '// The rhythm gets fixed by putting 4 in i % 4 === 2.5',
                '// We wanted the for loop to jump a beat, at the beat 2.5, 6.5, 10.5, 14.5',
                '// Actually, 2.5 remains when we divide these numbers by 4',
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
                '// Change a value in ( i % 8 === 2.5 ) to fix the rhythm',
                '// % is a sign that allows finding the REMAINDER of a division',
                '// For example 7 divided by 1.5 equals 4, and 1 remains, which means 7%1.5 equals 1.',
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
