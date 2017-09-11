describe('Pattern', function () {
    var specsHelper = require('./spec_helpers.js')
    var requirejs   = specsHelper.requirejs
    var expect      = require('expect.js')

    var eventBus    = requirejs('toxilibs/event_bus_queued')
    var Pattern     = requirejs('../scripts/world_core/pattern')(eventBus)
    var Instrument  = requirejs('../scripts/world_core/instrument')(eventBus)
    var pattern

    beforeEach(function () {
        pattern = new Pattern()
    })

    describe('Creation', function () {

        it('should create with mesure amount and times per mesure', function () {
            pattern = new Pattern({
                mesuresCount: 9,
                beatsPerMesure: 3
            })

            expect(pattern.mesuresCount).to.be(9)
            expect(pattern.beatsPerMesure).to.be(3)
            expect(pattern.totalBeats()).to.be(9 * 3)
        })

        it('should create with default values', function () {
            expect(pattern.mesuresCount).to.be(4)
            expect(pattern.beatsPerMesure).to.be(4)
        })

        it('should have uniq id', function () {
            var pattern2 = new Pattern()

            expect(pattern.id).to.not.be(pattern2.id)
        })

    })

    describe('Add Sound', function () {

        it('should not add a string', function () {
            pattern.addSound('string', 8)

            expect(pattern.notes[0]).to.not.be.a('string')
        })

        it('should add a sample from instrument', function () {
            var bongo = new Instrument('bongo')
            pattern.addSound(bongo, 8)

            expect(pattern.notes[0].sample.soundName).to.not.be('undefined')
            expect(pattern.notes[0].sample.soundSource).to.not.be('undefined')
        })

        it('should set start time', function () {
            var bongo = new Instrument('bongo')
            pattern.addSound(bongo, 8)

            expect(pattern.notes[0].start).to.be(8)
        })

        it('should give pattern reference', function () {
            var bongo = new Instrument('bongo')
            pattern.addSound(bongo, 8)

            expect(pattern.notes[0].pattern).to.be(pattern)
        })

        it('should add a sound with configuration', function () {
            var bongo = new Instrument('bongo')
            var config = {
                volume: 50
            }
            pattern.addSound(bongo, 8, config)

            expect(pattern.notes[0].volume).to.be(50)
        })

        it('should add sound from sample', function () {
            var instrument = new Instrument()
            instrument.addSample('bongo', 'bongo.mp3')
            pattern.addSound(instrument.bongo, 8)

            expect(pattern.notes[0].sample.soundName).to.not.be('undefined')
            expect(pattern.notes[0].sample.soundSource).to.not.be('undefined')
        })

        it('should add sound from sample of an instrument', function () {
            var instrument = new Instrument()
            instrument.addSample('bongo', 'bongo.mp3')
            pattern.addSound(instrument.bongo, 8)

            expect(pattern.notes[0].sample.soundName).to.not.be('undefined')
            expect(pattern.notes[0].sample.soundSource).to.not.be('undefined')
        })

        it('should not add out of range', function () {
            var instrument = new Instrument('bongo')
            pattern.addSound(instrument, 18)

            expect(pattern.notes.length).to.be(0)
        })

    })

    describe('Remove Sound', function () {

    })

    describe('Play', function () {

        it('should play sounds', function () {
            expect(pattern.play).to.be.a('function')
        })

        it('should retrieve notes at a certain time', function () {
            var instrument = new Instrument('bongo')
            instrument.addSample('drum')
            pattern.addSound(instrument, 1)
            pattern.addSound(instrument, 2)
            pattern.addSound(instrument, 3)
            pattern.addSound(instrument.drum, 3)
            pattern.addSound(instrument.drum, 3)

            expect(pattern.notesAtTime(1)[0].start).to.be(1)
            expect(pattern.notesAtTime(1)[1]).to.be(undefined)
            expect(pattern.notesAtTime(2)[0].start).to.be(2)
            expect(pattern.notesAtTime(3)[0].start).to.be(3)
            expect(pattern.notesAtTime(3)[1].start).to.be(3)
            expect(pattern.notesAtTime(3)[2].start).to.be(3)
            expect(pattern.notesAtTime(4).length).to.be(0)
        })

    })

    describe('Utils', function () {

        it('should return total duration', function () {
            pattern = new Pattern({
                mesuresCount: 9,
                beatsPerMesure: 3
            })

            expect(pattern.duration()).to.be(9 * 3 * pattern.beatDuration)
        })

    })


})
