/*eslint-disable  no-implicit-globals */

// launch with node build.js
var requirejs = require('requirejs')


var config = {
    baseUrl:  'public/scripts',
    name:     'main',
    optimize: 'uglify',
    out:      'public/scripts/main-built.js'
}

config.mainConfigFile = config.baseUrl + '/' + config.name + '.js'


requirejs.optimize(config)
