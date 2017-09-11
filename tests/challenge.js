describe('Challenge', function () {
    var specsHelper = require('./spec_helpers.js')
    var requirejs   = specsHelper.requirejs
    var expect      = require('expect.js')

    var Challenge   = requirejs('../scripts/challenge')

    var challengeCode = {
        init: [
            'var pattern = new Pattern()',
            'var bass    = new Instrument()',
            'bass.addSample(\'A\', \'bass_1.ogg\')',
            'bass.addSample(\'B\', \'bass_2.ogg\')'
        ],
        portions: [
            {
                solution: [
                    'pattern.addSound(bass.A, 1)',
                    'pattern.addSound(bass.A, 12)'
                ],
                base: [
                    'pattern.addSound(bass.A, 1)',
                    'pattern.addSound(bass.A, 10)'
                ]
            },
            {
                solution: [
                    'pattern.addSound(bass.B, 4)',
                    'pattern.addSound(bass.B, 5)'
                ],
                base: [
                    'pattern.addSound(bass.B, 2)',
                    'pattern.addSound(bass.B, 5)'
                ]
            }
        ],
        end: [
            'pattern.play()'
        ]
    }

    var challenge


    beforeEach(function () {
        challenge = new Challenge(challengeCode)
    })


    describe('Creation', function () {

        it('should create fields', function () {
            expect(challenge.solution).to.be.ok()
            expect(challenge.base).to.be.ok()
        })

        it('should create start, exposed and end fields', function () {
            expect(challenge.solution.start.join('\n')).to.be(challengeCode.init.join('\n'))
            expect(challenge.solution.exposed).to.be(challengeCode.portions[0].solution)
            expect(challenge.solution.end.join('\n')).to.be(challengeCode.portions[1].solution.concat(challengeCode.end).join('\n'))

            expect(challenge.base.start.join('\n')).to.be(challengeCode.init.join('\n'))
            expect(challenge.base.exposed).to.be(challengeCode.portions[0].base)
            expect(challenge.base.end.join('\n')).to.be(challengeCode.portions[1].solution.concat(challengeCode.end).join('\n'))
        })

    })


    describe('Solution', function () {

        it('should compute the complete solution', function () {
            var solution = challengeCode.init.concat(challengeCode.portions[0].solution, challengeCode.portions[1].solution.concat(challengeCode.end)).join('\n')
            expect(challenge.solution.start.concat(challenge.solution.exposed, challenge.solution.end).join('\n')).to.be(solution)
        })

    })


    describe('Questions', function () {

        it('should change question', function () {
            challenge.nextQuestion()
            expect(challenge.solution.exposed.join('\n')).to.be(challengeCode.portions[1].solution.join('\n'))
            expect(challenge.base.exposed.join('\n')).to.be(challengeCode.portions[1].base.join('\n'))
        })

        it('should return to the first question', function () {
            challenge.nextQuestion()
            challenge.nextQuestion()
            expect(challenge.solution.exposed.join('\n')).to.be(challengeCode.portions[0].solution.join('\n'))
            expect(challenge.base.exposed.join('\n')).to.be(challengeCode.portions[0].base.join('\n'))
        })

    })



})
