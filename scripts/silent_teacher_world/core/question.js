define(['core/question_generator_helper'], function (QuestionGeneratorHelper) {
    'use strict'


    function Question (params) {
        this.generator     = params.generator
        this.timeoutTime   = params.timeoutTime
        this.errorExpected = params.errorExpected
        this.times         = params.times
    }


    Question.prototype.generate = function () {
        var q = new QuestionGeneratorHelper()
        this.generator(q)
        return q
    }

    return Question

})
