define(function () {


	var musicLoops = [
		{
			loopName: 'G1_1piano',
			source:   'G1/1 - PIANO.wav'
		},
		{
			loopName: 'G1_1voix2',
			source:   'G1/1 - VOIX 2.wav'
		},
		{
			loopName: 'G1_2arp2',
			source:   'G1/2 - ARP 2.wav'
		},
		{
			loopName: 'G1_2bass',
			source:   'G1/2 - BASS.wav'
		},
		{
			loopName: 'G1_2synth2',
			source:   'G1/2 - SYNTH 2.wav'
		},
		{
			loopName: 'G1_2voix1',
			source:   'G1/2 - VOIX 1.wav'
		}
	]


	var sounds = [
		{
			soundName: 'G1_HITHAT',
			soundSource: 'samples/G1/HH.wav'
		},
		{
			soundName: 'G1_KICK',
			soundSource: 'samples/G1/KICK.wav'
		},
		{
			soundName: 'G1_RIM',
			soundSource: 'samples/G1/RIM.wav'
		},
		{
			soundName: 'G1_SNARE',
			soundSource: 'samples/G1/SNARE.wav'
		},
		{
			soundName: 'G1_CONGA_1',
			soundSource: 'samples/G1/CONGA_1.wav'
		},
		{
			soundName: 'G1_CONGA_2',
			soundSource: 'samples/G1/CONGA_2.wav'
		},
		{
			soundName: 'G1_CONGA_3',
			soundSource: 'samples/G1/CONGA_3.wav'
		}
	]


	var init = [
		'tempo = 130',
		'var pattern  = new Pattern({loopLimit: 2})',

		'var tune     = new Tune({ loop:true })',
		'tune.add(pattern)',

		'var hh = new Instrument("G1_HITHAT")',
		'var kick = new Instrument("G1_KICK")',
		'var rim = new Instrument("G1_RIM")',
		'var snare = new Instrument("G1_SNARE")',

		'var conga1 = new Instrument("G1_CONGA_1")',
		'var conga2 = new Instrument("G1_CONGA_2")',
		'var conga3 = new Instrument("G1_CONGA_3")'
	]

	var portions = [
		{
			solution: [
				'// We can fix the rhythm by putting 1 instead of 2 as the first parameter in baseRhythm(1, 16, conga1, 8).',
				'function baseRhythm (start, end, instrument, jump) {',
				'    for (var i = start; i <= end; i += jump)',
				'    {',
				'        pattern.addSound(instrument, i)',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm(1, 16, hh, 1)',
				'baseRhythm(1, 16, conga1, 8)',
				'baseRhythm(2.5, 16, conga1, 8)',
				'baseRhythm(8.5, 16, conga1, 8)'
			],
			base: [
				'// The function baseRhythm allows setting a basic rhythm.',
				'// There is a wrong parameter on the line baseRhythm(2, 16, conga1, 8).',
				'// Change a parameter to fix the rhythm!',
				'function baseRhythm (start, end, instrument, jump) {',
				'    for (var i = start; i <= end; i += jump)',
				'    {',
				'        pattern.addSound(instrument, i)',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm(1, 16, hh, 1)',
				'baseRhythm(2, 16, conga1, 8)',
				'baseRhythm(2.5, 16, conga1, 8)',
				'baseRhythm(8.5, 16, conga1, 8)'
			]
		},
		{
			solution: [
				'// We can fix the melody by putting conga1 instead of hh as the third parameter in baseRhythm(1, 16, conga1, 8).',
				'function baseRhythm (start, end, instrument, jump) {',
				'    for (var i = start; i <= end; i += jump)',
				'    {',
				'        pattern.addSound(instrument, i)',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm(1, 16, hh, 1)',
				'baseRhythm(1, 16, conga1, 8)',
				'baseRhythm(2.5, 16, conga1, 8)',
				'baseRhythm(8.5, 16, conga1, 8)'
			],
			base: [
				'// The function baseRhythm allows setting a basic rhythm.',
				'// There is a wrong parameter on the line baseRhythm(1, 16, hh, 8).',
				'// Change a parameter to fix the rhythm!',
				'function baseRhythm (start, end, instrument, jump) {',
				'    for (var i = start; i <= end; i += jump)',
				'    {',
				'        pattern.addSound(instrument, i)',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm(1, 16, hh, 1)',
				'baseRhythm(1, 16, hh, 8)',
				'baseRhythm(2.5, 16, conga1, 8)',
				'baseRhythm(8.5, 16, conga1, 8)'
			]
		},
		{
			solution: [
				'// We can fix the rhythm by putting 8 instead of 4 as the fourth parameter in baseRhythm([1, 2.5, 8.5], 16, conga1, 8).',
				'function baseRhythm (starts, end, instrument, jump) {',
				'    for (var startIndex = 0; startIndex <= starts.length; startIndex += 1)',
				'    {',
				'        for (var i = starts[startIndex]; i <= end; i += jump)',
				'        {',
				'            pattern.addSound(instrument, i)',
				'        }',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm([1], 16, hh, 1)',
				'baseRhythm([1, 2.5, 8.5], 16, conga1, 8)'
			],
			base: [
				'// The function baseRhythm allows setting a basic rhythm.',
				'// There is a wrong parameter on the line baseRhythm([1, 2.5, 8.5], 16, conga1, 4).',
				'// Change a parameter to fix the rhythm!',
				'function baseRhythm (starts, end, instrument, jump) {',
				'    for (var startIndex = 0; startIndex <= starts.length; startIndex += 1)',
				'    {',
				'        for (var i = starts[startIndex]; i <= end; i += jump)',
				'        {',
				'            pattern.addSound(instrument, i)',
				'        }',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm([1], 16, hh, 1)',
				'baseRhythm([1, 2.5, 8.5], 16, conga1, 4)'
			]
		},
		{
			solution: [
				'// We can fix the rhythm by putting 8.5 instead of 6 as the third element in the first parameter of baseRhythm([1, 2.5, 8.5], 16, conga1, 8).',
				'function baseRhythm (starts, end, instrument, jump) {',
				'    for (var startIndex = 0; startIndex <= starts.length; startIndex += 1)',
				'    {',
				'        for (var i = starts[startIndex]; i <= end; i += jump)',
				'        {',
				'            pattern.addSound(instrument, i)',
				'        }',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm([1], 16, hh, 1)',
				'baseRhythm([1, 2.5, 8.5], 16, conga1, 8)'
			],
			base: [
				'// The function baseRhythm allows setting a basic rhythm.',
				'// It has been enriched, play with the elements in the first parameter to understand the change.',
				'// There is a wrong parameter on the line baseRhythm([1, 2.5, 6], 16, conga1, 8).',
				'// Change a parameter to fix the rhythm!',
				'function baseRhythm (starts, end, instrument, jump) {',
				'    for (var startIndex = 0; startIndex <= starts.length; startIndex += 1)',
				'    {',
				'        for (var i = starts[startIndex]; i <= end; i += jump)',
				'        {',
				'            pattern.addSound(instrument, i)',
				'        }',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm([1], 16, hh, 1)',
				'baseRhythm([1, 2.5, 6], 16, conga1, 8)'
			]
		},
		{
			solution: [
				'// We can fix the rhythm by putting 16 instead of 8 as the second parameter in baseRhythm(1, 16, conga1, 8).',
				'function baseRhythm (start, end, instrument, jump)',
				'{',
				'    for (var i = start; i <= end; i += jump)',
				'    {',
				'        pattern.addSound(instrument, i)',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm(1, 16, hh, 1)',
				'baseRhythm(1, 16, conga1, 8)',
				'baseRhythm(2.5, 16, conga1, 8)',
				'baseRhythm(8.5, 16, conga1, 8)'
			],
			base: [
				'// The function baseRhythm allows setting a basic rhythm.',
				'// There is a wrong parameter on the line baseRhythm(1, 8, conga1, 8).',
				'// Change a parameter to fix the rhythm!',
				'function baseRhythm (start, end, instrument, jump)',
				'{',
				'    for (var i = start; i <= end; i += jump)',
				'    {',
				'        pattern.addSound(instrument, i)',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm(1, 16, hh, 1)',
				'baseRhythm(1, 8, conga1, 8)',
				'baseRhythm(2.5, 16, conga1, 8)',
				'baseRhythm(8.5, 16, conga1, 8)'
			]
		},
		{
			solution: [
				'// We can fix the rhythm by putting 8 instead of 4 as the fourth parameter in baseRhythm(1, 16, conga1, 8).',
				'function baseRhythm (start, end, instrument, jump)',
				'{',
				'    for (var i = start; i <= end; i += jump)',
				'    {',
				'        pattern.addSound(instrument, i)',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm(1, 16, hh, 1)',
				'baseRhythm(1, 16, conga1, 8)',
				'baseRhythm(2.5, 16, conga1, 8)',
				'baseRhythm(8.5, 16, conga1, 8)'
			],
			base: [
				'// The function baseRhythm allows setting a basic rhythm.',
				'// There is a wrong parameter on the line baseRhythm(1, 16, conga1, 4).',
				'// Change a parameter to fix the rhythm!',
				'function baseRhythm (start, end, instrument, jump)',
				'{',
				'    for (var i = start; i <= end; i += jump)',
				'    {',
				'        pattern.addSound(instrument, i)',
				'    }',
				'}',
				'',
				'pattern.addSound(hh, 12.75)',
				'baseRhythm(1, 16, hh, 1)',
				'baseRhythm(1, 16, conga1, 4)',
				'baseRhythm(2.5, 16, conga1, 8)',
				'baseRhythm(8.5, 16, conga1, 8)'
			]
		}

	]

	var end = [
		'function baseRhythmEnd (start, end, instrument, jump)',
		'{',
		'    for (var i = start; i <= end; i += jump)',
		'    {',
		'        pattern.addSound(instrument, i)',
		'    }',
		'}',
		'pattern.addSound(snare, 3)',
		'pattern.addSound(snare, 7)',
		'pattern.addSound(snare, 11)',
		'pattern.addSound(snare, 15)',
		'pattern.addSound(kick, 1)',
		'pattern.addSound(kick, 3.5)',
		'pattern.addSound(kick, 4.5)',
		'pattern.addSound(kick, 5)',
		'pattern.addSound(kick, 8.75)',
		'pattern.addSound(kick, 9)',
		'pattern.addSound(kick, 11.5)',
		'pattern.addSound(kick, 12.5)',
		'pattern.addSound(kick, 13)',
		'pattern.addSound(kick, 16.5)',
		'pattern.addSound(kick, 16.75)',
		'pattern.addSound(rim, 2)',
		'pattern.addSound(rim, 6)',
		'pattern.addSound(rim, 10)',
		'pattern.addSound(rim, 14)',
		'pattern.addSound(conga3, 3)',
		'pattern.addSound(conga3, 11)',
		'baseRhythmEnd(2.75, 16, conga2, 2)',
		'baseRhythmEnd(5.75, 16, conga2, 8)',
		'baseRhythmEnd(4.5, 7, conga2, 1)',
		'baseRhythmEnd(12.5, 15, conga2, 1)'
	]


	return {
		init: init,
		portions: portions,
		end: end,
		musicLoops: musicLoops,
		sounds: sounds,
		minimumGoodAnswers: 4,
		isolatePortions: true
	}


})
