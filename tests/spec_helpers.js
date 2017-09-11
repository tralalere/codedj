/* eslint-disable block-scoped-var, no-implicit-globals */
var helpers = {}


var requirejs = require('requirejs')
var requirejsConfig = require('./requirejs_config')
requirejsConfig.nodeRequire = require
requirejs.config(requirejsConfig)


helpers.requirejs = requirejs


module.exports = helpers
