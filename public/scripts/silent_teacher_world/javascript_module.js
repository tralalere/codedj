define([
    'jquery',
    'core/question_generator_helper'
], function ($, QuestionGeneratorHelper) {


    function setSyntaxHighlighter () {
        SyntaxHighlighter.defaults.gutter      = false
        SyntaxHighlighter.defaults.toolbar     = false
        SyntaxHighlighter.defaults['tab-size'] = 4
    }


    setSyntaxHighlighter()



    QuestionGeneratorHelper.prototype.addJSCode = function (source) {
        if (typeof this.answer === 'undefined') {
            this.answer = eval(source) //eslint-disable-line no-eval
        }

        var sourceElement = $('<pre class="brush: js">' + source + '</pre>')
        this.container.append(sourceElement)

        this.todoOnDisplay.push(function () {
            SyntaxHighlighter.highlight({}, sourceElement[0]) //FIXME move
        })
    }



})