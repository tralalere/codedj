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
        },
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
				'// En mettant i = i +2 dans la boucle for du clap, on peut résoudre à la fois les problèmes de ryhtme du clap et du kick !',
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
				'// Le clap joue trop souvent.. Et le kick aussi du coup. Retrouve le bon rythme en changeant un chiffre dans : for (var i = 2; i < 17; i = i + 1)',
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
				'// En mettant h < 2 ou h <= 1 dans la boucle for du kick, le kick a été joué deux fois plus souvent. Comme ça, on a pu retrouver le bon rythme !',
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
				'// la boucle for qui ajoute le son kick est dans la boucle for qui ajoute le son clap, mais il y a un problème de rythme.',
				'// Si tu changes une valeur dans la boucle for du clap, il est possible que ça fasse changer à la fois le rythme du clap et du kick...',
				'// Et si tu changeais seulement une valeur dans la boucle for du kick ?',
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
