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
				'// By putting pattern.addSound(clap, i) inside the body of the for loop of the clap, we can act on what happens every time this for loop is repeated!',
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
				'// the clap rhythm is off, fix it by finding the error in pattern.addSound(clap, i-1)',
				'for (var i = 2; i < 17; i = i + 2)',
				'{',
				'pattern.addSound(clap, i-1)',
				'for (var h = 0; h < 2; h = h + 1)',
				'{',
				'pattern.addSound(kick, (i-h))',
				'}',
				'}'
			]
		},
		{
			solution: [
				'// By putting pattern.addSound(kick, i-h) inside the body of the for loop of the kick, we can act on what happens every time this for loop is repeated!',
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
				'// the kick rhythm is off, fix it by finding the error in pattern.addSound(kick, i)',
				'for (var i = 2; i < 17; i = i + 2)',
				'{',
				'pattern.addSound(clap, i)',
				'for (var h = 0; h < 2; h = h + 1)',
				'{',
				'pattern.addSound(kick, i)',
				'}',
				'}'
			]
		},
		{
			solution: [
				'// By putting pattern.addSound(kick, i-h) inside the body of the for loop of the kick, we can act on what happens every time this for loop is repeated!',
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
				'// the kick rhythm is off, fix it by finding the error in pattern.addSound(kick, h+1)',
				'for (var i = 2; i < 17; i = i + 2)',
				'{',
				'pattern.addSound(clap, i)',
				'for (var h = 0; h < 2; h = h + 1)',
				'{',
				'pattern.addSound(kick, h+1)',
				'}',
				'}'
			]
		},
		{
			solution: [
				'// By putting pattern.addSound(clap, i) inside the body of the for loop of the clap, we can act on what happens every time this for loop is repeated!',
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
				'// the clap rhythm is off, fix it by finding the error in pattern.addSound(clap, i-i+1)',
				'for (var i = 2; i < 17; i = i + 2)',
				'{',
				'pattern.addSound(clap, i-i+1)',
				'for (var h = 0; h < 2; h = h + 1)',
				'{',
				'pattern.addSound(kick, i-h)',
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
		end: end,
		isolatePortions: true,
		musicLoops: musicLoops,
		sounds: sounds,
		minimumGoodAnswers: 2
	}


})
