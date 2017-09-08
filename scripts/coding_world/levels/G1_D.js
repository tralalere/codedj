define(function () {


    var musicLoops = [
        {
            loopName: 'G1_PIANO',
            source:   'G1/1 - PIANO.wav'
        },
        {
            loopName: 'G1_VOIX2',
            source:   'G1/1 - VOIX 2.wav'
        },
        {
            loopName: 'G1_ARP2',
            source:   'G1/2 - ARP 2.wav'
        },
        {
            loopName: 'G1_2BASS',
            source:   'G1/2 - BASS.wav'
        },
        {
            loopName: 'G1_2SYNTH2',
            source:   'G1/2 - SYNTH 2.wav'
        },
        {
            loopName: 'G1_2VOIX1',
            source:   'G1/2 - VOIX 1.wav'
        }
    ]


    var sounds = [
        {
            soundName: 'G1_HITHAT',
            soundSource: 'G1/HH.wav'
        },
        {
            soundName: 'G1_KICK',
            soundSource: 'G1/KICK.wav'
        },
        {
            soundName: 'G1_RIM',
            soundSource: 'G1/RIM.wav'
        },
        {
            soundName: 'G1_SNARE',
            soundSource: 'G1/SNARE.wav'
        },
        {
            soundName: 'G1_CONGA_1',
            soundSource: 'G1/CONGA_1.wav'
        },
        {
            soundName: 'G1_CONGA_2',
            soundSource: 'G1/CONGA_2.wav'
        },
        {
            soundName: 'G1_CONGA_3',
            soundSource: 'G1/CONGA_3.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({ loop:false })',
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
                'pattern.addSound(hh, 13.5)',
                'pattern.addSound(hh, 15.5)',
                'pattern.addSound(hh, 16)'
            ]
        },
        {
            solution: [
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
                'pattern.addSound(conga2, 5)',
                'pattern.addSound(conga2, 5.75)',
                'pattern.addSound(conga2, 6.5)',
                'pattern.addSound(conga2, 6)',
                'pattern.addSound(conga2, 8.75)',
                'pattern.addSound(conga2, 9.75)',
                'pattern.addSound(conga2, 12.5)',
                'pattern.addSound(conga2, 12.75)',
                'pattern.addSound(conga2, 13)',
                'pattern.addSound(conga2, 14)',
                'pattern.addSound(conga2, 14.5)',
                'pattern.addSound(conga2, 14.75)',
                'pattern.addSound(conga2, 16.75)'
            ]
        },
        {
            solution: [
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
                'pattern.addSound(kick, 5)',
                'pattern.addSound(kick, 8.75)',
                'pattern.addSound(kick, 9)',
                'pattern.addSound(kick, 11.5)',
                'pattern.addSound(kick, 12.5)',
                'pattern.addSound(kick, 13)',
                'pattern.addSound(kick, 16.5)',
                'pattern.addSound(kick, 16.75)'
            ]
        },
        {
            solution: [
                'pattern.addSound(snare, 3)',
                'pattern.addSound(snare, 7)',
                'pattern.addSound(snare, 11)',
                'pattern.addSound(snare, 15)'
            ],
            base: [
                '// Change les chiffres entre parenthèses pour jouer les sons au bon moment',
				'pattern.addSound(snare, 3)',
                'pattern.addSound(snare, 7)',
                'pattern.addSound(snare, 11)',
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
