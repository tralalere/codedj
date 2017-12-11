define(function () {

    var musicLoops = [
        {
            loopName: 'G1_1arp1',
            source:   'G1/1 - ARP 1.wav'
        },
        {
            loopName: 'G1_1bass',
            source:   'G1/1 - BASS.wav'
        },
        {
            loopName: 'G1_1synth1',
            source:   'G1/1 - SYNTH 1.wav'
        },
        {
            loopName: 'G1_1voix1',
            source:   'G1/1 - VOIX 1.wav'
        },
        {
            loopName: 'G1_2piano',
            source:   'G1/2 - PIANO.wav'
        }
    ]


    var sounds = [
        {
            soundName: 'G1_HITHAT',
            soundSource: 'samples/G1/HH.wav'
        },
        {
            soundName: 'G1_KICK',
            soundSource: 'samples/G1/KICK.wav'
        },
        {
            soundName: 'G1_RIM',
            soundSource: 'samples/G1/RIM.wav'
        },
        {
            soundName: 'G1_SHAKER_1',
            soundSource: 'samples/G1/SHAKER_1.wav'
        },
        {
            soundName: 'G1_SNARE',
            soundSource: 'samples/G1/SNARE.wav'
        },
        {
            soundName: 'G1_TOM',
            soundSource: 'samples/G1/TOM.wav'
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
                '// The for loop did not repeat itself enough times. By using 16 as a limit in i <= 16, the sound was played enough times to fix the rhythm.',
                '',
                'for (var i = 1; i <= 16; i = i + 1)',
                '{',
                '    pattern.addSound(hh, i)',
                '}',
                '',
                'pattern.addSound(hh, 12.75)'
            ],
            base: [
                '// For loops allow bits of code to be repeated. No need to write similar lines of code again and again.',
                '//	Here, the for loop does not repeat itself enough times.',
                '//	Try putting a number a little bigger than 11 in i <= 12',
                '// The <= sign means that what is on its left side must be inferior or equal to what is on its right side.',
                '// So here that the value of i must be inferior or equal to 12.',
                '',
                'for (var i = 1; i <= 12; i = i + 1)',
                '{',
                '    pattern.addSound(hh, i)',
                '}',
                '',
                'pattern.addSound(hh, 12.75)'
            ]
        },
        {
            solution: [
                '// The for loop did not repeat itself enough times. By using 14 as a limit in i < 14, the sound was played enough times to fix the rhythm.',
                '',
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
                '// For loops allow bits of code to be repeated. No need to write similar lines of code again and again.',
                '//	Here, the for loop does not repeat itself enough times.',
                '//	Try putting a number a little bigger than 10 in i < 8',
                '// The < sign means that what is on its left side must be inferior to what is on its right side.',
                '// So here that the value of i must be inferior to 8.',
                '',
                'for (var i = 1.75; i < 8; i = i + 4)',
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
                '// The for loop did not repeat itself enough times. By using 16 as a limit in i <= 16, the sound was played enough times to fix the rhythm.',
                '',
                'for (var i = 1; i <=16; i = i + 1)',
                '{',
                '    pattern.addSound(rim, i)',
                '}',
                '',
                'pattern.addSound(rim, 12.75)'
            ],
            base: [
                '// For loops allow bits of code to be repeated. No need to write similar lines of code again and again.',
                '//	Here, the for loop does not repeat itself enough times.',
                '//	Try putting a number a little bigger than 11 in i <= 11',
                '// The <= sign means that what is on its left side must be inferior or equal to what is on its right side.',
                '// So here that the value of i must be inferior or equal to 11.',
                '',
                'for (var i = 1; i <= 11; i = i + 1)',
                '{',
                '    pattern.addSound(rim, i)',
                '}',
                '',
                'pattern.addSound(rim, 12.75)'
            ]
        },
        {
            solution: [
                '// The for loop did not repeat itself enough times. By using 16 as a limit in i < 16, the sound was played enough times to fix the rhythm.',
                '',
                'for (var i = 1.5; i < 16; i = i + 1)',
                '{',
                '    pattern.addSound(shaker1, i)',
                '}',
            ],
            base: [
                '// For loops allow bits of code to be repeated. No need to write similar lines of code again and again.',
                '//	Here, the for loop does not repeat itself enough times.',
                '//	Try putting a number a little bigger than 10 in i < 10',
                '// The < sign means that what is on its left side must be inferior to what is on its right side.',
                '// So here that the value of i must be inferior to 10.',
                '',
                'for (var i = 1.5; i < 10; i = i + 1)',
                '{',
                '    pattern.addSound(shaker1, i)',
                '}'
            ]
        },
        {
            solution: [
                '// The for loop did not repeat itself enough times. By using 16 as a limit in i < 16, the sound was played enough times to fix the rhythm.',
                '',
                'for (var i = 3; i < 16; i = i + 4)',
                '{',
                '    pattern.addSound(snare, i)',
                '}'
            ],
            base: [
                '// For loops allow bits of code to be repeated. No need to write similar lines of code again and again.',
                '//	Here, the for loop does not repeat itself enough times.',
                '//	Try putting a number a little bigger than 10 in i < 10',
                '// The < sign means that what is on its left side must be inferior to what is on its right side.',
                '// So here that the value of i must be inferior to 10.',
                '',
                'for (var i = 3; i < 10; i = i + 4)',
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
