define(function () {


    var musicLoops = [
        {
            loopName: 'G3_1piano',
            source:   'G3/1 - PIANO.mp3'
        },
        {
            loopName: 'G3_1synth',
            source:   'G3/1 - SYNTH.mp3'
        },
        {
            loopName: 'G3_2arp',
            source:   'G3/2 - ARP.mp3'
        },
        {
            loopName: 'G3_2voix',
            source:   'G3/2 - VOIX.mp3'
        },
    ]


    var sounds = [
        {
            soundName: 'G3_CLAP',
            soundSource: 'samples/G3/CLAP.mp3'
        },
        {
            soundName: 'G3_KICK',
            soundSource: 'samples/G3/KICK.mp3'
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
                '// By putting i = i +2 in the for loop of the clap, we can act on the rhythm of both the clap and the kick!',
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
                '// The clap plays too often.. And the kick too! Fix this by changing a number in : for (var i = 2; i < 17; i = i + 1)',
                'for (var i = 2; i < 17; i = i + 1)',
                '{',
                '    pattern.addSound(clap, i)',
                '    for (var h = 0; h < 2; h = h + 1)',
                '    {',
                '        pattern.addSound(kick, (i-h))',
                '    }',
                '}'
            ]
        },
        {
            solution: [
                '// By putting h < 2 or h <= 1 in the for loop of the kick, we made the kick play twice as often. This way we could fix the rhythm!',
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
                '// The for loop that adds the kick sample is housed inside the body of the for loop that adds the kick sound, and the overall rhythm is wrong.',
                '// If you change a value in the for loop of the clap, it might change the rhythm for both the kick and the clap sounds.',
                '// What if you tried changing a value only in the for loop of the kick ?',
                'for (var i = 2; i < 17; i = i + 2)',
                '{',
                'pattern.addSound(clap, i)',
                'for (var h = 0; h < 1; h = h + 1)',
                '{',
                'pattern.addSound(kick, (i-h))',
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
        isolatePortions: true,
        end: end,
        musicLoops: musicLoops,
        sounds: sounds,
        minimumGoodAnswers: 2
    }


})
