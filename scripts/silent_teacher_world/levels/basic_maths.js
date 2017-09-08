define([
    'toxilibs/random',
    'level'
], function (random, Level) {
    'use strict'

    var level = new Level({
        name: 'basic_maths'
    })

    // N1
    level.instrumentName = 'BasicMaths'
    level.samplePack = 'A'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 6)
            var b = random.int(1, 6)
            q.addJSCode(a + ' + ' + b + ';')
        },
        timeoutTime: 10000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 5)
            var b = random.int(2, 5)
            q.addJSCode(a + ' * ' + b + ';')
        },
        timeoutTime: 8000
    })


    return level

})
