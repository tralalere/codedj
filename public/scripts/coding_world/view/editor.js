var lang = 'fr';
if(navigator.language || navigator.userLanguage){
    lang = navigator.language || navigator.userLanguage;
};

if(localStorage.getItem('lang')){

    if (localStorage.getItem('lang') !== 'fr' || localStorage.getItem('lang').substring(0, 2) !== 'fr') {
        if(localStorage.getItem('lang') !== 'en'){
            localStorage.setItem('lang', 'en')
            location.reload();
        }
    }

    lang = localStorage.getItem('lang')
}

if (lang !== 'fr' || lang.substring(0, 2) !== 'fr') {
    lang = 'en'
} else {
    lang = 'fr'
}

define([
    'jquery',
    'toxilibs/event_bus_queued',
    'toxilibs/code_editor_capabilities',
    'toxilibs/ace_custom_javascript',
    '../levels/level_manager',
    'ext_libs/lodash/lodash'
], function ($, globalEventBus, addCodeEditorCapabilities, aceCustomJavaScript, levelmanager, lodash) {

    var eventBus = globalEventBus('view')

    eventBus.on('html ready',  initDom)
    eventBus.on('world ready', initEditor)
    eventBus.on('user want to go next', function () {
        $('#btn_execute').removeClass('pause')
        $('#btn_next_question').addClass('invisible')
    })
    eventBus.on('user finish level', function () {
        $('#btn_next_question').removeClass('invisible')
    })
    eventBus.on('pattern has reached loop limit', function () {
        $('#btn_execute').click()
    })

    var codeEditor = {}
    var initialCode
    var solutionCode
    var $textArea
    var $searchFieldButton
    var $sampleButton

    var $blocPopUp
    var $pop
    var $pack

    var $blocPopUp = $('#world2 > .blocPopUp')
    var $pop = $('#world2 > .blocPopUp > .shopPopPup')
    var $pack = $('#pack-template').html()

    var $blocSound = $('#bloc-sound').html()


    globalEventBus('solutionWorld').on('world ready', function (world) {
        solutionCode = world.exposedCode()
    })
    

    function initDom () {

        globalEventBus.on('change focus', function (hidden) {
            switchPlay(hidden)
        })

        initDomEvents()
        $('#editor').css({
            display: 'block'
        })

        $('#btn_next_question').addClass('invisible')

        /*$('#player_buttons').css({
            display: 'inline-block'
        })*/

        addCodeEditorCapabilities(codeEditor, {
            container: $('#code_editor'),
            content:   '',
            fontSize: 20

            // onChange: onEditorChanges
        })

        aceCustomJavaScript({
            editor: codeEditor.aceEditor,
            words: {
                keywords: ['pattern', 'tempo'],
                functions: ['addSound']
            },
            style: {
                keywords: 'color: #FF987C',
                functions: 'color: rgb(203, 3, 183)'
            }
        })

        $searchFieldButton = $('<div id="btn_search"></div>')
        $sampleButton = $('<div id="btn_sample"></div>')
        $('#code_editor').append($searchFieldButton)
        $('#code_editor').append($sampleButton)


        $searchFieldButton.click(openSearch)
        $sampleButton.click(openSample)


        $('#resizable').resize(function () {
            codeEditor.aceEditor.resize()
        })

        codeEditor.aceEditor.setOptions({enableBasicAutocompletion: false, enableLiveAutocompletion: false});
        
    }

    function openSearch () {
        codeEditor.aceEditor.execCommand('find')
    }


    function includeSound(sounds, type){

        sounds.forEach(function(val,key){
            for(var i=0; i< sounds[key].length;i++){
                
                var div = '<div class="col-md-6 bloc-item">'
                div += '<div class="pack-item">'
                div += '<div class="row include-sound">'

                div += '<div class="col-md-4">'
                div += '<div class="icon-play-shop">'
                div += '<audio preload>'
                div += '<source src="./assets/sounds/'+sounds[key][i].source+'"></audio>'
                div +='</div>'
                div +='</div>'

                div += '<div class="bloc-btn-shop col-md-8">'
                div += '<h3>'+sounds[key][i].name+'</h3>'

                if(sounds[key][i].used){
                    if(lang == 'fr'){
                        div += '<div data-type="'+type+'" data-used="'+sounds[key][i].used+'" data-source="'+sounds[key][i].source+'" data-name="'+sounds[key][i].name+'" class="btn-shop white-btn add-to-script used">Ajouté</div>'

                    } else{
                        div += '<div data-type="'+type+'" data-used="'+sounds[key][i].used+'" data-source="'+sounds[key][i].source+'" data-name="'+sounds[key][i].name+'" class="btn-shop white-btn add-to-script used">Already added</div>'
                    }
                } else{
                    if(lang == 'fr'){
                        div += '<div data-type="'+type+'" data-used="'+sounds[key][i].used+'"  data-source="'+sounds[key][i].source+'" data-name="'+sounds[key][i].name+'" class="btn-shop white-btn add-to-script">Ajouter au script</div>'

                    } else{
                        div += '<div data-type="'+type+'" data-used="'+sounds[key][i].used+'"  data-source="'+sounds[key][i].source+'" data-name="'+sounds[key][i].name+'" class="btn-shop white-btn add-to-script">Add to script</div>'
                    }
                }

                div += '</div>'

                div += '</div>'
                div += '</div>'
                div += '</div>'
                
                
                if(type == 'sample'){
                    $('.shopPopPup #bloc-sample').append(div)

                } else{
                    $('.shopPopPup #bloc-loop').append(div)

                }
                
            }
        })

    }

    function initPack(){
        $pop.find('.bloc-pack').remove()
        $pop.append($pack)

        var samples = getMusicList('sounds',codeEditor.content())
        var loops =  getMusicList('musicLoops',codeEditor.content(),'loops/')

        includeSound(samples, 'sample')
        includeSound(loops, 'loop')

        $('.add-to-script').on('click',function() {
            var newString = "\nvar "+$(this).data().name+" = new Instrument('"+$(this).data().source+"')"

            //codeEditor.insertText(newString)
            codeEditor.aceEditor.session.insert({row:1, column: 10}, newString)

        })

        $('.icon-play-shop').on('click', function(){
            var t =  $(this);

            $('.icon-play-shop').removeClass('pause')

            var audios = $('.icon-play-shop').children()

            for(var i = 0, len = audios.length; i < len;i++){
                audios[i].pause();
            }
            
            if(!$(this).children().hasClass('active')){
                
                $(this).children().addClass('active')
                
                $(this).children()[0].play()
                
                t.addClass('pause')
                
            } else{
                
                $('.icon-play-shop audio').removeClass('active')
            }

            $(this).children()[0].addEventListener("ended", function(){
                this.currentTime = 0;
                $('.icon-play-shop').removeClass('pause')
                $('.icon-play-shop audio').removeClass('active')
            });
        })

        $('.pack-item').on('click',function(){
            $('.pack-item').removeClass('active')
            $(this).addClass('active')
        });
    }

    
    function openSample () {
        $blocPopUp.fadeIn()
        
        $('#sound').on('click',function() {
            $('.shopPopPup #bloc-loop').hide()
            $('.shopPopPup #bloc-sample').show()
        })

        $('#loop').on('click',function() {
            $('.shopPopPup #bloc-sample').hide()
            $('.shopPopPup #bloc-loop').show()
        })
        
    }

    function getMusicList(type, code, pathPrefix)
    {
        var alreadyUsedMusic = parseAlreadyExistantSamples(code);

        var temp = lodash.flatMap(levelmanager.getLevelsData(), function(item) {
            return item[type];
        });

        temp = lodash.flatMap(temp, function(item) {
            return {
                name    : (item.loopName || item.soundName),
                source  : (pathPrefix ? pathPrefix : '') + (item.source || item.soundSource),
                used    : lodash.includes(alreadyUsedMusic, (pathPrefix ? pathPrefix : '') + (item.source || item.soundSource))
            }
        })

        temp = lodash.uniqBy(temp, 'source')

        return lodash.chunk(lodash.values(temp), 2)
    }

    function parseAlreadyExistantSamples(code)
    {
        try
        {
            var allMatchs = code.match(/[^'"\(\)]+\.mp3/g)
            return (allMatchs && Array.isArray(allMatchs)) ? allMatchs : []
        }
        catch (e)
        {
            return []
        }
    }

    /*
     TODO:  integration css function initDomEvents ()  in comment
     */
    function initDomEvents () {
       // $('#btn_execute').on('click', runCode)
        $('#btn_reset').on('click', reset)

        //$('#btn_stop').on('click', stopLoop)
        $('#btn_solution').on('click', function () {
            codeEditor.setContent(solutionCode)
            runCode()
            eventBus.emit('user ask for solution')
        })

        $('#btn_next_question').on('click', function () {
            stopLoop()
            eventBus.emit('user want to go next')
        })

        $('#btn_execute').on('click', function () {
            if ($(this).hasClass('pause')) {
                $(this).removeClass('pause')
                runCode()
            } else {
                $(this).addClass('pause')
                stopLoop()
            }
        })

        $('#btn_save').click(function () {
            if (!isPopinOpen()) {
                showSavePopin()
            }
        })
        $('#btn_load').click(function () {
            if (!isPopinOpen()) {
                showLoadPopin()
            }
        })
        $('#mp3').click(function () {
            //TODO: pop-up de confirmation
            eventBus.emit('save creation requested')
        })

        $('#upload-my-video').click(function () {
            eventBus.emit('get code editor content', codeEditor.content())
        })
        
    }


    function isPopinOpen () {
        return $('.popin').length !== 0
    }


    function showSavePopin () {
        var popin = $('<div class="popin"></div>')
        var content = $('<div class="content"><h3>Choisissez un nom de sauvegarde </h3><br><input id="filename" type="text"><div class="btnNext btn btnCodeDj" id="save"><img class="iconBtnNext" src="assets/iconBtnNext.png"><span>Sauvegarder</span></div></div>')

        if (lang !== 'fr'){
            popin = $('<div class="popin"></div>')
            content = $('<div class="content"><h3>Choose a save name</h3><br><input id="filename" type="text"><div class="btnNext btn btnCodeDj" id="save"><img class="iconBtnNext" src="assets/iconBtnNext.png"><span>Save</span></div></div>')
        }
        popin.append(content)


        $('body').append(popin)

        $('#save').click(function (event) {
            saveCode($('#filename').val())
            $('.popin').remove()
        })
        $('.popin').on('click',function(event){
            event.stopImmediatePropagation()
            if(event.target != this){ return true; }
            $('.popin').remove()
        })
    }


    function showLoadPopin () {
        
        var popin = $('<div class="popin"></div>')
        var content = $('<div class="content"><h3>Choisissez la sauvegarde à charger</h3><br></div>')

        if (lang !== 'fr'){
            popin =  $('<div class="popin"></div>')
            content = $('<div class="content"><h3>Choose a creation to load</h3><br></div>')
        }

        popin.append(content)

        var select = $('<select id="saves"></select>')
        var saves = loadCodes()

        for (var i in saves) {
            select.append('<option values="' + i + '">' + i + '</option>')
        }

        content.append(select)

        if(lang == 'fr'){
            content.append('<div class="btnNext btn btnCodeDj" id="load"><img class="iconBtnNext" src="assets/iconBtnNext.png"><span>Charger</span></div>')
        } else {
            content.append('<div class="btnNext btn btnCodeDj" id="load"><img class="iconBtnNext" src="assets/iconBtnNext.png"><span>Load</span></div>')
        }


        $('body').append(popin)

        $('#load').click(function (event) {
            var selected = $('#saves').find(':selected').text()
            codeEditor.setContent(saves[selected])
            $('.popin').remove()
        })

        $('.popin').on('click',function(event){
            event.stopImmediatePropagation()
            if(event.target != this){ return true; }
            $('.popin').remove()
        })
    }



    function saveCode (fileName) {
        var data = JSON.parse(localStorage.getItem('tune') || '{}')
        data[fileName] = codeEditor.content()
        localStorage.tune = JSON.stringify(data)
    }


    function loadCodes () {
        return JSON.parse(localStorage.getItem('tune'))
    }


    function initEditor (world) {
        initialCode = world.exposedCode()
        codeEditor.setContent(initialCode)
        initPack()
    }
    function switchPlay (hidden) {
        if(hidden){
            $('#btn_execute').addClass('pause')
            stopLoop()
        }else {
            $('#btn_execute').removeClass('pause')
            runCode()
        }
       
    }

    var editorChangeTimeout

    // function onEditorChanges () {
    //     if (editorChangeTimeout) {
    //         clearTimeout(editorChangeTimeout)
    //     }
    //     editorChangeTimeout = setTimeout(runCode, 500)
    // }


    function runCode () {
        stopLoop()
        eventBus.emit('reset')
        eventBus.emit('code execution requested', codeEditor.content())
    }


    function stopLoop () {
        eventBus.emit('loop stop requested', {stopAll: true})
    }


    function reset () {
        codeEditor.setContent(initialCode)
        runCode()

    }

})
