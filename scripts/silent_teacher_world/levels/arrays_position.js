define([
    'toxilibs/random',
    'level',
    './variables',
    './length'
], function (random, Level, variables, lengthLevel) {
    'use strict'

    var level = new Level({
        name: 'arrays_position',
        dependencies: [variables, lengthLevel]
    })

    //N11
    level.instrumentName = 'arrays_position'
    level.samplePack = 'G'


    var randomLetter  = random.unmistakableLetter



    level.addQuestion({
        generator: function (q) {
            var a = []
            for (var i = 0; i < random.int(3, 8); i++) {
                a.push(Math.random() < 0.5 ? random.int(1, 10) : "'" + randomLetter() + "'")
            }
            q.addJSCode('var a = [' + a.join(', ') + '];\na[0];')
        },
        timeoutTime: 15000,
        errorExpected: true,
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            var a = []
            for (var i = 0; i < random.int(3, 8); i++) {
                a.push(Math.random() < 0.5 ? random.int(1, 10) : "'" + randomLetter() + "'")
            }
            var b = random.int(1, a.length - 1)
            q.addJSCode('var a = [' + a.join(', ') + '];\na[' + b + '];')
        },
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            var a = []
            var l = random.int(4, 7)
            for (var i = 0; a.length < l; i++) {
                var letter = randomLetter()
                if (a.indexOf(letter) === -1) {
                    a.push(letter)
                }
            }
            var b = random.int(0, a.length - 1)
            q.addJSCode("var a = ['" + a.join("', '") + "'];\na.indexOf('" + a[b] + "');")
        },
        timeoutTime: 15000,
        errorExpected: true
    })


    return level

})
