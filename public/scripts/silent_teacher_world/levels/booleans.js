define([
    'toxilibs/random',
    'level',
    './variables'
], function (random, Level, variables) {
    'use strict'

    var level = new Level({
        name: 'booleans',
        dependencies: [variables]
    })

    //N6
    level.instrumentName = 'booleans'
    level.samplePack = 'E'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 30)
            var b = Math.random() < 0.5 ? a : random.int(1, 30)
            q.addJSCode(a + ' === ' + b + ';')
        },
        timeoutTime: 10000,
        errorExpected: true,
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 30)
            var b = Math.random() < 0.5 ? a : random.int(1, 30)
            q.addJSCode(a + ' !== ' + b + ';')
        },
        timeoutTime: 10000,
        errorExpected: true,
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 30)
            var b = random.int(1, 30)
            if (b === a) {
                b += 2
            }
            q.addJSCode(a + ' < ' + b + ';')
        },
        timeoutTime: 13000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 30)
            var b = Math.random() < 0.5 ? a : random.int(1, 30)
            q.addJSCode('var a = ' + a + ';\na ' + (Math.random() < 0.5 ? '!' : '=') + '== ' + b + ';')
        },
        times: 2,
        timeoutTime: 12000
    })


    return level

})
