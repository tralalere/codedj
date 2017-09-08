define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G3_SYNTH',
            soundSource: 'loops/new_loops/G3/1 - SYNTH.wav'
        },
        {
            soundName: 'G3_2ARP',
            soundSource: 'loops/new_loops/G3/2 - ARP.wav'
        },
        {
            soundName: 'G3_2VOIX',
            soundSource: 'loops/new_loops/G3/2 - VOIX.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var synth   = new Instrument("G3_SYNTH")',
        'var arp = new Instrument("G3_2ARP")',
        'var voix  = new Instrument("G3_2VOIX")'
    ]

    var portions = [
        {
            solution: [
                'pattern.addSound(synth, 1)'
            ],
            base: [
                'pattern.addSound(synth, 2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(arp, 1)'
            ],
            base: [
                'pattern.addSound(arp,  2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(voix, 1)'
            ],
            base: [
                'pattern.addSound(voix,  2.5)'
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
