define([
    'toxilibs/random',
    'level',
    './basic_maths',
    './variables'
], function (random, Level, basicMaths, variables) {
    'use strict'

    var level = new Level({
        name: 'functions',
        dependencies: [basicMaths, variables]
    })

    //N4
    level.instrumentName = 'functions'
    level.samplePack = 'C'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 6)
            var b = random.int(0, 6)
            if (b === a) {
                b += 2
            }
            q.addJSCode('function hello (a, b) {\n\treturn a + b;\n}\n\nhello(' + a + ', ' + b + ');')
        },
        timeoutTime: 15000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 4)
            var b = random.int(2, 4)
            if (b === a) {
                b += 1
            }
            q.addJSCode('function hi (a, b) {\n\treturn a * b;\n}\n\nhi(' + a + ', ' + b + ');')
        },
        timeoutTime: 13000
    })


    return level

})
