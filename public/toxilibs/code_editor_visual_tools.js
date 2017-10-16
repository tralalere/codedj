/*eslint-disable no-use-before-define */
if (typeof define !== 'function') {
    var define = require('amdefine')(module)
}
/*eslint-enable no-use-before-define */

define(['jquery', 'ace'], function ($) {
    'use strict'

    var ace = window.ace

    var Range

    ace.config.loadModule('ace/range', function (module) {
        Range = module.Range
    })


    function addCapabilities (object, aceEditor, anchorsContainer) {


        // position of top left pixel of the character, relative to top left of the editor container
        // Note that row and col can be floats.
        object.textToPixCoordinates = function (row, col) {
            var renderer = aceEditor.renderer
            return {
                x: col       * renderer.characterWidth - renderer.scrollLeft + renderer.gutterWidth + renderer.$padding,
                y: (row - 1) * renderer.lineHeight     - renderer.scrollTop
            }
        }



        // params.type if one of 'text', 'line', 'fullLine', 'screenLine'
        object.addMarker = function (params) {
            params.end = params.end || [params.start[0], params.start[1] + 1]
            var range = new Range(params.start[0], params.start[1], params.end[0], params.end[1])
            aceEditor.getSession().addMarker(range, params.klass || '', params.type, params.inFront)
        }


        // params.type if one of 'error', 'warning', 'info'
        object.addAnnotation = function (params) {
            aceEditor.getSession().setAnnotations([{
                row:    params.pos[0],
                column: params.pos[1],
                text:   params.text,
                type:   params.type || 'info'
            }])
        }

        // see also showTooltip in ace source code









  //**************************************** ANCHOR POINTS

        object._anchorPoints = {}
        var anchorPointID = 0


        var anchorPointCss = {
            height:     0,
            width:      0,
            position:   'absolute',
            zIndex:     10000
        }


        object.addAnchorPoint = function (row, col, inside) {

            var container = $('<div class="editorAnchorPoint">').css(anchorPointCss)

            if (inside) {
                container.append(inside)
            }
            anchorsContainer.append(container)

            var anchorPoint = {
                id:         ++anchorPointID,
                row:        row,
                col:        col,
                container:  container
            }

            positionAnchor(anchorPoint)
            this._anchorPoints[anchorPointID] = anchorPoint
            return anchorPoint

        }


        function positionAnchor (anchor) {
            var pos = object.textToPixCoordinates(anchor.row, anchor.col)
            anchor.container.css({
                left: pos.x + 'px',
                top:  pos.y + 'px'
            })
        }


        function positionAnchors () {
            for (var id in object._anchorPoints) {
                positionAnchor(object._anchorPoints[id])
            }
        }


        aceEditor.getSession().on('changeScrollLeft', positionAnchors)
        aceEditor.getSession().on('changeScrollTop', positionAnchors)
        aceEditor.renderer.$gutterLayer.on('changeGutterWidth', positionAnchors)



        object.removeAnchorPoint = function (anchorOrID) {
            var anchorPoint = (typeof anchorOrID === 'number') ? object._anchorPoints[anchorOrID] : anchorOrID
            if (!anchorPoint) {
                return
            }
            anchorPoint.container.remove()
            delete object._anchorPoints[anchorPoint.id]
        }


        object.removeAnchorPoints = function () {
            for (var id in object._anchorPoints) {
                this.removeAnchorPoint(object._anchorPoints[id])
            }
        }







    }



    return addCapabilities

})
