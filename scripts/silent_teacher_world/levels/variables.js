define([
    'toxilibs/random',
    'level',
    './basic_maths'
], function (random, Level, basicMaths) {
    'use strict'

    var level = new Level({
        name: 'variables',
        dependencies: [basicMaths]
    })

    //N2
    level.instrumentName = 'variables'
    level.samplePack = 'B'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 6)
            q.addJSCode('var a = ' + a + ';\na')
        },
        timeoutTime: 10000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 6)
            var b = random.int(1, 6)
            if (b === a) {
                b += 2
            }
            q.addJSCode('var a = ' + a + ';\na + ' + b + ';')
        },
        timeoutTime: 10000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 6)
            var b = random.int(1, 6)
            if (b === a) {
                b += 2
            }
            q.addJSCode('var a = ' + a + ';\nvar b = ' + b + ';\na + b;')
        },
        timeoutTime: 10000
    })


    return level

})
