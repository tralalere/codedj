define(function () {
    'use strict'


    var Sound
    var mute
    var sounds = {}
    var toBePlayedAfterLoad = {}



    function use (Adapter) {
        Sound = Adapter
        Sound.setup(onloadCallback)
    }



    function init (filePaths) {
        filePaths = filePaths || {}
        setSounds(filePaths)
        setMute(JSON.parse(localStorage.getItem('mute')) || false)
    }



    function destroySounds () {
        for (var name in sounds) {
            sounds[name].unload()
            delete sounds[name]
        }
    }



    function setSounds (filePaths) {
        destroySounds()

        for (var name in filePaths) {
            setSound(name, filePaths[name])
        }
    }



    function setSound (name, filePath) {
        if (!sounds[name]) {
            sounds[name] = new Sound({
                sounds: sounds,
                name:   name,
                url:    filePath
            })
        } else {
            console.warn('A sound named: ' + name + ' already exists')
        }
    }


    var allSoundsLoadedCallbacksWaiting = []

    function onloadCallback (name) {
        if (allSoundsLoadedCallbacksWaiting.length > 0) {
            if (allSoundsLoaded()) {
                for (var i = 0; i < allSoundsLoadedCallbacksWaiting.length; i++) {
                    allSoundsLoadedCallbacksWaiting[i]()
                }
                allSoundsLoadedCallbacksWaiting = []
            }
        }
        if (toBePlayedAfterLoad[name]) {
            play(name)
        }
    }


    function allSoundsLoaded () {
        for (var name in sounds) {
            if (!sounds[name].loaded()) {
                return false
            }
        }
        return true
    }


    //TODO allow for several calls of this (use event capabilities ?)
    function onAllSoundsLoaded (callback) {
        if (allSoundsLoaded()) {
            callback()
        } else {
            allSoundsLoadedCallbacksWaiting.push(callback)
        }
    }


    // @FIXME function name
    function setLoop (name, callback) {
        sounds[name].loop(true, callback)
    }



    function play (name, params) {
        var sound = sounds[name]

        if (!sound || !sound.loaded()) {
            toBePlayedAfterLoad[name] = true
            return
        }
        sound.play(params)
    }



    function stop (name) {
        if (name) {
            stopOne(name)
        } else {
            stopAll()
        }
    }



    function stopOne (name) {
        if (sounds[name].loaded()) {
            sounds[name].stop()
        } else {
            delete toBePlayedAfterLoad[name]
        }
    }


    function stopAll () {
        for (var name in sounds) {
            stopOne(name)
        }
    }



    function toggleMute () {
        setMute(!mute)
    }



    function setMute (state) {
        mute = state
        localStorage.mute = mute

        Sound.globalVolume(mute ? 0 : 1)
    }



    function setVolume (volumeRatio) {
        Sound.globalVolume(volumeRatio)
    }



    function setFadeDuration (fadeDuration) {
        Sound.setFadeDuration(fadeDuration)
    }



    function isMute () {
        return mute
    }


    function duration (name) {
        var sound = sounds[name]
        return (sound ? sound.duration : 0)
    }


    function volume (name) {
        var sound = sounds[name]
        return (sound ? sound.volume() : 0)
    }



    return {
        use:               use,
        toggleMute:        toggleMute,
        stop:              stop,
        init:              init,
        setSound:          setSound,
        setLoop:           setLoop,
        setFadeDuration:   setFadeDuration,
        play:              play,
        isMute:            isMute,
        onAllSoundsLoaded: onAllSoundsLoaded,
        duration:          duration,
        volume:            volume,
        setVolume:         setVolume
    }


})
