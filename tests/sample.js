describe('Sample', function () {
    var specsHelper = require('./spec_helpers.js')
    var requirejs   = specsHelper.requirejs
    var expect      = require('expect.js')

    var eventBus    = requirejs('toxilibs/event_bus_queued')
    var Sample      = requirejs('../scripts/world_core/sample')
    var sample

    beforeEach(function () {
        sample = new Sample({
            soundName:   'bongo',
            soundSource: 'bongo.mp3',
            eventBus:    eventBus
        })
    })


    describe('Construction', function () {

        it('should take sound parameter', function () {
            expect(sample.soundName).to.be('bongo')
        })

    })

    describe('Play', function () {

        it('should play sound', function () {
            expect(sample.play).to.be.a('function')
        })

        it('should take parameters', function () {

        })

    })


})
