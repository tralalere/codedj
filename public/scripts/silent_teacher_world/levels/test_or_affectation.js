define([
    'toxilibs/random',
    'level',
    './basic_maths',
    './variables',
    './booleans'
], function (random, Level, basicMaths, variables, booleans) {
    'use strict'

    var level = new Level({
        name: 'test_or_affectation',
        dependencies: [basicMaths, variables, booleans]
    })

    //N7
    level.instrumentName = 'test_or_affectation'
    level.samplePack = 'D'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 5)
            var b = random.int(0, 5)
            var c = random.int(1, 3)
            if (b === a) {
                b += 2
            }
            q.addJSCode('var a = ' + a + ';\na = ' + b + ';\na + ' + c + ';')
        }
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 7)
            var b = random.int(1, 20)
            var c = random.int(1, 3)
            q.addJSCode('var a = ' + a + ';\na === ' + b + ';\na + ' + c + ';')
        },
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 6)
            var b = random.int(0, 6)
            var c = random.int(1, 3)
            if (b === a) {
                b += 2
            }
            q.addJSCode('var a = ' + a + ';\na = ' + b + ';\na + ' + c + ';')
        },
        times: 2
    })


    return level

})
