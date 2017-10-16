define([
    'core/levels_navigator',
    'toxilibs/event_bus_queued',
    'globals',
    './sample_packs'
], function (levelsNavigator, globalEventBus, globals, samplePacks) {

    var currentPackIndex
    var playingSamples = []

    var lastLoopTime
    var loopDuration = 32 * 60 / 130 * 1000    //TODO use Sound.duration
    var fadeDuration = 0


    globalEventBus.on('user ready to start', onLevelLaunched)
    globalEventBus.on('challenge answer given', onUserGiveAnswer)
    globalEventBus.on('music loop completed', onLoopComplete)


    function onLevelLaunched () {
        var level = levelsNavigator.levelForID(globals.levelID)
        if (globals.levelID === levelsNavigator.startLevelID) {
            changeSamplePack(level)
            loadPackSamples(samplePacks[currentPackIndex], function () {
                lastLoopTime = Date.now()
            })
            launchNextSamples()
        } else if (level.samplePack !== currentPackIndex) {
            globalEventBus.emit('fade sound requested', {
                fadeOut:  true,
                callback: function () {
                    changeSamplePack(level)
                    launchNextSamples()
                    globalEventBus.emit('fade sound requested', {
                        initialVolume: 0
                    })
                }
            })
        }
        loadNextLevelSamples()
    }


    function changeSamplePack (level) {
        stopPlayingLoops()
        currentPackIndex = level.samplePack
        globalEventBus.emit('sample pack changed')
    }


    function loadNextLevelSamples () {
        var nextLevel = levelsNavigator.levelForID(levelsNavigator.nextLevelID(globals.levelID))
        if (nextLevel) {
            loadPackSamples(samplePacks[nextLevel.samplePack])
        }
    }


    function loadPackSamples (pack, callback) {
        for (var i in pack) {
            pack[i].callback = callback
            globalEventBus.emit('loop load requested', pack[i])
        }
    }


    function onUserGiveAnswer (challenge, answer, win) {
        if (win) {
            launchNextSamples()
        }
    }


    function nextSamples (packIndex) {  //TODO: better algorithm
        var samples = []
        var pack = samplePacks[packIndex]
        if (playingSamples.length < pack.length) {
            samples.push(pack[playingSamples.length])
            if ((packIndex === 'B' || packIndex === 'D' || packIndex === 'G') && playingSamples.length + 1 < pack.length) {
                samples.push(pack[playingSamples.length + 1])
            }
        }

        return samples
    }


    function launchNextSamples () {
        var samples = nextSamples(currentPackIndex)
        for (var i in samples) {
            var sample = samples[i]
            launchLoop(samples[i])
            globalEventBus.emit('sample added to loop', sample)
        }
    }


    function launchLoop (sample) {
        playingSamples.push(sample)
        globalEventBus.emit('play sound requested', {
            name: sample.loopName,
            start: Date.now() - lastLoopTime,
            duration: loopDuration,
            fadeDuration: fadeDuration
        })
    }


    function onLoopComplete () {
        lastLoopTime = Date.now()
    }


    function stopPlayingLoops () {
        for (var i in playingSamples) {
            globalEventBus.emit('loop stop requested', {name: playingSamples[i].loopName})
        }
        playingSamples = []
    }


    function isPlaying (sample) {
        return playingSamples.indexOf(sample) !== -1
    }



})
