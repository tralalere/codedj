describe('Instrument', function () {
    var specsHelper = require('./spec_helpers.js')
    var requirejs   = specsHelper.requirejs
    var expect      = require('expect.js')

    var Note        = requirejs('../scripts/world_core/note')

    describe('Creation', function () {

        it('should get parameters', function () {
            var params = {
                sample: 'sample',
                pattern: 'pattern',
                start: 'start',
                volume: 'volume',
                duration: 'duration',
                transpose: 'transpose'
            }
            var note = new Note(params)

            expect(note.sample).to.be('sample')
            expect(note.pattern).to.be('pattern')
            expect(note.start).to.be('start')
            expect(note.volume).to.be('volume')
            expect(note.duration).to.be('duration')
            expect(note.transpose).to.be('transpose')
        })

        it('should have some default parameters', function () {
            var note = new Note()

            expect(note.duration).to.not.be(null)
            expect(note.transpose).to.not.be(null)
        })

    })

    describe('Play', function () {

        it('should play a sound', function () {
            var note = new Note()

            expect(note.play).to.be.a('function')
        })

    })

})
