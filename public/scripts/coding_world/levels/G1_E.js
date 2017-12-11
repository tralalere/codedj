define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G1_ARP1',
            soundSource: 'loops/G1/1 - ARP 1.mp3'
        },
        {
            soundName: 'G1_PIANO',
            soundSource: 'loops/G1/1 - PIANO.mp3'
        },
        {
            soundName: 'G1_VOIX1',
            soundSource: 'loops/G1/1 - VOIX 1.mp3'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var arp   = new Instrument("G1_ARP1")',
        'var piano = new Instrument("G1_PIANO")',
        'var voix  = new Instrument("G1_VOIX1")'
    ]

    var portions = [
        {
            solution: [
                'pattern.addSound(piano, 1)'
            ],
            base: [
                'pattern.addSound(piano, 2.5)'
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
