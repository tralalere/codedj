define(['core/question'], function (Question) {
    'use strict'

    function Level (params) {
        this.id           = params.name
        this.name         = params.name
        this.dependencies = params.dependencies
        this.questions    = []
    }

    Level.prototype.addQuestion = function (params) {
        this.questions.push(new Question(params))
    }

    return Level

})
