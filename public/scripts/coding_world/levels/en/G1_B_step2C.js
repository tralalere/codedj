define(function () {

    var musicLoops = [
        {
            loopName: 'G1_1arp1',
            source:   'G1/1 - ARP 1.mp3'
        },
        {
            loopName: 'G1_1bass',
            source:   'G1/1 - BASS.mp3'
        },
        {
            loopName: 'G1_1synth1',
            source:   'G1/1 - SYNTH 1.mp3'
        },
        {
            loopName: 'G1_1voix1',
            source:   'G1/1 - VOIX 1.mp3'
        },
        {
            loopName: 'G1_2piano',
            source:   'G1/2 - PIANO.mp3'
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
            soundName: 'G1_SHAKER_1',
            soundSource: 'samples/G1/SHAKER_1.mp3'
        },
        {
            soundName: 'G1_SNARE',
            soundSource: 'samples/G1/SNARE.mp3'
        },
        {
            soundName: 'G1_TOM',
            soundSource: 'samples/G1/TOM.mp3'
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
        'var shaker1 = new Instrument("G1_SHAKER_1")',
        'var snare = new Instrument("G1_SNARE")',
        'var tom = new Instrument("G1_TOM")'
    ]

    var portions = [
        {
            solution: [
                '// The for loop was not starting to add sounds from beat 1. By using 1 as the starting value in var i = 1, the sounds were played early enough to get the right rhythm.',
                'for (var i = 1; i <= 16; i = i + 1)',
                '{',
                '    pattern.addSound(hh, i)',
                '}',
                '',
                'pattern.addSound(hh, 12.75)'
            ],
            base: [
                '// For loops allow bit of code to be repeated, which means you do not have to write similar lines of code again and again.',
                '//	Here, the for loop starts too late. Try putting a number a little smaller than 5 in var i = 5',
                'for (var i = 5; i <= 16; i = i + 1)',
                '{',
                '    pattern.addSound(hh, i)',
                '}',
                '',
                'pattern.addSound(hh, 12.75)'
            ]
        },
        {
            solution: [
                '// The for loop was starting to add sounds too early. By using 1.75 as the starting value in var i = 1.75, the sounds were played early enough to get the right rhythm.',
                'for (var i = 1.75; i < 14; i = i + 4)',
                '{',
                '    pattern.addSound(kick, i)',
                '}',
                '',
                'pattern.addSound(kick, 1)',
                'pattern.addSound(kick, 2.5)',
                'pattern.addSound(kick, 3.5)',
                'pattern.addSound(kick, 4.5)',
                'pattern.addSound(kick, 5)',
                'pattern.addSound(kick, 6.5)',
                'pattern.addSound(kick, 7.5)',
                'pattern.addSound(kick, 9)',
                'pattern.addSound(kick, 10.5)',
                'pattern.addSound(kick, 11.5)',
                'pattern.addSound(kick, 13)',
                'pattern.addSound(kick, 14.5)',
                'pattern.addSound(kick, 15.5)',
                'pattern.addSound(kick, 16.25)'
            ],
            base: [
                '// For loops allow bit of code to be repeated, which means you do not have to write similar lines of code again and again.',
                '//	Here, the for loop starts too early. Try putting a number a little bigger than 1 in var i = 1',
                'for (var i = 1; i < 14; i = i + 4)',
                '{',
                '    pattern.addSound(kick, i)',
                '}',
                '',
                'pattern.addSound(kick, 1)',
                'pattern.addSound(kick, 2.5)',
                'pattern.addSound(kick, 3.5)',
                'pattern.addSound(kick, 4.5)',
                'pattern.addSound(kick, 5)',
                'pattern.addSound(kick, 6.5)',
                'pattern.addSound(kick, 7.5)',
                'pattern.addSound(kick, 9)',
                'pattern.addSound(kick, 10.5)',
                'pattern.addSound(kick, 11.5)',
                'pattern.addSound(kick, 13)',
                'pattern.addSound(kick, 14.5)',
                'pattern.addSound(kick, 15.5)',
                'pattern.addSound(kick, 16.25)'
            ]
        },
        {
            solution: [
                '// The for loop was not starting to add sounds from beat 1. By using 1 as the starting value in var i = 1, the sounds were played early enough to get the right rhythm.',
                'for (var i = 1; i <=16; i = i + 1)',
                '{',
                '    pattern.addSound(rim, i)',
                '}',
                '',
                'pattern.addSound(rim, 12.75)'
            ],
            base: [
                '// For loops allow bit of code to be repeated, which means you do not have to write similar lines of code again and again.',
                '//	Here, the for loop starts too late. Try putting a number a little smaller than 11 in var i = 11',
                '// Les boucles for permettent de ne pas réécrire plusieurs fois des lignes de code semblables. Mais ici la boucle for commence trop tard. Essaie d\'utiliser un nombre un peu plus petit que 5 dans var i = 5',
                'for (var i = 11; i <= 16; i = i + 1)',
                '{',
                '    pattern.addSound(rim, i)',
                '}',
                '',
                'pattern.addSound(rim, 12.75)'
            ]
        },
        {
            solution: [
                '// The for loop was starting to add sounds too early. By using 1.5 as the starting value in var i = 1.5, the sounds were played early enough to get the right rhythm.',
                'for (var i = 1.5; i < 16; i = i + 1)',
                '{',
                '    pattern.addSound(shaker1, i)',
                '}',
            ],
            base: [
                '// For loops allow bit of code to be repeated, which means you do not have to write similar lines of code again and again.',
                '//	Here, the for loop starts too early. Try putting a number a little bigger than 1 in var i = 1',
                'for (var i = 1; i < 16; i = i + 1)',
                '{',
                '    pattern.addSound(shaker1, i)',
                '}'
            ]
        },
        {
            solution: [
                '// The for loop was starting to add sounds too early. By using 3 as the starting value in var i = 3, the sounds were played early enough to get the right rhythm.',
                'for (var i = 3; i < 16; i = i + 4)',
                '{',
                '    pattern.addSound(snare, i)',
                '}'
            ],
            base: [
                '// For loops allow bit of code to be repeated, which means you do not have to write similar lines of code again and again.',
                '//	Here, the for loop starts too early. Try putting a number a little bigger than 1.5 in var i = 1.5',
                'for (var i = 1.5; i < 16; i = i + 4)',
                '{',
                '    pattern.addSound(snare, i)',
                '}'
            ]
        },
        {
            solution: [
                '// You needed to put 16.75 instead of 12.75 to get the sound played at the right time.',
                'pattern.addSound(tom, 16.75)'
            ],
            base: [
                '// Take a deep breath! Play with the number below in order to get the sound to play at the right time.',
                'pattern.addSound(tom, 12.75)'
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
