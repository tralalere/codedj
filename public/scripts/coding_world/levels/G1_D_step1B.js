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
                '// Tu peux copier et réutiliser le code en changeant certains éléments pour arriver à faire ce que tu veux.',
                '// Ici, tu pouvais réécrire toute la ligne avec un autre nombre pour changer le temps auquel le son est joué, ou faire un copier coller et changer le nombre',
                'pattern.addSound(conga3, 3)',
                'pattern.addSound(conga3, 11)'
            ],
            base: [
                '// Il manque une ligne pour ajouter un son au temps 11, essaie de copier la ligne existante en y mettant le nombre correspondant au temps auquel tu veux jouer le son',
                'pattern.addSound(conga3, 3)'
            ]
        },
        {
            solution: [
                '// Tu peux copier et réutiliser le code en changeant certains éléments pour arriver à faire ce que tu veux.',
                '// Ici, tu pouvais réécrire chaque ligne manquante avec un autre nombre pour changer le temps auquel le son est joué, ou faire un copier coller et changer le nombre',
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
                '// Il manque les deux dernières lignes. Tu peux copier-coller ou t\'inspirer des lignes existantes',
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
                'pattern.addSound(hh, 14)'
            ]
        },
        {
            solution: [
                '// Tu peux copier et réutiliser le code en changeant certains éléments pour arriver à faire ce que tu veux.',
                '// Ici, tu pouvais réécrire chaque ligne manquante avec un autre nombre pour changer le temps auquel le son est joué, ou faire un copier coller et changer le nombre',
                'pattern.addSound(conga1, 1)',
                'pattern.addSound(conga1, 2.5)',
                'pattern.addSound(conga1, 8.5)',
                'pattern.addSound(conga1, 9)',
                'pattern.addSound(conga1, 10.5)',
                'pattern.addSound(conga1, 16.5)'
            ],
            base: [
                '// Il manque les deux dernières lignes. Tu peux copier-coller ou t\'inspirer des lignes existantes',
                'pattern.addSound(conga1, 1)',
                'pattern.addSound(conga1, 2.5)',
                'pattern.addSound(conga1, 8.5)',
                'pattern.addSound(conga1, 9)'
            ]
        },
        {
            solution: [
                '// Tu peux copier et réutiliser le code en changeant certains éléments pour arriver à faire ce que tu veux.',
                '// Ici, tu pouvais réécrire chaque ligne manquante avec un autre nombre pour changer le temps auquel le son est joué, ou faire un copier coller et changer le nombre',
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
                '// Il manque les deux dernières lignes. Tu peux copier-coller ou t\'inspirer des lignes existantes',
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
                'pattern.addSound(conga2, 14.5)'
            ]
        },
        {
            solution: [
                '// Tu peux copier et réutiliser le code en changeant certains éléments pour arriver à faire ce que tu veux.',
                '// Ici, tu pouvais réécrire chaque ligne manquante avec un autre nombre pour changer le temps auquel le son est joué, ou faire un copier coller et changer le nombre',
                'pattern.addSound(rim, 2)',
                'pattern.addSound(rim, 6)',
                'pattern.addSound(rim, 10)',
                'pattern.addSound(rim, 14)'
            ],
            base: [
                '// Il manque les deux dernières lignes. Tu peux copier-coller ou t\'inspirer des lignes existantes',
                'pattern.addSound(rim, 2)',
                'pattern.addSound(rim, 6)'
            ]
        },
        {
            solution: [
                '// Tu peux copier et réutiliser le code en changeant certains éléments pour arriver à faire ce que tu veux.',
                '// Ici, tu pouvais réécrire chaque ligne manquante avec un autre nombre pour changer le temps auquel le son est joué, ou faire un copier coller et changer le nombre',
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
                '// Il manque les deux dernières lignes. Tu peux copier-coller ou t\'inspirer des lignes existantes',
                'pattern.addSound(kick, 1)',
                'pattern.addSound(kick, 3.5)',
                'pattern.addSound(kick, 4.5)',
                'pattern.addSound(kick, 5)',
                'pattern.addSound(kick, 8.75)',
                'pattern.addSound(kick, 9)',
                'pattern.addSound(kick, 11.5)',
                'pattern.addSound(kick, 12.5)',
                'pattern.addSound(kick, 13)'
            ]
        },
        {
            solution: [
                '// Tu peux copier et réutiliser le code en changeant certains éléments pour arriver à faire ce que tu veux.',
                '// Ici, tu pouvais réécrire chaque ligne manquante avec un autre nombre pour changer le temps auquel le son est joué, ou faire un copier coller et changer le nombre',
                'pattern.addSound(snare, 3)',
                'pattern.addSound(snare, 7)',
                'pattern.addSound(snare, 11)',
                'pattern.addSound(snare, 15)'
            ],
            base: [
                '// Il manque les deux dernières lignes. Tu peux copier-coller ou t\'inspirer des lignes existantes',
                'pattern.addSound(snare, 3)',
                'pattern.addSound(snare, 7)'
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
