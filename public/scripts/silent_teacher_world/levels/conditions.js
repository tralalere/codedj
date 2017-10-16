define([
    'toxilibs/random',
    'level',
    './basic_maths',
    './variables',
    './booleans',
    './test_or_affectation'
], function (random, Level, basicMaths, variables, booleans, testOrAffectation) {
    'use strict'

    var level = new Level({
        name: 'conditions',
        dependencies: [basicMaths, variables, booleans, testOrAffectation]
    })

    //N8
    level.instrumentName = 'conditions'
    level.samplePack = 'D'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 5)
            var b = random.int(0, 5)
            var c = random.int(1, 4)
            var d = random.int(1, 4)
            var e = d + random.int(1, 4)

            if (b === a) {
                b += 2
            }
            q.addJSCode('var a = ' + a + ';\nif (' + d + ' < ' + e + ') {\n\ta = ' + b + ';\n}\na + ' + c + ';')
        }
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 5)
            var b = random.int(0, 5)
            var c = random.int(1, 4)
            var d = random.int(1, 4)
            var e = d + random.int(1, 4)

            if (b === a) {
                b += 2
            }
            q.addJSCode('var a = ' + a + ';\nif (' + e + ' < ' + d + ') {\n\ta = ' + b + ';\n}\na + ' + c + ';')
        }
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 5)
            var b = random.int(0, 5)
            var c = random.int(1, 4)
            var d = random.int(1, 4)
            var e = d + random.int(1, 4)
            if (b === a) {
                b += 2
            }
            q.addJSCode('if (' + d + ' < ' + e + ') {\n\tvar a = ' + a + ';\n} else {\n\tvar a = ' + b + ';\n}\na + ' + c + ';')
        }
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 6)
            var b = random.int(0, 6)
            var c = random.int(1, 4)
            var d = random.int(1, 4)
            var e = d + random.int(1, 4)
            if (b === a) {
                b += 2
            }
            q.addJSCode('if (' + e + ' < ' + d + ') {\n\tvar a = ' + a + ';\n} else {\n\tvar a = ' + b + ';\n}\na + ' + c + ';')
        }
    })


    level.addQuestion({
        generator: function (q) {
            var condition1 = random.int(1, 10)
            var condition2
            if (Math.random() < 0.5) {
                condition2 = condition1
            } else {
                condition2 = random.int(1, 10)
            }
            var a = random.int(1, 5)
            var b = random.int(1, 5)
            var c = random.int(1, 4)
            if (b === a) {
                b += 2
            }
            q.addJSCode('if (' + condition1 + ' === ' + condition2 + ') {\n\tvar a = ' + a + ';\n} else {\n\tvar a = ' + b + ';\n}\na + ' + c + ';')
        }
    })


    return level

})
