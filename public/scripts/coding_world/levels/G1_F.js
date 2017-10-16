define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G1_3ARP2',
            soundSource: 'loops/G1/3 - ARP 2.wav'
        },
        {
            soundName: 'G1_PIANO',
            soundSource: 'loops/G1/1 - PIANO.wav'
        },
        {
            soundName: 'G1_3SYNTH2',
            soundSource: 'loops/G1/3 - SYNTH 2.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var arp   = new Instrument("G1_3ARP2")',
        'var piano = new Instrument("G1_PIANO")',
        'var synth = new Instrument("G1_3SYNTH2")'
    ]

    var portions = [
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
                'pattern.addSound(piano, 1)'
            ],
            base: [
                'pattern.addSound(piano, 2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(synth, 1)'
            ],
            base: [
                'pattern.addSound(synth,  2.5)'
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
