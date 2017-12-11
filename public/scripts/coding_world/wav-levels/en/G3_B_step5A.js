define(function () {


	var musicLoops = [
		{
			loopName: 'G3_1bass',
			source:   'G3/1 - BASS.wav'
		},
		{
			loopName: 'G3_1piano',
			source:   'G3/1 - PIANO.wav'
		},
		{
			loopName: 'G3_1voix',
			source:   'G3/1 - VOIX.wav'
		},
		{
			loopName: 'G3_2arp',
			source:   'G3/2 - ARP.wav'
		},
	]


	var sounds = [
		{
			soundName: 'G3_CLAP',
			soundSource: 'samples/G3/CLAP.wav'
		},
		{
			soundName: 'G3_HITHAT',
			soundSource: 'samples/G3/HH.wav'
		},
		{
			soundName: 'G3_KICK',
			soundSource: 'samples/G3/KICK.wav'
		},
		{
			soundName: 'G3_SNARE',
			soundSource: 'samples/G3/SNARE.wav'
		}
	]

	var init = [
		'tempo = 130',
		'var pattern  = new Pattern({loopLimit: 2})',

		'var tune     = new Tune({ loop:true })',
		'tune.add(pattern)',
		'var clap = new Instrument("G3_CLAP")',
		'var hh = new Instrument("G3_HITHAT")',
		'var kick = new Instrument("G3_KICK")',
		'var snare = new Instrument("G3_SNARE")'
	]

	var portions = [
		{
			solution: [
				'// The rhythm gets fixed by changing the condition i === 1 to i === 13',
				'for (var i = 1; i < 17; i+=4)',
				'{',
				'pattern.addSound(kick, i)',
				'if (i === 5){',
				'pattern.addSound(kick, (i-0.5))',
				'} else if ( i === 9) {',
				'pattern.addSound(kick, (i-1.5))',
				'} else if ( i === 13) {',
				'pattern.addSound(kick, (i+3.75))',
				'}',
				'}'
			],
			base: [
				'// Change a value in the condition i === 1 to fix the rhythm',
				'for (var i = 1; i < 17; i+=4)',
				'{',
				'pattern.addSound(kick, i)',
				'if (i === 5){',
				'pattern.addSound(kick, (i-0.5))',
				'} else if ( i === 9) {',
				'pattern.addSound(kick, (i-1.5))',
				'} else if ( i === 1) {',
				'pattern.addSound(kick, (i+3.75))',
				'}',
				'}'
			]
		},
		{
			solution: [
				'// The rhythm gets fixed by putting a - sign in (i-0.5)',
				'for (var i = 1; i < 17; i+=4)',
				'{',
				'pattern.addSound(kick, i)',
				'if (i === 5){',
				'pattern.addSound(kick, (i-0.5))',
				'} else if ( i === 9) {',
				'pattern.addSound(kick, (i-1.5))',
				'} else if ( i === 13) {',
				'pattern.addSound(kick, (i+3.75))',
				'}',
				'}'
			],
			base: [
				'// Change an element in (i+0.5) to fix the rhythm',
				'for (var i = 1; i < 17; i+=4)',
				'{',
				'pattern.addSound(kick, i)',
				'if (i === 5){',
				'pattern.addSound(kick, (i+0.5))',
				'} else if ( i === 9) {',
				'pattern.addSound(kick, (i-1.5))',
				'} else if ( i === 13) {',
				'pattern.addSound(kick, (i+3.75))',
				'}',
				'}'
			]
		},
		{
			solution: [
				'// The rhythm gets fixed by changing the condition i === 7 to i === 5',
				'for (var i = 1; i < 17; i+=4)',
				'{',
				'pattern.addSound(kick, i)',
				'if (i === 5){',
				'pattern.addSound(kick, (i-0.5))',
				'} else if ( i === 9) {',
				'pattern.addSound(kick, (i-1.5))',
				'} else if ( i === 13) {',
				'pattern.addSound(kick, (i+3.75))',
				'}',
				'}'
			],
			base: [
				'// Change a value in the condition i === 7 to fix the rhythm',
				'for (var i = 1; i < 17; i+=4)',
				'{',
				'pattern.addSound(kick, i)',
				'if (i === 7){',
				'pattern.addSound(kick, (i-0.5))',
				'} else if ( i === 9) {',
				'pattern.addSound(kick, (i-1.5))',
				'} else if ( i === 13) {',
				'pattern.addSound(kick, (i+3.75))',
				'}',
				'}'
			]
		},
		{
			solution: [
				'// The melody gets fixed by replacing clap with kick in (kick, (i-0.5)) ',
				'for (var i = 1; i < 17; i+=4)',
				'{',
				'pattern.addSound(kick, i)',
				'if (i === 5){',
				'pattern.addSound(kick, (i-0.5))',
				'} else if ( i === 9) {',
				'pattern.addSound(kick, (i-1.5))',
				'} else if ( i === 13) {',
				'pattern.addSound(kick, (i+3.75))',
				'}',
				'}'
			],
			base: [
				'// Change an element in (clap, (i-0.5)) to fix the melody',
				'for (var i = 1; i < 17; i+=4)',
				'{',
				'pattern.addSound(kick, i)',
				'if (i === 5){',
				'pattern.addSound(clap, (i-0.5))',
				'} else if ( i === 9) {',
				'pattern.addSound(kick, (i-1.5))',
				'} else if ( i === 13) {',
				'pattern.addSound(kick, (i+3.75))',
				'}',
				'}'
			]
		}
	]

	var end = [
		'for (var i = 1; i < 17; i = i + 2)',
		'{',
		'pattern.addSound(hh, i)',
		'if (i%4 === 3){',
		'pattern.addSound(clap, i)',
		'}',
		'}',
		'for (var i = 3; i < 17; i = i + 4)',
		'{',
		'pattern.addSound(snare, i)',
		'}'

	]


	return {
		init: init,
		portions: portions,
		end: end,
		musicLoops: musicLoops,
		sounds: sounds,
		minimumGoodAnswers: 2,
		isolatePortions: true
	}


})
