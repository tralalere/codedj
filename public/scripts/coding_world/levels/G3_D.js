define(function () {


    var musicLoops = [
        {
            loopName: 'G3_PIANO',
            source:   'G3/1 - PIANO.wav'
        },
        {
            loopName: 'G3_SYNTH',
            source:   'G3/1 - SYNTH.wav'
        },
        {
            loopName: 'G3_2ARP',
            source:   'G3/2 - ARP.wav'
        },
        {
            loopName: 'G3_2VOIX',
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
        'var pattern  = new Pattern()',

        'var tune     = new Tune({ loop:true })',
        'tune.add(pattern)',
        'var clap = new Instrument("G3_CLAP")',
        'var kick = new Instrument("G3_KICK")'
    ]

    var portions = [
        {
            solution: [
                '// Il suffisait de faire un seul changement, et le kick a été joué deux fois plus. C\'est toute la puissance du for pour créer un rhytme !',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 1; h < 2; h = h + 1)',
                '{',
                'pattern.addSound(kick, (i+1-h))',
                '}',
                '}'
            ],
            base: [
                '// la boucle for qui ajoute le son kick est elle-même dans la boucle for qui ajoute le son clap',
                '// change la valeur de quelque chose dans le for qui ajoute le son kick pour retrouver le bon rhytme',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 1; h < 1; h = h + 1)',
                '{',
                'pattern.addSound(kick, (i+1-h))',
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
        musicLoops: musicLoops,
        sounds: sounds,
        minimumGoodAnswers: 1
    }


})
