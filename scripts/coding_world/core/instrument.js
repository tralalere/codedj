define([
    './sample'
], function (Sample) {

    var methodsProxies    = ['play']
    var propertiesProxies = ['soundName', 'sound']


    function createInstrumentConstructor (eventBus) {


        function Instrument (sampleName, params) {
            this.samples = {}
            if (sampleName) {
                this.addSample(sampleName)
                this.mainSample = this[sampleName]
                proxifySampleProperties(this)
                proxifySampleMethods(this)
            }
            params = params || {}
            this.volume = (typeof params.volume === 'undefined') ? 1 : params.volume
        }


        Instrument.prototype.addSample = function (sampleName, soundSource) {
            var sample = new Sample({
                instrument:  this,
                soundName:   sampleName,
                soundSource: soundSource,
                eventBus:    eventBus
            })
            this.samples[sampleName] = sample
            this[sampleName]         = sample
        }


        function proxifySampleMethods (instrument) {
            for (var i = 0; i < methodsProxies.length; i++) {
                var methodName = methodsProxies[i]
                instrument[methodName] = function () {   //eslint-disable-line no-loop-func
                    instrument.mainSample[methodName].apply(instrument.mainSample, arguments)
                }
            }
        }


        function proxifySampleProperties (instrument) {
            for (var i = 0; i < propertiesProxies.length; i++) {
                var propertyName = propertiesProxies[i]
                instrument[propertyName] = instrument.mainSample[propertyName]
            }
        }


        return Instrument

    }



    return createInstrumentConstructor

})
