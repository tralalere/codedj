describe('Instrument', function () {
    var specsHelper = require('./spec_helpers.js')
    var requirejs   = specsHelper.requirejs
    var expect      = require('expect.js')

    var eventBus    = requirejs('toxilibs/event_bus_queued')
    var Instrument  = requirejs('../scripts/world_core/instrument')(eventBus)

    describe('Creation', function () {

        it('should init with sample', function () {
            var instrument = new Instrument('bongo')

            expect(instrument.bongo.soundName).to.not.be('undefined')
            expect(instrument.bongo.soundSource).to.not.be('undefined')
            expect(instrument.bongo.instrument).to.be(instrument)
        })

    })

    describe('Configuration', function () {

        it('should configure volume', function () {
            var instrument = new Instrument('bongo')
            instrument.volume = 25

            expect(instrument.bongo.volume()).to.be(25)
        })

    })

    describe('Samples', function () {

        it('should works as sample', function () {
            var instrument = new Instrument('bongo')

            expect(instrument.soundName).to.be('bongo')
        })

        it('should add samples', function () {
            var instrument = new Instrument()
            instrument.addSample('bongo', 'bongo.mp3')
            instrument.addSample('drum', 'drum.mp3')

            expect(instrument.bongo.soundName).to.not.be('undefined')
            expect(instrument.bongo.soundSource).to.not.be('undefined')
            expect(instrument.drum.soundName).to.not.be('undefined')
            expect(instrument.drum.soundSource).to.not.be('undefined')
        })

        it('should proxify sample', function () {
            var instrument = new Instrument()
            instrument.addSample('bongo', 'bongo.mp3')

            expect(instrument.bongo).to.be(instrument.samples.bongo)
        })

    })


})
