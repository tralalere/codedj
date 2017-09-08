define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G1_ARP2',
            soundSource: 'loops/new_loops/G1/1 - ARP 2.wav'
        },
        {
            soundName: 'G1_PAD',
            soundSource: 'loops/new_loops/G1/1 - PAD.wav'
        },
        {
            soundName: 'G1_SYNTH1',
            soundSource: 'loops/new_loops/G1/1 - SYNTH 1.wav'
        },
        {
            soundName: 'G1_SYNTH2',
            soundSource: 'loops/new_loops/G1/1 - SYNTH 2.wav'
        },
        {
            soundName: 'G1_2VOIX1',
            soundSource: 'loops/new_loops/G1/2 - VOIX 1.wav'
        },
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({ loop:false })',
        'tune.add(pattern)',

        'var arp2   = new Instrument("G1_ARP2")',
        'var pad    = new Instrument("G1_PAD")',
        'var synth1 = new Instrument("G1_SYNTH1")',
        'var synth2 = new Instrument("G1_SYNTH2")',
        'var voix = new Instrument("G1_2VOIX1")'
    ]

    var portions = [
        {
            solution: [
                'pattern.addSound(arp2, 1)'
            ],
            base: [
                'pattern.addSound(arp2,  2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(pad, 1)'
            ],
            base: [
                'pattern.addSound(pad,  2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(synth1, 1)'
            ],
            base: [
                'pattern.addSound(synth1,  2.5)'
            ]
        },
        {
            solution: [
                'pattern.addSound(synth2, 1)'
            ],
            base: [
                'pattern.addSound(synth2,  2.5)'
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
