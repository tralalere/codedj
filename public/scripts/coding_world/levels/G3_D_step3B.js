define(function () {


    var musicLoops = [
        {
            loopName: 'G3_1piano',
            source:   'G3/1 - PIANO.wav'
        },
        {
            loopName: 'G3_1synth',
            source:   'G3/1 - SYNTH.wav'
        },
        {
            loopName: 'G3_2arp',
            source:   'G3/2 - ARP.wav'
        },
        {
            loopName: 'G3_2voix',
            source:   'G3/2 - VOIX.wav'
        }
    ]


    var sounds = [
        {
            soundName: 'G3_CLAP',
            soundSource: 'samples/G3/CLAP.wav'
        },
        {
            soundName: 'G3_KICK',
            soundSource: 'samples/G3/KICK.wav'
        }
    ]

    var init = [
        'tempo = 130',
        'var pattern  = new Pattern({loopLimit: 2})',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',
        'var clap = new Instrument("G3_CLAP")',
        'var kick = new Instrument("G3_KICK")'
    ]

    var portions = [
        {
            solution: [
                '// En mettant pattern.addSound(clap, i) dans le contenu de la boucle for du clap, on a pu agir sur ce qui se passe à chaque répétion de cette boucle for !',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 0; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, (i-h))',
                '}',
                '}'
            ],
            base: [
                '// le clap joue en décalé, trouve l\'erreur dans  pattern.addSound(clap, i-1) pour rétablir le bon rythme',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i-1)',
                'for (var h = 0; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, (i-h))',
                '}',
                '}'
            ]
        },
        {
            solution: [
                '// En mettant pattern.addSound(kick, i-h) dans le contenu de la boucle for du kick, on a pu agir sur ce qui se passe à chaque répétion de cette boucle for !',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 0; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, (i-h))',
                '}',
                '}'
            ],
            base: [
                '// le kick joue en décalé, trouve l\'erreur dans  pattern.addSound(kick, i) pour rétablir le bon rythme',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 0; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, i)',
                '}',
                '}'
            ]
        },
        {
            solution: [
                '// En mettant pattern.addSound(kick, i-h) dans le contenu de la boucle for du kick, on a pu agir sur ce qui se passe à chaque répétion de cette boucle for !',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 0; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, (i-h))',
                '}',
                '}'
            ],
            base: [
                '// le kick joue en décalé, trouve l\'erreur dans  pattern.addSound(kick, h+1) pour rétablir le bon rythme',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 0; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, h+1)',
                '}',
                '}'
            ]
        },
        {
            solution: [
                '// En mettant pattern.addSound(clap, i) dans le contenu de la boucle for du clap, on a pu agir sur ce qui se passe à chaque répétion de cette boucle for !',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 0; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, (i-h))',
                '}',
                '}'
            ],
            base: [
                '// le clap joue en décalé, trouve l\'erreur dans  pattern.addSound(clap, i-i+1) pour rétablir le bon rythme',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i-i+1)',
                'for (var h = 0; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, h+1)',
                '}',
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
        isolatePortions: true,
        musicLoops: musicLoops,
        sounds: sounds,
        minimumGoodAnswers: 2
    }


})
