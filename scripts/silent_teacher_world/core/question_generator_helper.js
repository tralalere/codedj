define([
    'jquery'
], function ($) {
    'use strict'



    function QuestionGeneratorHelper () {
        this.container = $('<div class="challenge_question">')
        this.todoOnDisplay = []
    }


    QuestionGeneratorHelper.textFilters = []


    QuestionGeneratorHelper.prototype.addText = function (string) {
        this.container.append('<pre class="text">' + applyTextFilters(string) + '</pre>')
    }


    QuestionGeneratorHelper.prototype.display = function () {
        for (var i = 0; i < this.todoOnDisplay.length; i++) {
            this.todoOnDisplay[i]()
        }
    }



    function applyTextFilters (string) {
        for (var i = 0; i < QuestionGeneratorHelper.textFilters.length; i++) {
            string = QuestionGeneratorHelper.textFilters[i](string)
        }
        return string
    }


    return QuestionGeneratorHelper

})
