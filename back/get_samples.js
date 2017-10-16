var fs = require('fs')

var availableSamples = []
var availableLoops   = []

var soundsPath  = './public/assets/sounds'

var samplesPath = 'samples'
var loopsPath   = 'loops'


function reachFiles (path, callback) {
    var results = fs.readdirSync(path)
    for (var i = 0; i < results.length; i++) {
        var elementPath = path + '/' + results[i]
        if (fs.statSync(elementPath).isDirectory()) {
            reachFiles(elementPath, callback)
        } else {
            callback(elementPath)
        }
    }
}


reachFiles(soundsPath + '/' + samplesPath, function (path) {
    availableSamples.push(path.split(soundsPath + '/')[1])
})

reachFiles(soundsPath + '/' + loopsPath, function (path) {
    availableLoops.push(path.split(soundsPath + '/')[1])
})

var list = {
    samples: availableSamples,
    loops:   availableLoops
}


module.exports = list
