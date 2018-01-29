var lang = 'fr';
if(navigator.language || navigator.userLanguage){
    lang = navigator.language || navigator.userLanguage;
};

if(localStorage.getItem('lang')){

    if (localStorage.getItem('lang') !== 'fr' || localStorage.getItem('lang').substring(0, 2) !== 'fr') {
        if(localStorage.getItem('lang') !== 'en'){
            localStorage.setItem('lang', 'en')
            location.reload();
        }
    }

    lang = localStorage.getItem('lang')
}

if (lang !== 'fr' || lang.substring(0, 2) !== 'fr') {
    lang = 'en'
} else {
    lang = 'fr'
}

define([

], function () {

    var tabs = {}


    function createTabConstructor (eventBus) {
        console.log(eventBus)
        function TimelineTab (name) {
            if(lang == 'fr'){
                this.name = name || 'Global'
            } else{
                this.name = name || 'Default'
            }


            if (tabs[this.name]) {
                var copiedTab = tabs[this.name]
                this.timelines   = copiedTab.timelines
                this.instruments = copiedTab.instruments
                eventBus.emit('tab copied', {
                    old: copiedTab,
                    new: this
                })
            } else {
                this.timelines   = {}
                this.instruments = {}
            }

            createView(this)
            registerClick(this)
            eventBus.emit('new tab', this)

            if (Object.keys(tabs).length === 0) {
                this.view.addClass('default')
                this.view.addClass('classTab')
            }

            tabs[this.name] = this
            deactivateAll()
            this.setActive(true)
        }


        TimelineTab.prototype.setActive = function (active) {
            this.view.toggleClass('active', active)

            for (var name in this.timelines) {
                var timeline = this.timelines[name]
                if (active) {
                    timeline.show()
                } else {
                    timeline.hide()
                }
            }

            this.active = active
        }


        TimelineTab.prototype.add = function (instrument) {
            console.log(instrument)
            if (instrument.soundName) {
                eventBus.emit('add instrument to tab', {
                    tab: this,
                    soundName: instrument.soundName
                })
            } else {
                for (var name in instrument.samples) {
                    eventBus.emit('add instrument to tab', {
                        tab: this,
                        soundName: name
                    })
                }
            }
        }


        TimelineTab.prototype.addTimeline = function (timeline) {
            console.log(timeline)
            this.timelines[timeline.sampleName] = timeline
        
            if (!this.active) {
                timeline.hide()
            }
        }


        function createView (tab) {
            tab.view = $('<div class="timeline-tab"></div>')
            tab.view.text(tab.name)
        }


        function registerClick (tab) {
            tab.view.on('click', function () {
                if (!tab.active) {
                    deactivateAll()
                    tab.setActive(true)
                    eventBus.emit('timeline tab changed', tab)
                }
            })
        }


        function deactivateAll () {
            for (var name in tabs) {
                var tab = tabs[name]
                tab.setActive(false)
            }
        }


        eventBus.on('tab switch requested', function (tabName) {
            var tab = tabs[tabName]
            if (tab) {
                deactivateAll()
                tab.setActive(true)
            }
        })


        return TimelineTab

    }


    return createTabConstructor

})
