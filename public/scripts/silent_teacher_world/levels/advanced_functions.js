define([
    'toxilibs/random',
    'level',
    './basic_maths',
    './variables',
    './functions',
    './booleans',
    './conditions'
], function (random, Level, basicMaths, variables, functions, booleans, conditions) {
    'use strict'

    var level = new Level({
        name: 'advanced_functions',
        dependencies: [basicMaths, variables, functions, booleans, conditions]
    })

    //N12
    level.instrumentName = 'advanced_functions'
    level.samplePack = 'G'


    level.addQuestion({
        generator: function (q) {
            var a = random.int(0, 6)
            var b = random.int(0, 6)
            if (b === a) {
                b += 2
            }
            q.addJSCode('function hi (a, b) {\n\treturn a * b;\n}\n\nhi(' + a + ', ' + b + ');')
        }
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 5)
            var b = random.int(2, 4)
            q.addJSCode('function hi (a, b) {\n\tif (a < b) {\n\t\treturn a + b;\n\t} else {\n\t\treturn a * b;\n\t}\n}\n\nhi(' + a + ', ' + b + ');')
        },
        times: 2
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 5)
            var b = random.int(1, 5)
            var c = random.int(1, 3)
            var d = random.int(2, 4)
            q.addJSCode('function hi (a, b) {\n\treturn a * b;\n}\n\nfunction hello (a, b) {\n\treturn a + b;\n}\n\nhi(' + c + ', ' + d + ') + hello(' + a + ', ' + b + ');')
        },
        timeoutTime: 70000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 4)
            var b = random.int(2, 4)
            var c = random.int(1, 5)
            q.addJSCode('function hi (a, b) {\n\treturn a * b;\n}\n\nfunction hello (a, b) {\n\treturn a + b;\n}\n\nvar a = hi(' + a + ', ' + b + ');\nhello(a, ' + c + ');')
        },
        timeoutTime: 70000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 4)
            var b = random.int(2, 4)
            var c = random.int(1, 5)
            q.addJSCode('function hi (a, b) {\n\treturn a * b;\n}\n\nfunction hello (a, b) {\n\treturn a + b;\n}\n\nhello(hi(' + a + ', ' + b + '), ' + c + ');')
        },
        timeoutTime: 70000
    })


    level.addQuestion({
        generator: function (q) {
            var a = random.int(1, 5)
            var b = random.int(2, 4)
            var c = random.int(1, 2)
            q.addJSCode('function hi (a, b) {\n\treturn a * b;\n}\n\nfunction hello (a, b) {\n\treturn hi(a, b + ' + c + ');\n}\n\nhello(' + a + ', ' + b + ');')
        },
        timeoutTime: 90000
    })


    return level

})
