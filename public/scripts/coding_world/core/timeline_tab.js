define([

], function () {

    var tabs = {}


    function createTabConstructor (eventBus) {

        function TimelineTab (name) {
            this.name = name
            
            if(name == 'Global' || name == 'Default' || Object.keys(tabs).length == 0) {
                this.id = 0
            } else{
                if(!tabs[this.name]){
                    this.id = Object.keys(tabs).length;
                }
            }


            if (tabs[this.name]) {
                var copiedTab = tabs[this.name]
                this.timelines   = copiedTab.timelines
                this.instruments = copiedTab.instruments
                this.id = copiedTab.id
                eventBus.emit('tab copied', {
                    old: copiedTab,
                    new: this
                })
            } else {
                this.timelines   = {}
                this.instruments = {}
            }

            eventBus.emit('new tab', this)

            tabs[this.name] = this
        }


        TimelineTab.prototype.init = function () {
            createView(this)
            registerClick(this)

            if (Object.keys(tabs).length === 0) {
                this.view.addClass('default')
                this.view.addClass('classTab')
            }

            deactivateAll()
            this.setActive(true)
        }


        TimelineTab.prototype.setActive = function (active) {
            this.view.toggleClass('active', active)

           /* for (var name in this.timelines) {
                var timeline = this.timelines[name]
                if (active) {
                    timeline.show()
                } else {
                    timeline.hide()
                }
            }*/

            this.active = active
        }


        TimelineTab.prototype.add = function (instrument) {
            if (instrument.soundName) {
                eventBus.emit('add instrument to tab', {
                    tabName: this.name,
                    soundName: instrument.soundName
                })
            } else {
                for (var name in instrument.samples) {
                    eventBus.emit('add instrument to tab', {
                        tabName: this.name,
                        soundName: name
                    })
                }
            }
        }


        TimelineTab.prototype.addTimeline = function (timeline) {
            this.timelines[timeline.sampleName] = timeline
            /*if (!this.active) {
                timeline.hide()
            }*/
        }


        function createView (tab) {
            tab.view = $('<div data-id="'+tab.id+'" class="timeline-tab"></div>')
            tab.view.text(tab.name)
        }


        function registerClick (tab) {
            tab.view.on('click', function () {
                desactivateTable(tab.id)
                if (!tab.active) {
                    deactivateAll()
                    tab.setActive(true)
                    eventBus.emit('timeline tab changed', tab)
                }
            })
        }

        function desactivateTable(id){
            $(".pattern").hide()
           $(".pattern[data-id="+id+"]").show()
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
