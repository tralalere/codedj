var fs   = require('fs')
var wav  = require('node-wav')
var exec = require('child_process').exec

var express = require('express')
var app = express()

// var music = [
//     {soundName: 'G1-16bit/SNARE.wav', start: 400},
//     {soundName: 'G1-16bit/TOM.wav', start: 500},
//     {soundName: 'G1-16bit/SNARE.wav', start: 700},
//     {soundName: 'G1-16bit/TOM.wav', start: 1400},
//     {soundName: 'G1-16bit/TOM.wav', start: 1500},
//     {soundName: 'G1-16bit/SNARE.wav', start: 1600},
//     {soundName: 'G1-16bit/TOM.wav', start: 1800},
//     {soundName: 'G1-16bit/TOM.wav', start: 1900},
//     {soundName: 'G1-16bit/SNARE.wav', start: 2000},
//     {soundName: 'G1-16bit/SNARE.wav', start: 2200},
//     {soundName: 'G1-16bit/KICK.wav', start: 2800},
//     {soundName: 'G1-16bit/SNARE.wav', start: 2800}
// ]

var music = []

for (var i = 0; i < 500; i++) {
    music.push({soundName: 'G1-16bit/SNARE.wav', start: Math.random() * 120000})
}

function exportSounds (notes, callback) {
    var result = mixNotes(notes)

    var encodedWav = wav.encode(result.channelData, {sampleRate: result.sampleRate, float: true, bitDepth: 32})

    var path = './assets/sounds/export/'
    fs.writeFileSync(path + 'output.wav', encodedWav)

    exec('sox ' + path + 'output.wav ' + path + 'output.mp3', function (err) {
        if (err) {
            console.log('exec error: ' + err)
        } else {
            exec('rm ' + path + 'output.wav')
            callback()
        }
    })
}

function mixNotes (notes) {
    var loadedSamples = loadSamples(notes)
    var resultBufferLength = findFinalLength(loadedSamples, notes)
    var resultBuffer = new Float32Array(resultBufferLength)
    var sampleRate

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i]

        if (!sampleRate) {
            sampleRate = loadedSamples[note.soundName].sampleRate
        }

        addSampleToMix(resultBuffer, note, loadedSamples)
    }

    normalize(resultBuffer)

    return {
        sampleRate: sampleRate,
        channelData: [resultBuffer, resultBuffer] // for stereo
    }
}

function loadSamples (notes) {
    var loadedSamples = {}
    var note
    for (var i = 0; i < notes.length; i++) {

        note = notes[i]
        if (!loadedSamples[note.soundName]) {
            loadedSamples[note.soundName] = loadSample(note.soundName)
        }
    }

    return loadedSamples
}

function loadSample (soundName) {
    return wav.decode(fs.readFileSync('./assets/sounds/' + soundName))
}

function findFinalLength (loadedSamples, notes) {
    var lastTime = 0
    var sampleRate

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i]
        sampleRate = loadedSamples[note.soundName].sampleRate
        var sampleLength = loadedSamples[note.soundName].channelData[0].length
        var time = notes[i].start / 1000 * sampleRate + sampleLength

        if (time > lastTime) {
            lastTime = time
        }
    }
    return lastTime
}

function addSampleToMix (mix, note, loadedSamples) {
    var currentSample = loadedSamples[note.soundName]
    var sampleRate = loadedSamples[note.soundName].sampleRate

    for (var x = 0; x < currentSample.channelData[0].length; x++) {
        var sampleDelta = (note.start * sampleRate / 1000 + x)

        mix[sampleDelta] += currentSample.channelData[0][x]
    }
}

function normalize (array) {
    var max = array[0]
    var i

    for (i = 0; i < array.length; i++) { // search max
        if (array[i] > max) {
            max = array[i]
        }
    }

    for (i = 0; i < array.length; i++) { //normalize
        array[i] /= max
    }
}

app.get('/', function (req, res) {


    exportSounds(music, function () {
        res.download('./assets/sounds/export/output.mp3')
        console.log('sended')
    })
})

app.post('/', function (req, res) {

    exportSounds(JSON.parse(req.query.notes), function () {
        res.download('./assets/sounds/export/output.mp3')
        console.log('sended')
    })
})

app.listen(8080)
