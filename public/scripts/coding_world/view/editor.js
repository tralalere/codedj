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
    'toxilibs/ace_custom_javascript'
], function ($, globalEventBus, addCodeEditorCapabilities, aceCustomJavaScript) {

    var eventBus = globalEventBus('view')

    eventBus.on('html ready',  initDom)
    eventBus.on('userWorld code ready', initEditor)
    eventBus.on('sandboxWorld code ready', initEditor)
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

    globalEventBus.on('solutionWorld code ready', function (code) {
        solutionCode = code
    })


    /*
     TODO:  integration css function initDom () in comment
     */
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
        $('#code_editor').append($searchFieldButton)
        $searchFieldButton.click(openSearch)

        $('#resizable').resize(function () {
            codeEditor.aceEditor.resize()
        })

        codeEditor.aceEditor.setOptions({enableBasicAutocompletion: false, enableLiveAutocompletion: false});

    }

    function openSearch () {
        codeEditor.aceEditor.execCommand('find')
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

        if (lang === 'fr') {
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


    function initEditor (code) {
        initialCode = code
        codeEditor.setContent(code)
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
        $('#btn_execute').removeClass('pause')
        stopLoop()

        // eventBus.emit('reset')
        eventBus.emit('code execution requested', codeEditor.content())
    }


    function stopLoop () {
        eventBus.emit('loop stop requested', {stopAll: true})
        eventBus.emit('reset')
    }


    function reset () {
        codeEditor.setContent(initialCode)
        runCode()

    }

})
