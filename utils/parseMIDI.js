var fs = require('fs')

function writeInFile (data) {
	fs.writeFile('output.js', data, function (err) {
		if (err) {
			console.log(err)
		} else {
			console.log('File saved')
		}
	})
}

function JsonToJs (object) {
	var result = 'define([], function () { var samplesPack = '
	result += JSON.stringify(object)
	result += 'return samplesPack})'

	return result
}


function loadMusic (path) { // format and concatenate all tracks from folder
	var music = {}

	fs.readdir(path, function (err, subDirs) {

		if (err) {
			console.log (err)
			return
		}

		for (var i in subDirs) {
			var dir = subDirs[i]
			var fullPath = path + '/' + dir
			music[dir] = []

			if (fs.lstatSync(fullPath).isDirectory()) {
				var files = fs.readdirSync(fullPath)

				for (var i in files) {
					getMusicFromFolder(fullPath + '/' + files[i], music[dir])
				}
			} else {
				getMusicFromFolder(fullPath, music[dir])
			}
		}

		writeInFile(JsonToJs(music))
	})
}

function getMusicFromFolder (path, result) { // fill notes in tracks
	var formatedTrack = formatTrack(loadFileMidi(path).tracks[0], loadFileMidi(path).header.ticksPerBeat)
	var parentFolder  = getParentFolder(path)
	var instrument    = formatedTrack[0].instrument
	var fileName      = getFileName(path)

	var data = {
		loopName: fileName,
		source: fileName + '.wav',
		instrument: instrument,
		notes: formatedTrack.splice(1) // remove first element which is meta data
	}

	result.push(data)
}

function getParentFolder (path) {
	var folders = require('path').normalize(path + '/..').split('/')
	return folders[folders.length - 1]
}

function getFileName (path) {
	var splitPath = path.split('/')
	var fileName  = splitPath[splitPath.length - 1]

	return fileName.split('.')[0]
}

function loadFileMidi (path) { // load content from file targeted by path
	var midiParser = require('midi-file-parser')

	var file = fs.readFileSync(path,'binary')

	var midi = midiParser(file)

	return midi
}

function formatTrack(track, tickRate) {
	var newTrack = []

	var timeCode = 0
	var instrument = 'none'
	var currentLine
	var event

	for (var i = 0; i < track.length; i++) {
		currentLine = track[i]

		if (currentLine.type === 'meta' && currentLine.subtype === 'trackName') {
			var regexCleanName = new RegExp('.*- ', 'i')
			instrument = currentLine.text.replace('\u0000', '').replace(regexCleanName, '')
		}
		if (currentLine.type !== 'channel') {
			continue
		}
		timeCode += currentLine.deltaTime
		if (currentLine.subtype === 'noteOff') {
			continue
		}
		var noteOffInfos = getNoteDuration(track, i)

		event = {
			timeStart: timeCode / tickRate,
			duration: noteOffInfos.duration / tickRate,
			note: currentLine.noteNumber,
			attack: currentLine.velocity,
			release: noteOffInfos.release
		}

		newTrack.push(event)
	}

	var meta = {
		instrument: instrument
	}

	newTrack.splice(0, 0, meta)

	return newTrack
}


function getNoteDuration (track, eventIndex) { // Look for the specified note end
	var duration = 0
	var note = track[eventIndex].noteNumber
	var event

	for (var i = eventIndex + 1; i < track.length; i++) {
		event = track[i]

		duration += event.deltaTime

		if (event.noteNumber === note && event.subtype === 'noteOff') {
			break
		}
	}

	return {
		duration: duration,
		release: event.velocity
	}
}


loadMusic(process.argv[2])


//~ writeInFile(JSON.stringify(loadFileMidi('1A - ALL.mid')))
