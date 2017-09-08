define([
    'toxilibs/random',
    'level',
    './basic_maths',
    './variables',
    './booleans',
    './conditions'
], function (random, Level, basicMaths, variables, booleans, conditions) {
    'use strict'

    var level = new Level({
        name: 'conditions2',
        dependencies: [basicMaths, variables, booleans, conditions]
    })

    //N9
    level.instrumentName = 'conditions2'
    level.samplePack = 'F'


    level.addQuestion({
        generator: function (q) {
            var condition1 = random.int(1, 8)
            var condition2 = random.int(4, 16)
            var condition3 = random.int(1, 10)
            var condition4 = random.int(1, 10)
            if (condition1 === condition2) {
                condition1 += 2
            }
            if (condition3 === condition4) {
                condition3 += 2
            }
            var a = random.int(1, 6)
            var b = random.int(1, 6)
            var c = random.int(1, 6)
            var d = random.int(1, 5)
            if (b === a) {
                b += 2
            }
            if (a === c) {
                c += 2
            }
            if (b === c) {
                c += 1
            }
            q.addJSCode('if (' + condition1 + ' < ' + condition2 + ') {\n\tvar a = ' + a + ';\n} else if (' + condition3 + ' < ' + condition4 + ') {\n\tvar a = ' + b + ';\n} else {\n\tvar a = ' + c + ';\n}\na + ' + d + ';')
        },
        times: 4
    })

    return level

})
