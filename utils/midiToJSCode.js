var fs = require('fs')

function writeInFile (data) {
	var outputPath = process.argv[3] || 'output.js'
	fs.writeFile(outputPath, data, function (err) {
		if (err) {
			console.log(err)
		} else {
			console.log('File saved')
		}
	})
}


function codeListToStr (codes) {
	var result = ''

	for (var i = 0; i < codes.length; i++) {
		result += codes[i] + '\n'
	}

	return result
}


function createCodeFrom (path) { // create js code with midi file
	var midi = loadFileMidi(path)
	var code = midiToCode(midi)

	writeInFile(codeListToStr(code))
}


function getParentFolder (path) {
	var folders = require('path').normalize(path + '/..').split('/')
	return folders[folders.length - 1]
}

function loadFileMidi (path) { // load content from file targeted by path
	var midiParser = require('midi-file-parser')

	var file = fs.readFileSync(path,'binary')

	var midi = midiParser(file)

	return midi
}


function midiToCode (midi) {
	var code = []
	var timeCode = 0
	var tickRate = midi.header.ticksPerBeat
	var instrument
	var regexCleanName = new RegExp('.*- +', 'i')

	code.push('\'var pattern = new Pattern()\',')

	for (var i = 0; i < midi.tracks[0].length; i++) {
		var currentLine = midi.tracks[0][i]
		if (currentLine.type === 'meta' && currentLine.subtype === 'trackName') {
			instrument = currentLine.text.replace('\u0000', '').replace(regexCleanName, '')
		}
		if (currentLine.type !== 'channel') {
			continue
		}
		timeCode += currentLine.deltaTime
		if (currentLine.subtype === 'noteOff') {
			continue
		}
		var time = Math.round((timeCode / tickRate) * 100) / 100

		var line = "'pattern.addSound(" + instrument.toLowerCase() + ", " + (time + 1) + ")'"
		if (i < midi.tracks[0].length - 1) {
			line += ','
		}

		code.push(line)

	}

	var init = '\'var ' + instrument.toLowerCase() + ' = new Instrument("' + instrument + '.wav")\','
	code.splice(1, 0, '')
	code.splice(1, 0, init)

	return code
}

createCodeFrom(process.argv[2])
