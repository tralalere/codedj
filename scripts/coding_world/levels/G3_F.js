define(function () {

    var musicLoops = [
    ]


    var sounds = [
        {
            soundName: 'G3_PIANO',
            soundSource: 'loops/new_loops/G3/1 - PIANO.wav'
        },
        {
            soundName: 'G3_2ARP',
            soundSource: 'loops/new_loops/G3/2 - ARP.wav'
        }
    ]


    var init = [
        'tempo = 130',
        'var pattern  = new Pattern()',

        'var tune     = new Tune({loop: false})',
        'tune.add(pattern)',

        'var piano   = new Instrument("G3_PIANO")',
        'var arp = new Instrument("G3_2ARP")'
    ]

    var portions = [
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
                'pattern.addSound(arp, 1)'
            ],
            base: [
                'pattern.addSound(arp, 2.5)'
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
