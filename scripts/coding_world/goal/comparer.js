define([
    'toxilibs/event_bus_queued'
], function (globalEventBus) {

    var solutionEventBus = globalEventBus('solutionWorld')
    var userEventBus     = globalEventBus('userWorld')

    var solutionPatterns = {}
    var userPatterns     = {}

    solutionEventBus.on('new pattern', function (pattern) {
        solutionPatterns[pattern.id] = pattern
    })

    userEventBus.on('new pattern', function (pattern) {
        userPatterns[pattern.id] = pattern
    })

    userEventBus.on('code executed', comparePatterns)


    function comparePatterns () {
        var errors = 0
        var notesToDisplay = []
        for (var i in solutionPatterns) {
            var solution = solutionPatterns[i]
            var user     = userPatterns[i]
            errors += browseSolutionNotesInUserPattern(solution, user, notesToDisplay)
            errors += browseUserNotesInSolutionPattern(user, notesToDisplay)
        }

        userEventBus.emit('ready to display notes', notesToDisplay)
        userEventBus.emit('patterns compared', errors)
    }


    function browseSolutionNotesInUserPattern (solution, user, processedNotes) {
        var wrongNotesCount = 0
        for (var i = 0; i < solution.notes.length; i++) {
            var solutionNote = solution.notes[i]
            var userNote     = mirrorNoteInPattern(solutionNote, user)

            if (userNote) {
                userNote.isCorrect = true
                processedNotes.push(userNote)
            } else {
                wrongNotesCount++
                solutionNote.isSolutionNote = true
                processedNotes.push(solutionNote)
            }
        }
        return wrongNotesCount
    }


    function browseUserNotesInSolutionPattern (user, processedNotes) {
        var wrongNotesCount = 0
        for (var i = 0; i < user.notes.length; i++) {
            var userNote = user.notes[i]
            if (!userNote.isCorrect) {
                wrongNotesCount++
                processedNotes.push(userNote)
            }
        }
        return wrongNotesCount
    }


    function mirrorNoteInPattern (note, otherPattern) {
        var otherNotes = otherPattern.notes
        for (var i = 0; i < otherNotes.length; i++) {
            var otherNote = otherNotes[i]
            if (otherNote.isSimilarTo(note)) {
                return otherNote
            }
        }
        return false
    }

})
