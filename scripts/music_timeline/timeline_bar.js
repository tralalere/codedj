define([
    'jquery',
    'toxilibs/request_animation_frame_polyfill'
], function ($, requestAnimationFramePolyfill) {


    function TimelineBar (params) {
        this.init(params)
        this.moving = false
    }


    TimelineBar.prototype.init = function (params) {
        this.loopTime   = params.loopTime
        this.$container = params.container
        this.initDom()
        var t = this
        this.$container.append(this.$bar)
    }


    TimelineBar.prototype.initDom = function () {
        this.$bar         = $('<div id    ="timeline_bar"></div>')
        var $circleTop    = $('<div class ="timeline_bar_circle_top"></div>')
        var $circleBottom = $('<div class ="timeline_bar_circle_bottom"></div>')
        this.$bar.append($circleTop)
        this.$bar.append($circleBottom)
    }


    TimelineBar.prototype.updateHeight = function () {
        this.$bar.css({
            'height': this.$container.height()
        })
    }


    TimelineBar.prototype.setStartOffset = function (startOffset) {
            this.startOffset   = startOffset
            this.timelineWidth = this.$container.width() - startOffset
            this.setPosition(0)


    }


    TimelineBar.prototype.play = function (delay) {
        delay = delay ? delay : 0
        this.startTime = Date.now() + delay
        this.moving = true
        this.move()
    }


    TimelineBar.prototype.stop = function () {
        this.moving = false
        this.setPosition(0)
    }


    TimelineBar.prototype.move = function () {
        if (this.moving) {
            var spendTime = Date.now() - this.startTime
            var percent   = spendTime / this.loopTime
            this.setPosition(percent)

            if (spendTime >= this.loopTime) {
                this.play(this.loopTime - spendTime)
            } else {
                var timelineBar = this
                requestAnimationFramePolyfill(function () {
                    timelineBar.move()
                })
            }
        }
    }


    TimelineBar.prototype.setPosition = function (percent) {
        this.timelineWidth = this.$container.width() - this.startOffset
        this.$bar.css({
            'width':(0 + percent * this.timelineWidth),
            'left': this.startOffset
        })
       // this.$bar.css('left',(-this.timelineWidth - this.startOffset + 80 + percent * this.timelineWidth))
    }

    return TimelineBar

})
