define([
    'toxilibs/random',
    'level',
    './functions'
], function (random, Level, functions) {
    'use strict'

    var level = new Level({
        name: 'functions2',
        dependencies: [functions]
    })

    //N5
    level.instrumentName = 'functions2'
    level.samplePack = 'D'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(2, 6)
            q.addJSCode('function maFonction (a) {\n\treturn a * a;\n}\n\nmaFonction(' + a + ');')
        },
        timeoutTime: 18000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 24)
            q.addJSCode('function toto (a) {\n\treturn a;\n}\n\ntoto(' + a + ');')
        },
        timeoutTime: 13000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 5)
            var b = random.int(0, 5)
            if (b === a) {
                b += 2
            }
            q.addJSCode('function foo () {\n\treturn ' + a + ';\n}\n\nfoo() + ' + b + ';')
        },
        timeoutTime: 15000
    })


    return level

})
