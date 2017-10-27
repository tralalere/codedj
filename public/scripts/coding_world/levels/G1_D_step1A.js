define(function () {


    var musicLoops = [
        {
            loopName: 'G1_1piano',
            source:   'G1/1 - PIANO.wav'
        },
        {
            loopName: 'G1_1voix2',
            source:   'G1/1 - VOIX 2.wav'
        },
        {
            loopName: 'G1_2arp2',
            source:   'G1/2 - ARP 2.wav'
        },
        {
            loopName: 'G1_2bass',
            source:   'G1/2 - BASS.wav'
        },
        {
            loopName: 'G1_2synth2',
            source:   'G1/2 - SYNTH 2.wav'
        },
        {
            loopName: 'G1_2voix1',
            source:   'G1/2 - VOIX 1.wav'
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
            soundName: 'G1_SNARE',
            soundSource: 'samples/G1/SNARE.wav'
        },
        {
            soundName: 'G1_CONGA_1',
            soundSource: 'samples/G1/CONGA_1.wav'
        },
        {
            soundName: 'G1_CONGA_2',
            soundSource: 'samples/G1/CONGA_2.wav'
        },
        {
            soundName: 'G1_CONGA_3',
            soundSource: 'samples/G1/CONGA_3.wav'
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
                '// Mettre 3 à la première ligne, et 11 à la deuxième ligne, permet aux sons d\'être joués aux bons moments',
                'pattern.addSound(conga3, 3)',
                'pattern.addSound(conga3, 11)'
            ],
            base: [
                '// Change les chiffres entre parenthèses pour jouer les sons au bon moment',
                'pattern.addSound(conga3, 2)',
                'pattern.addSound(conga3, 15)'
            ]
        },
        {
            solution: [
                '// Il fallait s\'assurer que les nombres se suivent d\'une ligne à l\'autre permet de jouer les sons aux bons moments',
                '// 12.75 est une exception qui joue le son une fois de plus, pour être dans le rythme des autres instruments',
                'pattern.addSound(hh, 1)',
                'pattern.addSound(hh, 2)',
                'pattern.addSound(hh, 3)',
                'pattern.addSound(hh, 4)',
                'pattern.addSound(hh, 5)',
                'pattern.addSound(hh, 6)',
                'pattern.addSound(hh, 7)',
                'pattern.addSound(hh, 8)',
                'pattern.addSound(hh, 9)',
                'pattern.addSound(hh, 10)',
                'pattern.addSound(hh, 11)',
                'pattern.addSound(hh, 12)',
                'pattern.addSound(hh, 12.75)',
                'pattern.addSound(hh, 13)',
                'pattern.addSound(hh, 14)',
                'pattern.addSound(hh, 15)',
                'pattern.addSound(hh, 16)'
            ],
            base: [
                '// Change les chiffres entre parenthèses pour jouer les sons au bon moment',
                'pattern.addSound(hh, 1)',
                'pattern.addSound(hh, 1.5)',
                'pattern.addSound(hh, 3)',
                'pattern.addSound(hh, 4.5)',
                'pattern.addSound(hh, 5)',
                'pattern.addSound(hh, 6)',
                'pattern.addSound(hh, 7)',
                'pattern.addSound(hh, 8)',
                'pattern.addSound(hh, 9)',
                'pattern.addSound(hh, 11.5)',
                'pattern.addSound(hh, 11.75)',
                'pattern.addSound(hh, 12)',
                'pattern.addSound(hh, 12.75)',
                'pattern.addSound(hh, 13)',
                'pattern.addSound(hh, 14)',
                'pattern.addSound(hh, 15)',
                'pattern.addSound(hh, 16)'
            ]
        },
        {
            solution: [
                '// Mettre 8.5 à la place de 3.5, et 9 à la place de 4.5, permet aux sons d\'être joués aux bons moments',
                'pattern.addSound(conga1, 1)',
                'pattern.addSound(conga1, 2.5)',
                'pattern.addSound(conga1, 8.5)',
                'pattern.addSound(conga1, 9)',
                'pattern.addSound(conga1, 10.5)',
                'pattern.addSound(conga1, 16.5)'
            ],
            base: [
                '// Change les chiffres entre parenthèses pour jouer les sons au bon moment',
                'pattern.addSound(conga1, 1)',
                'pattern.addSound(conga1, 2.5)',
                'pattern.addSound(conga1, 3.5)',
                'pattern.addSound(conga1, 4.5)',
                'pattern.addSound(conga1, 10.5)',
                'pattern.addSound(conga1, 16.5)'
            ]
        },
        {
            solution: [
                '// Mettre 5.5 à la place de 3.5, et 10.75 à la place de 9.75, permet aux sons d\'être joués aux bons moments',
                'pattern.addSound(conga2, 2.75)',
                'pattern.addSound(conga2, 4.5)',
                'pattern.addSound(conga2, 4.75)',
                'pattern.addSound(conga2, 5.5)',
                'pattern.addSound(conga2, 5.75)',
                'pattern.addSound(conga2, 6.5)',
                'pattern.addSound(conga2, 6.75)',
                'pattern.addSound(conga2, 8.75)',
                'pattern.addSound(conga2, 10.75)',
                'pattern.addSound(conga2, 12.5)',
                'pattern.addSound(conga2, 12.75)',
                'pattern.addSound(conga2, 13.5)',
                'pattern.addSound(conga2, 13.75)',
                'pattern.addSound(conga2, 14.5)',
                'pattern.addSound(conga2, 14.75)',
                'pattern.addSound(conga2, 16.75)'
            ],
            base: [
                '// Change les chiffres entre parenthèses pour jouer les sons au bon moment',
                'pattern.addSound(conga2, 2.75)',
                'pattern.addSound(conga2, 4.5)',
                'pattern.addSound(conga2, 4.75)',
                'pattern.addSound(conga2, 3.5)',
                'pattern.addSound(conga2, 5.75)',
                'pattern.addSound(conga2, 6.5)',
                'pattern.addSound(conga2, 6,75)',
                'pattern.addSound(conga2, 8.75)',
                'pattern.addSound(conga2, 9.75)',
                'pattern.addSound(conga2, 12.5)',
                'pattern.addSound(conga2, 12.75)',
                'pattern.addSound(conga2, 13.5)',
                'pattern.addSound(conga2, 13.75)',
                'pattern.addSound(conga2, 14.5)',
                'pattern.addSound(conga2, 14.75)',
                'pattern.addSound(conga2, 16.75)'
            ]
        },
        {
            solution: [
                '// Mettre 10 à la place de 8, et 14 à la place de 9, permet aux sons d\'être joués aux bons moments',
                'pattern.addSound(rim, 2)',
                'pattern.addSound(rim, 6)',
                'pattern.addSound(rim, 10)',
                'pattern.addSound(rim, 14)'
            ],
            base: [
                '// Change les chiffres entre parenthèses pour jouer les sons au bon moment',
                'pattern.addSound(rim, 2)',
                'pattern.addSound(rim, 6)',
                'pattern.addSound(rim, 8)',
                'pattern.addSound(rim, 9)'
            ]
        },
        {
            solution: [
                '// Mettre 5 à la place de 7, et 9 à la place de 10, permet aux sons d\'être joués aux bons moments',
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
                'pattern.addSound(kick, 16.75)'
            ],
            base: [
                '// Change les chiffres entre parenthèses pour jouer les sons au bon moment',
                'pattern.addSound(kick, 1)',
                'pattern.addSound(kick, 3.5)',
                'pattern.addSound(kick, 4.5)',
                'pattern.addSound(kick, 7)',
                'pattern.addSound(kick, 8.75)',
                'pattern.addSound(kick, 10)',
                'pattern.addSound(kick, 11.5)',
                'pattern.addSound(kick, 12.5)',
                'pattern.addSound(kick, 13)',
                'pattern.addSound(kick, 16.5)',
                'pattern.addSound(kick, 16.75)'
            ]
        },
        {
            solution: [
                '// Mettre 7 à la place de 5, et 11 à la place de 10, permet aux sons d\'être joués aux bons moments',
                'pattern.addSound(snare, 3)',
                'pattern.addSound(snare, 7)',
                'pattern.addSound(snare, 11)',
                'pattern.addSound(snare, 15)'
            ],
            base: [
                '// Change les chiffres entre parenthèses pour jouer les sons au bon moment',
                'pattern.addSound(snare, 3)',
                'pattern.addSound(snare, 5)',
                'pattern.addSound(snare, 10)',
                'pattern.addSound(snare, 15)'
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
