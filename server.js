var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var exec = require('child_process').exec
var port = 8000

var scriptsPath = './back'
var exportSounds = require(scriptsPath + '/export.js')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/samples', function (req, res) {
    var list = require(scriptsPath + '/get_samples.js')
    res.end(JSON.stringify(list))
})


var tokenToID = {}
var increment = 0

app.get('/export', function (req, res) {
    var token = req.query.token
    var id    = String(Date.now()) + increment
    increment++
    tokenToID[token] = id
    var notesList = JSON.parse(req.query.notes)
    exportSounds({
        notes: notesList,
        id: id
    }, function () {
        res.end()
    })
})

app.get('/download', function (req, res) {
    var token = req.query.token
    var id    = tokenToID[token]

    if (!id) {
        res.status(401).end('Bad request')
        return
    }
    res.download('./public/assets/sounds/export/output' + id + '.mp3', 'Code-DJ_creation.mp3', function (err) {
        if (err) {
            console.log(err)
        } else {
            exec('rm ./public/assets/sounds/export/output' + id + '.mp3')
            console.log('dl completed')
        }
    })
})

app.listen(port, function () {
    console.log('Server is running on port: ' + port)
})
