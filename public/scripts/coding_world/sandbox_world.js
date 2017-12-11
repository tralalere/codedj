define([
    'jquery',
    'toxilibs/event_bus_queued',
    './core/world_main',
    './core/user_to_core',
    '../upload_youtube/upload_youtube',

    './view/main',
    './view/editor',
    './user_code/user_code',
    'music_player/music_player'
], function ($, globalEventBus, World, userToCoreKeys, uploadYoutube) {

    var initialCode = [
        'var pattern = new Pattern()',
        '',
        'var hitHat = new Instrument(\'samples/G1/HH.mp3\')',
        'var kick   = new Instrument(\'samples/G1/KICK.mp3\')',
        'var rim    = new Instrument(\'samples/G1/RIM.mp3\')',
        'var shaker = new Instrument(\'samples/G1/SHAKER_1.mp3\')',
        'var snare  = new Instrument(\'samples/G1/SNARE.mp3\')',
        'var tom    = new Instrument(\'samples/G1/TOM.mp3\')',
        'var conga  = new Instrument()',
        '',
        'conga.addSample(\'CongaA\',\'samples/G1/CONGA_1.mp3\')',
        'conga.addSample(\'CongaB\',\'samples/G1/CONGA_2.mp3\')',
        'conga.addSample(\'CongaC\',\'samples/G1/CONGA_3.mp3\')',
        '',
        'pattern.addSound(rim, 2)',
        'pattern.addSound(rim, 4)',
        'pattern.addSound(tom, 6)',
        'pattern.addSound(tom, 8)',
        'pattern.addSound(snare, 10)',
        'pattern.addSound(snare, 12)',
        'pattern.addSound(snare, 14)',
        'pattern.addSound(snare, 16)',
        'pattern.addSound(shaker, 16)',
        '',
        'pattern.play()'
    ]


    var tunes    = []
    var patterns = []

    var userToken
    var self = this
    function init () {
        userToken = Date.now()
        $('#btn_save').removeClass('invisible')
        $('#btn_load').removeClass('invisible')
        $('#btn_solution').addClass('invisible')
        $('#uploadYt').removeClass('invisible')

        globalEventBus.emit('html ready')
        globalEventBus.emit('volume updated', 100)
        globalEventBus.emit('monde3')
        globalEventBus.on('reset', function () {
            tunes    = []
            patterns = []
        })
        globalEventBus.on('new pattern', function (pattern) {
            patterns.push(pattern)
        })
        globalEventBus.on('new tune', function (tune) {
            tunes.push(tune)
        })

        globalEventBus.on('load_token', function (token) {
            self.access_token = token;
        })

        globalEventBus.on('get code editor content', function (code) {
            startUpload(code)
        })


        new World(globalEventBus, {
            exposed: initialCode.join('\n')
        })

        $('#uploadYt').on('click', function(){
            $('#blocPopUp-youtube').fadeIn();
        })

        $('.templateGoogleConnexion').on('click', function(){
            
            if(!self.access_token){

                gapi.auth.authorize({
                    client_id: '837989009437-clgij106bf9i993v4lssc9rt8hvcjajk.apps.googleusercontent.com',
                    scope: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube',
                    immediate: false
                }, function(rep){
                    if (rep && !rep.error) {
                        
                        this.gapi.client.request({
                            path: '/youtube/v3/channels',
                            params: {
                                part: 'snippet',
                                mine: true
                            },
                            callback: function (response) {
                                if (response.error) {
                                    console.log(response.error.message)
                                } else {
                                    $('#blocPopUp-youtube').fadeIn();
                                    $('#channel-name').text(response.items[0].snippet.title)
                                    $('#channel-thumbnail').attr('src', response.items[0].snippet.thumbnails.default.url)
                                    
                                    $('.pre-sign-in').fadeOut()
                                    $('.post-sign-in').fadeIn()
                                }
                            }.bind(this)})
                        
                        globalEventBus.emit('load_token', rep.access_token)
                        
                        $('.disabled-bloc').removeClass('active')
                        
                    } else {
                        $('.disabled-bloc').addClass('active')
                    }
                });
            } else {
                $('.disabled-bloc').removeClass('active')
            }
        })

        $('#uploadAndConvert .close-icon').on('click', function(){
            $('#blocPopUp-youtube').fadeOut();
        })

        $('#uploadAndConvert .btn-upload-completed').on('click', function(){
            $('#blocPopUp-youtube').fadeOut();
            $('.title-upload #title').val('')
            $('.wrap-btn').fadeIn();
            $('.during-upload').fadeOut();
            $('.post-upload').fadeOut();
        })


        $('.blocBtnStatus div').on('click',function(){
            $('.blocBtnStatus div').removeClass('active')
            $(this).addClass('active')
        });
    }

    globalEventBus.on('save creation requested', saveCreation)

    function startUpload(code){
        var notes = []

        if (tunes.length > 0) {
            for (var i in tunes) {
                var tune = tunes[i]
                browsePatterns(tune.patterns, notes)
            }
        } else {
            browsePatterns(patterns, notes)
        }


        code = "Auteurs samples = \nAntoine Boucherikha (Life Pass Filter), Walter Geny (Pyramide Studio)\n\n"+code;
        console.log(code);
        var data = {
            title:$('.title-upload #title').val(),
            description: code,
            tags:['codedj', 'tralalere', '78c2632450692db3e34b196f54b3988fa41727e0b20b6389000f38be90666d70'],
            privacy:$('.blocBtnStatus .active').text(),
            notes:notes,
            token: self.access_token
        }
        uploadYoutube.shareVideoToYoutube(data,function(){
            console.log('error');
        },function () {
            console.log('upload done');
        })
    }
    function saveCreation() {
        var notes = []

        if (tunes.length > 0) {
            for (var i in tunes) {
                var tune = tunes[i]
                browsePatterns(tune.patterns, notes)
            }
        } else {
            browsePatterns(patterns, notes)
        }
        $.get(document.location.origin + document.location.pathname + 'export', {
            notes: JSON.stringify(notes),
            token: userToken
        }, function () {
            window.location = document.location.origin + document.location.pathname + '/download?token=' + userToken
        })
    }


    function browsePatterns (patterns, notes) {
        for (var i in patterns) {
            var pattern = patterns[i]
            extractNotes(pattern, i, notes)
        }
    }


    function extractNotes (pattern, patternIndex, notes) {
        for (var i in pattern.notes) {
            var note = pattern.notes[i]
            var patternDuration = Math.floor(pattern.duration() * patternIndex)
            notes.push({
                start: (note.start - 1) * Math.floor((60 * 1000) / userToCoreKeys.tempo) + patternDuration,
                soundName: note.soundSource()
            })
        }
    }



    return init

})
