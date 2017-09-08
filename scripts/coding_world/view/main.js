define([
    'jquery',
    'toxilibs/event_bus_queued',
    'music_timeline/music_timeline',
    'music_timeline/timeline_bar',
    'music_player/volume_view',
    'perfectScrollbarJQuery'
], function ($, globalEventBus, Timeline, TimelineBar, initVolumeSlider) {

    var eventBus = globalEventBus('view')

    var $view
    var $endScreen
    var $viewApp
    var $world2

    var patterns  = {}
    var timelines = {}

    var timelineBar


    eventBus.on('html ready',  init)
    eventBus.on('monde3',  worldThree)
    eventBus.on('world ready', clearView)
    eventBus.on('new pattern', addPattern)
    eventBus.on('ready to display notes', updateTimelines)
    eventBus.on('code execution requested', clearView)
    eventBus.on('patterns compared', displayEndScreen)

    function init () {
        $view      = $('#view')
        $endScreen = $('#end_screen')
        $viewApp   = $('#viewApp')
        $world2    = $('#world2')
        $('body').addClass('secondBack');
        $('.loader').addClass('invisible')
        $viewApp.empty()
        $viewApp.prepend($world2)
        if (!$('#mp3').hasClass('invisible')) {
            $('#mp3').addClass('invisible')
        }
        initDomEvents()

        timelineBar = new TimelineBar({
            container: $view,
            loopTime: 16 * 60 / 130 * 1000  //TODO: no magic number => (mesuresCount * beatPerMesure) * 60 / tempo * 1000
        })

        initVolumeSlider()

        eventBus.on('pattern beat played', launchTimelineBar)
        eventBus.on('loop stop requested', stopTimelineBar)
    }

    function initDomEvents () {
        $('.logoImg').on('click', function () {
            $('#viewApp').empty()
            window.location.href = '.?monde'
        })
        $('.btnPrevious').click(function () {
            parent.history.back()
            return false
        })
    }

    function worldThree(){
         $('#view').addClass('customHeightTimeline')
         $('#mp3').removeClass('invisible')
    }

    function addPattern (pattern) {
        patterns[pattern.id] = $('<table class="pattern">')

        $view.append(patterns[pattern.id])
    }


    function updateTimelines (notes) {
        for (var i in notes) {
            displayNote(notes[i])
        }
    }


    function displayNote (note) {
        var timeline = timelines[note.soundName() + note.pattern.id]
        if (!timeline) {
            timeline = addTimeline(note.soundName(), note.pattern)
            timelineBar.updateHeight()
            timelineBar.setStartOffset(timeline.view.find('th').outerWidth(true))
        }

        timeline.displayNote({
            beat: note.start,
            class: htmlClass(note)
        })
    }


    function launchTimelineBar () {
        if (!timelineBar.moving) {
            timelineBar.play()
        }
    }


    function stopTimelineBar () {
        timelineBar.stop()
    }


    function addTimeline (sampleName, pattern) {
        var timeline = new Timeline({
            sampleName: sampleName,
            beats: pattern.totalBeats(),
            container: patterns[pattern.id]
        })
        timelines[sampleName + pattern.id] = timeline

        return timeline
    }


    function htmlClass (note) {
        if (note.isCorrect) {
            return 'correct'
        }
        if (note.isSolutionNote) {
            return 'missing'
        }
        return 'wrong'
    }


    function displayEndScreen (codeHasErrors) {     //TODO: Display Win Screen
        if (codeHasErrors) {
            $endScreen.html('')
        } else {
            $endScreen.html('WIN')
        }
    }


    function clearView () {
        patterns  = {}
        timelines = {}
        $view.find('.pattern').remove()
    }

})
