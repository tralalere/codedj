var fs   = require('fs')
var wav  = require('node-wav')
var exec = require('child_process').exec


function exportSounds (params, callback) {
    var result = mixNotes(params.notes)
    var id = params.id

    var encodedWav = wav.encode(result.channelData, {sampleRate: result.sampleRate, float: true, bitDepth: 32})
    var path = './public/assets/sounds/export/'
    
    fs.writeFileSync(path + 'output' + id + '.wav', encodedWav)
    exec('sox ' + path + 'output' + id + '.wav ' + path + 'output' + id + '.mp3', function (err) {
        if (err) {
            console.log('exec error: ' + err)
        } else {
            exec('rm ' + path + 'output' + id + '.wav')
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

function loadSample (soundPath) {
    return wav.decode(fs.readFileSync('./public/assets/sounds/sounds_wav/' + soundPath))
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


module.exports = exportSounds
