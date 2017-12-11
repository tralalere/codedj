define(function () {


    var musicLoops = [

        // {
        //     loopName: 'oldSchoolDrums',
        //     source:   'old_school_drums.ogg'
        // }
    ]


    var init = [
        'tempo = 60',
        'var pattern  = new Pattern()',

        // 'var patternB = new Pattern({mesuresCount: 3})',
        'var tune     = new Tune({ loop:true })',
        'var bass     = new Instrument()',
        'var drum     = new Instrument()',
        'var clap     = new Instrument(\'clap.mp3\')',
        'tune.add(pattern)',

        // 'tune.add(pattern, patternB)',
        '',
        'bass.addSample(\'A\', \'bass_1.ogg\')',
        'bass.addSample(\'B\', \'bass_2.ogg\')',
        '',
        'drum.addSample(\'kick\',\'electro_drum/kick.mp3\')',
        'drum.addSample(\'snare\',\'electro_drum/snare.mp3\')',
        'drum.addSample(\'hithat\',\'electro_drum/hithat.mp3\')',
        'var snare = new Instrument("SNARE.mp3")',

        'pattern.addSound(snare, 2)',
        'pattern.addSound(snare, 5.9)',
        'pattern.addSound(snare, 9.8)',
        'pattern.addSound(snare, 13.6)',
        'pattern.addSound(snare, 17.5)',
        'pattern.addSound(snare, 21.4)',
        'pattern.addSound(snare, 25.3)',
        'pattern.addSound(snare, 29.1)'
    ]

    var portions = [

        // {
        //     solution: [
        //         'pattern.addSound(drum.kick, 1)',
        //         'pattern.addSound(drum.kick, 5)',
        //         'pattern.addSound(drum.kick, 14)'
        //     ],
        //     base: [
        //         'pattern.addSound(drum.kick, 1)',
        //         'pattern.addSound(drum.kick, 4)',
        //         'pattern.addSound(drum.kick, 14)'
        //     ]
        // },
        // {
        //     solution: [
        //         'pattern.addSound(drum.snare, 5)',
        //         'pattern.addSound(drum.snare, 13)'
        //     ],
        //     base: [
        //         'pattern.addSound(drum.snare, 5)',
        //         'pattern.addSound(drum.snare, 11)'
        //     ]
        // },
        // {
        //     solution: 'pattern.addSound(clap, 5)',
        //     base:     'pattern.addSound(clap, 12)'
        // },
        // {
        //     solution: [
        //         'pattern.addSound(bass.A, 1)',
        //         'pattern.addSound(bass.A, 12)',
        //         'pattern.addSound(bass.A, 15)'
        //
        //         // 'patternB.addSound(bass.A, 5)',
        //         // 'patternB.addSound(bass.A, 7)',
        //         // 'patternB.addSound(bass.A, 9)'
        //     ],
        //     base: [
        //         'pattern.addSound(bass.A, 9)',
        //         'pattern.addSound(bass.A, 12)',
        //         'pattern.addSound(bass.A, 15)'
        //
        //         // 'patternB.addSound(bass.A, 5)',
        //         // 'patternB.addSound(bass.A, 7)',
        //         // 'patternB.addSound(bass.A, 8)'
        //     ]
        // },
        {
            solution: 'pattern.addSound(bass.B, 5)',
            base:     'pattern.addSound(bass.B, 9)'
        }
    ]

    var end = [

        // 'for (var i = 1; i <= 16; i++) {',
        // '    pattern.addSound(drum.hithat, i)',
        // '}'
    ]


    return {
        init: init,
        portions: portions,
        end: end,
        musicLoops: musicLoops
    }


})
