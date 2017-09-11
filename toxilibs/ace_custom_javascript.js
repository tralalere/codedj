define([
    'ace',
    './css_injector'
], function (ace, cssInjector) {

    /* eslint-disable dot-notation */

    function addNewStyles (styles) {

        styles = styles || {}

        var prefixedStyles = {}
        for (var selector in styles) {
            prefixedStyles['.ace_content .ace_layer .ace_' + selector] = styles[selector]
        }

        cssInjector(prefixedStyles)
    }


    function addKeywords (rules, words) {

        var index = 0

        for (var i = 0; i < rules.length; i++) {
            if (rules[i].token === 'keyword') {
                index = i
                break
            }
        }

        for (var key in words) {
            var regex = '(' + words[key].join('|') + ')(?![a-zA-Z0-9])'
            rules.splice(index, 0, {
                token: key,
                regex: regex
            })
        }

    }



    function defineMode (params) {

        ace.define('ace/mode/' + params.name, ['require', 'exports'], function (require, exports) {

            var oop                  = require('ace/lib/oop')
            var JavaScriptMode       = require('ace/mode/javascript').Mode

            var MatchingBraceOutdent = require('./matching_brace_outdent').MatchingBraceOutdent
            var CstyleBehaviour      = require('./behaviour/cstyle').CstyleBehaviour
            var CStyleFoldMode       = require('./folding/cstyle').FoldMode

            var JavaScriptHighlightRules = require('ace/mode/javascript_highlight_rules').JavaScriptHighlightRules

            function Mode () {
                this.HighlightRules  = JavaScriptHighlightRules
                this.$highlightRules = new JavaScriptHighlightRules()

                var rules = this.$highlightRules.$rules['no_regex']


                if (params.words) {
                    addKeywords(rules, params.words)
                }

                this.$outdent     = new MatchingBraceOutdent()
                this.$behaviour   = new CstyleBehaviour()
                this.foldingRules = new CStyleFoldMode()
            }


            oop.inherits(Mode, JavaScriptMode)

            Mode.prototype.$id = 'ace/mode/' + params.name

            exports.Mode = Mode
        })

    }


    function createNewMode (params, callback) {
        ace.config.loadModule('ace/mode/javascript', function () {
            if (params.style) {
                addNewStyles(params.style)
            }
            defineMode(params)
            callback()
        })
    }



    function createMode (params) {
        params = params || {}
        params.name = params.name || 'customJS'
        createNewMode(params, function () {
            if (params.editor) {
                var codeSession = params.editor.getSession()
                codeSession.setMode('ace/mode/' + params.name, function () {
                    if (params.callback) {
                        params.callback()
                    }
                })
            } else if (params.callback) {
                params.callback()
            }
        })
    }

    return createMode

})
