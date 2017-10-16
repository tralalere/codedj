define([
    'jquery',
    'toxilibs/event_bus_queued',
    'globals',
    'core/levels_navigator',
    'music_timeline/music_timeline',
    'music_timeline/timeline_bar',
    'toxilibs/sound',
    'music_player/volume_view'
], function ($, eventBus, globals, levelsNavigator, Timeline, TimelineBar, Sound, initVolumeSlider) {

    var $challengesContainer
    var currentTimeline
    var $currentInstrumentLine
    var $wrapChallengeTimeline

    /*
        Todo: modif integration css => add var
    */
    var $challengesTimeline

    var timelineBar
    /*
     Todo: modif integration css => init
     */
    function init () {
        initHtml()
        if(!countLevel().current){
            $('.jauge .current').empty().html(0);
        } else{
            $('.jauge .current').empty().html(countLevel().current);
        }

        $('.jauge .total').empty().html(countLevel().total);

        eventBus.on('level won', levelWon)
        eventBus.on('sample pack changed', clearTimelines)
        eventBus.on('sample added to loop', updateTimeline)

        eventBus.on('challenge view ready', function ($blocChallenge) {
            initVolumeSlider()
            $wrapChallengeTimeline.append($blocChallenge)
            $blocChallenge.find('input').focus()

            $('#btnGoMenu').on('click',function () {
                eventBus.emit('world select');
            })
        })

        $('.btnWorldWin #btnGoMenu').on('click',function () {
            window.location.href = '.?monde=select'
        })
    }


    /*
     Todo: modif integration css => initHtml
     */
    function initHtml () {
        $challengesContainer = $('#challenges_container')
        $challengesTimeline = $('#blocTimeline')
        $wrapChallengeTimeline = $('.wrapChallengeTimeline')

        initTimelineBar()
    }

    /*
     Todo: modif integration css => levelWon
     */
    function levelWon () {
        var widthBar = $('.progress-bar-Level .progress-bar ').width();
        //$('#challengeAfterAnswer').prepend('<div class="levelWin row" style="padding: 1em 0">Niveau gagné !</div>') //FIXME
        var progress = progressionPercent();
        $('.jauge .current').empty().html(countLevel().current);
        $('.jauge .total').empty().html(countLevel().total);
        if(progress !==0 && progress <= 100){
            $('.progress-bar-Level .progress-bar').css('width',progress+'%');
            $('.levelWon').fadeIn(function () {
                $('.levelWon').delay(3000).fadeOut()
            });
            /*$('.missionCompleted').fadeOut(function () {
                $('.levelWon').fadeIn(function () {
                    $('.levelWon').delay(3000).fadeOut()
                    $('.missionCompleted').delay(3200).fadeIn()
                });
            });*/

            eventBus.emit('start sparkle');
            setTimeout(function(){
                eventBus.emit('stop sparkle');
            },3000)
        }



    }


    function initTimelineBar () {
        timelineBar = new TimelineBar({
            container: $challengesTimeline.find('.timeline-container'),
            loopTime: 32 * 60 / 130 * 1000  //TODO: no magic number => mesureNumber * 60 / tempo * 1000
        })
    }


    function updateTimeline (sample) {
        clearTimelines()
        var timeline = new Timeline({
            sampleName: sample.instrument,
            beats: 32,
            container: $challengesTimeline.find('.timeline-container').find('table')
        })

        for (var i in sample.notes) {
            var note = sample.notes[i]
            timeline.displayNote({
                beat: note.timeStart + 1,
                class: 'correct'
            })
        }

        Sound.onAllSoundsLoaded(function () {
            timelineBar.setStartOffset(timeline.view.find('th').outerWidth(true))
            timelineBar.updateHeight()
            launchTimelineBar()
        })
    }


    function launchTimelineBar () {
        if (!timelineBar.moving) {
            timelineBar.play()
        }
    }


    function clearTimelines () {
        $challengesTimeline.find('tr').remove()
    }


    function progressionPercent () {
        var currentLevelIndex = levelsNavigator.getLevelIndex(globals.levelID)
        var lastLevelIndex    = levelsNavigator.getLevelIndex(levelsNavigator.lastLevelID)
        return Math.round(currentLevelIndex * 100 / lastLevelIndex);
    }
    function countLevel () {
        var currentLevelIndex = levelsNavigator.getLevelIndex(globals.levelID)
        var lastLevelIndex    = levelsNavigator.getLevelIndex(levelsNavigator.lastLevelID)
        return {
            current:currentLevelIndex,
            total:lastLevelIndex
        }
    }


    return init

})
