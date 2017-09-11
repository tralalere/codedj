describe('Tune', function () {
    var specsHelper = require('./spec_helpers.js')
    var requirejs   = specsHelper.requirejs
    var expect      = require('expect.js')

    var eventBus    = requirejs('toxilibs/event_bus_queued')
    var Tune        = requirejs('../scripts/world_core/tune')(eventBus)
    var Pattern     = requirejs('../scripts/world_core/pattern')(eventBus)

    var tune

    beforeEach(function () {
        tune = new Tune()
    })

    describe('Creation', function () {

        it('should add patterns property', function () {
            expect(tune.patterns).to.be.a('object')
        })

        it('should have a play function', function () {
            expect(tune.play).to.be.a('function')
        })

    })

    describe('Add Patterns', function () {

        it('should fill patterns property', function () {
            var pattern = new Pattern()
            tune.add(pattern)

            expect(tune.patterns.length).to.be(1)
        })

        it('should add several patterns', function () {
            var patternA = new Pattern()
            var patternB = new Pattern()
            tune.add(patternA, patternB)

            expect(tune.patterns.length).to.be(2)
        })

        it('should keep patterns order', function () {
            var patternA = new Pattern({
                beatsPerMesure: 8
            })
            var patternB = new Pattern({
                beatsPerMesure: 3
            })
            tune.add(patternA, patternB)

            expect(tune.patterns[0].beatsPerMesure).to.be(8)
            expect(tune.patterns[1].beatsPerMesure).to.be(3)
        })

        it('should add the same pattern several time and keep order', function () {
            var patternA = new Pattern({
                beatsPerMesure: 8
            })
            var patternB = new Pattern({
                beatsPerMesure: 3
            })
            tune.add(patternA, patternB, patternA, patternB)

            expect(tune.patterns[0].beatsPerMesure).to.be(8)
            expect(tune.patterns[1].beatsPerMesure).to.be(3)
            expect(tune.patterns[2].beatsPerMesure).to.be(8)
            expect(tune.patterns[3].beatsPerMesure).to.be(3)
        })

    })

})
