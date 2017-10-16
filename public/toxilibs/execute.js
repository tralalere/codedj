/*eslint-disable no-use-before-define */
if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}
/*eslint-enable no-use-before-define */



define(function () {

    var scopeIdentifier = '__scope__'


    function execute (params) {
        var compiled = compile({
            source: params.source,
            scope:  params.scope,
            alias:  params.alias || {}
        })

        return compiled.call(params.thisValue, params.scope)

    }


    function compile (params) {
        return Function(scopeIdentifier, variablesDefinitionSource(params.scope, params.alias) + params.source)
    }



    /**
     * example of alias param:
     *  {
     *     a: ['aa', 'aaa'],
     *     b: 'bb'
     *  }
     * Result string would be:
     * var a   = __scope__.a
     * var aa  = __scope__.a
     * var aaa = __scope__.a
     * var b   = __scope__.b
     * var bb  = __scope__.b
     */
    function variablesDefinitionSource (scope, alias) {
        scope = scope || {}
        var variablesDefinitions = ''

        for (var varName in scope) {
            var namesForThisVar = [varName].concat(alias[varName])
            for (var i = 0; i < namesForThisVar.length; i++) {
                variablesDefinitions += 'var ' + namesForThisVar[i] + ' = ' + scopeIdentifier + '.' + varName + '\n'
            }
        }

        return variablesDefinitions
    }


    return execute

})
