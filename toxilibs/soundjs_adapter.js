define([
    'soundjs',
    'toxilibs/request_animation_frame_polyfill'
], function (soundjs, requestAnimationFrame) {
    var sounds = {}

    var defaultFadeDuration = 200


    function SoundJSAdapter (params) {
        params = params || {}

        var sound = (params.name in sounds) ? sounds[params.name] : this

        var url = params.url

        if (!hasKnownExtension(url)) { //FIXME add error message for unknown extension and if .ogg is not there
            url += '.ogg'
        }
        sound.src        = url
        sound.id         = params.name

        sounds[sound.id] = sound

        soundjs.registerSound(sound.src, sound.id)

        return sound
    }


    function hasKnownExtension (url) {
        return soundjs.alternateExtensions.indexOf(url.split('.').pop()) !== -1
    }


    SoundJSAdapter.setup = function (onloadCallback) {
        soundjs.alternateExtensions = ['mp3', 'ogg', 'wav']
        onSoundLoad(onloadCallback)

        requestAnimationFrame(update)
    }



    SoundJSAdapter.prototype.play = function (params) {
        params = params || {}
        params.fadeDuration = (typeof params.fadeDuration === 'undefined') ? defaultFadeDuration : params.fadeDuration
        params.startTime    = (typeof params.start === 'undefined')        ? 0 : params.start

        setFadeStep(this, params.fadeDuration)

        if (typeof params.durationRatio !== 'undefined') {
            params.duration = this.duration * params.durationRatio
        }
        if (typeof params.duration === 'undefined') {
            var tolerance = 0.001
            params.duration = this.duration - params.startTime - tolerance // avoid sound not to loop
        }

        playSound(this, params)
    }



    function setFadeStep (sound, fadeDuration) {
        if (fadeDuration === 0) {
            sound.fadeStep = 1
        } else {
            sound.fadeStep = 1 / (fadeDuration / 60)
        }
    }



    function playSound (sound, params) {
        if (sound.isPlaying()) {
            soundjs.play(sound.id, params)
        } else {

            if (!sound.soundInstance) {
                console.warn('Sound ' + sound.id + ' can not be played : not loaded yet')
                return
            }
            sound.fadeIn = true
            sound.setVolume(0)
            sound.soundInstance.targetVolume = params.volume || 1
            sound.soundInstance.play(params)
        }
    }



    SoundJSAdapter.prototype.isPlaying = function () {
        return this.soundInstance && this.soundInstance.playState === 'playSucceeded'
    }



    SoundJSAdapter.prototype.stop = function () {
        this.soundInstance.stop()
    }



    SoundJSAdapter.prototype.volume = function () {
        return (this.soundInstance ? this.soundInstance.volume : 0)
    }



    SoundJSAdapter.prototype.setVolume = function (volume) {
        if (this.soundInstance) {
            this.soundInstance.volume = volume
        }
    }



    SoundJSAdapter.prototype.loop = function (shouldLoop, callback) {
        this.soundInstance.loop = (shouldLoop ? -1 : 0)
        if (typeof callback !== 'undefined') {
            this.soundInstance.on('loop', callback)
        }
    }



    SoundJSAdapter.prototype.loaded = function () {
        return this._loaded
    }



    SoundJSAdapter.prototype.unload = function () {
        // @FIXME implement
    }



    SoundJSAdapter.globalVolume = function (volume) {
        if (soundjs.volume !== volume) {
            soundjs.volume = volume
        }
    }



    SoundJSAdapter.setFadeDuration = function (duration) {
        defaultFadeDuration = duration
    }



    function update () {
        for (var id in sounds) {
            var sound = sounds[id]
            if (sound.isPlaying()) {
                fadeSound(sound)
            }
        }
        requestAnimationFrame(update)
    }



    function fadeSound (sound) {
        if (sound.fadeIn) {
            sound.soundInstance.volume += sound.fadeStep
            if (sound.soundInstance.volume >= sound.soundInstance.targetVolume) {
                sound.soundInstance.volume = sound.soundInstance.targetVolume
            }
        } else {
            sound.soundInstance.volume -= sound.fadeStep
            if (sound.soundInstance.volume <= 0) {
                sound.soundInstance.volume = 0
                sound.stop()
            }
        }
    }



    function onSoundLoad (soundLoadCallback) {
        soundjs.on('fileload', function (event) {
            sounds[event.id]._loaded = true
            storeInstanceOnLoad(event)
            soundLoadCallback(event.id)
        })
    }



    function storeInstanceOnLoad (event) {
        var soundInstance = soundjs.createInstance(event.id)
        sounds[event.id].soundInstance = soundInstance
        sounds[event.id].duration      = soundInstance.getDuration()
    }



    return SoundJSAdapter

})
