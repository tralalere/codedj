define([
    'toxilibs/random',
    'level',
    './basic_maths',
    './variables'
], function (random, Level, basicMaths, variables) {
    'use strict'

    var level = new Level({
        name: 'overriding_vars',
        dependencies: [basicMaths, variables]
    })

    //N3
    level.instrumentName = 'overriding_vars'
    level.samplePack = 'B'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 5)
            var b = random.int(0, 6)
            var c = random.int(0, 4)
            if (b === a) {
                b += 2
            }
            q.addJSCode('var a = ' + a + ';\na = ' + b + ';\na + ' + c + ';')
        }
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 5)
            var b = random.int(1, 4)
            var c = random.int(0, 4)
            q.addJSCode('var a = ' + a + ';\na = a + ' + b + ';\na + ' + c + ';')
        }
    })


    return level

})
