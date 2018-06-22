define(['ace'], function (ace) {
    'use strict'


    var defaultFontSize = 12


    // params :
    // - theme
    // - fontSize
    // - container
    // - onChange
    // - content
    function addCodeEditorCapabilities (object, params) {

        if (!ace) {
            throw new Error('Ace has not been loaded properly ! Check your require.config, you may have forgotten to add ace to path and to shims.')
        }

        params = params || {}

        var changeEventDisabled = false
        var onChange = params.onChange

        if (params.acePath) {
            ace.config.set('basePath',   params.acePath)
            ace.config.set('workerPath', params.acePath)
            ace.config.set('themePath',  params.acePath)
        }


        function init () {
            object.$container = object.$container || params.container
            object.aceEditor  = ace.edit(object.$container[0])

            object.aceEditor.$blockScrolling = Infinity // has to be set before setContent

            if (params.content) {
                object.setContent(params.content)
            }

            setEditorPreferences(object.aceEditor, params)

            if (onChange) {
                object.aceEditor.on('change', function () {
                    if (!changeEventDisabled) {
                        callChangeCallback()
                    }
                })
            }

        }


        function callChangeCallback () {
            onChange(object.content())
        }


        object.remove = function () {
            this.aceEditor.destroy()
        }


        object.hide = function () {
            this.$container.hide()
        }


        object.show = function () {
            this.$container.show()
            this.focus()
        }


        object.focus = function () {
            this.aceEditor.focus()
        }


        object.isFocused = function () {
            return this.aceEditor.isFocused()
        }


        // to visualize it, htmlClassName must be styled with css
        object.showLine = function (line, htmlClassName) {
            this.aceEditor.getSession().setBreakpoint(line, htmlClassName || 'breakpoint')
        }


        object.stopShowingLine = function () {
            this.aceEditor.getSession().clearBreakpoints()
        }


        object.content = function () {
            return this.aceEditor.getValue()
        }


        object.errors = function () {
            return this.aceEditor.getSession().getAnnotations()
        }


        object.insertText = function (text) {
            this.aceEditor.insert(text)
        }


        object.showSearchField = function () {
            this.aceEditor.execCommand('find')
        }

        object.hideSearchField = function () {
            $('.ace_search').css({
                display: 'none'
            })
        }


        object.setContent = function (text) {
            changeEventDisabled = true
            this.aceEditor.setValue(text || '')
            this.aceEditor.getSession().selection.clearSelection()
            changeEventDisabled = false
            if (onChange) {
                callChangeCallback()
            }
        }


        object.setReadOnly = function (bool) {
            if (typeof bool === 'undefined') {
                bool = true
            }
            this.aceEditor.setReadOnly(bool)
        }

        object.addSpace = function () {
            var rowLength = this.aceEditor.session.getLength() + 1
            this.aceEditor.session.insert({row : rowLength, column: 0}, '\n\n')
        }

        init()

    }






    function addShortcutCheatSheet (editor) {
        editor.commands.addCommand({
            name: 'showKeyboardShortcuts',
            bindKey: {win: 'Ctrl-Alt-h', mac: 'Command-Alt-h'},
            exec: function (aceEditor) {
                ace.config.loadModule('ace/ext/keybinding_menu', function (module) {
                    module.init(aceEditor)
                    aceEditor.showKeyboardShortcuts()
                })
            }
        })
    }


    function setEditorPreferences (editor, params) {
        params = params || {}
        editor.setTheme('ace/theme/' + (params.theme || 'monokai'))
        var codeSession = editor.getSession()
        codeSession.setMode('ace/mode/javascript')
        codeSession.setUseSoftTabs(true)
        codeSession.setUseWrapMode(true)
        editor.setShowPrintMargin(false)
        codeSession.selection.clearSelection()
        addShortcutCheatSheet(editor)
        editor.setOptions({
            fontSize: params.fontSize || defaultFontSize
        })
        if ('readOnly' in params) {
            editor.setReadOnly(params.readOnly)
        }
        if ('useWorker' in params) {
            codeSession.setUseWorker(params.useWorker)
        }
    }


    return addCodeEditorCapabilities

})
