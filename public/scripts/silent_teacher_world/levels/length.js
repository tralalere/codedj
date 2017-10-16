define([
    'toxilibs/random',
    'level',
    './variables'
], function (random, Level, variables) {
    'use strict'

    var level = new Level({
        name: 'length',
        dependencies: [variables]
    })

    //N10
    level.instrumentName = 'length'
    level.samplePack = 'G'


    var randomLetter  = random.unmistakableLetter
    var randomLetters = random.unmistakableLetters


    level.addQuestion({
        generator: function (q) {
            var a = randomLetters(random.int(2, 8))
            q.addJSCode("var a = '" + a + "';\na.length;")
        },
        timeoutTime: 10000,
        errorExpected: true,
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            var a = []
            for (var i = 0; i < random.int(3, 8); i++) {
                a.push(Math.random() < 0.5 ? random.int(1, 10) : "'" + randomLetter() + "'")
            }
            q.addJSCode('var a = [' + a.join(', ') + '];\na.length;')
        },
        errorExpected: true,
        timeoutTime: 12000,
        times: 2
    })


    return level

})
