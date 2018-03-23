require('module-alias/register')

var express = require('express')
var expressCtrl = require('express-controllers-loader')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var exec = require('child_process').exec
var ytdl = require('ytdl-core');
var mp4converter = require('./back/exporter/mp4_exporter');
const uniqueString = require('unique-string');
const fs = require('fs');
const NodeCache  = require('node-cache');
var port = 8000

var scriptsPath = './back'
var exportSounds = require(scriptsPath + '/export.js')
const scrapeService = require(scriptsPath + '/scrape_service.js')


var traceCacheInstance = new NodeCache({
    stdTTL: 300,
    checkperiod: 100,
    errorOnMissing: false
});


app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());

expressCtrl.load(app, {
    verbose : true,
    preURL : '/api',
    permissions: require('@api_utils/auth.js'),
    controllers_path : path.join(__dirname, './back/store/api/controllers'),
    level: "public"
});

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
    var notesList = JSON.parse(req.query.notes.replace(/mp3/g,'wav'));
    console.log(notesList);
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

app.get('/video', function (req, res) {

    var uniqueFileId  = uniqueString() + '_' + String(Date.now());

    var notesList     = JSON.parse(req.query.notes.replace(/mp3/g,'wav'));

    var lang          = req.acceptsLanguages('en', 'fr');
    lang = (lang) ? lang.toUpperCase(): 'EN';

    exportSounds({
        notes: notesList,
        id: uniqueFileId
    }, function () {

        var prefix_path = './public/assets/sounds/export/output' + uniqueFileId;


        mp4converter.doExport(prefix_path + '.mp3', prefix_path, lang, function(err, success) {
            if(err)
            {
                console.error('mp4_exporter :: export fail', err);
                res.status(500).end('Server error');
                return;
            }
            else
            {
                console.log('mp4_exporter :: export success');

                res.sendFile(prefix_path + '.mp4', {root: __dirname}, function (err) {
                    if (err)
                    {
                        res.status(500).end('Server error');
                    }
                    else
                    {
                        console.log('Sent:', prefix_path + '.mp4');
                    }
                    try { exec('rm ' + prefix_path + '.mp3'); } catch (e) {}
                    try { exec('rm ' + prefix_path + '.mp4'); } catch (e) {}
                });

                setTimeout(function () {
                    exec('rm ' + prefix_path + '.mp3');
                    exec('rm ' + prefix_path + '.mp4');
                }, 15000);
            }
        });
    });

});

app.get('/scrape', function (req, res) {
    res.json(scrapeService.getData());
});

app.get('/ytmp3/:videoid', function (req, res) {
  try
  {
      ytdl('https://youtube.com/watch?v=' + req.params.videoid, {filter: 'audioonly', quality: 'lowest'}).pipe(res);
  }
  catch (err)
  {
    res.status(500).end();
  }
});

app.post('/trace', function (req, res) {
    traceCacheInstance.set(new Date().getTime() + ' - ' +req.body.msg, '');
});

app.get('/trace', function (req, res) {
    res.json(traceCacheInstance.keys());
});

app.get('/health', function (req, res) {
    res.json({status:'UP'});
});

app.listen(port, function () {
    console.log('Server is running on port: ' + port)
})
