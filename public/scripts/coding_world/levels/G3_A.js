define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G3_ARP',
            soundSource: 'loops/G3/1 - ARP.wav'
        },
        {
            soundName: 'G3_PIANO',
            soundSource: 'loops/G3/1 - PIANO.wav'
        },
        {
            soundName: 'G3_VOIX',
            soundSource: 'loops/G3/1 - VOIX.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var arp   = new Instrument("G3_ARP")',
        'var piano = new Instrument("G3_PIANO")',
        'var voix  = new Instrument("G3_VOIX")'
    ]

    var portions = [
        {
            solution: [
                'pattern.addSound(arp, 1)'
            ],
            base: [
                'pattern.addSound(arp, 2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(piano, 1)'
            ],
            base: [
                'pattern.addSound(piano,  2.5)'
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
