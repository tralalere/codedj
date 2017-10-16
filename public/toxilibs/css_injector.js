define(function () {


    function cssInjector (styles) {

        styles = styles || {}

        if (typeof styles.file !== 'undefined') {
            injectStyleSheet(styles.file)
            return
        } else if (typeof styles.files !== 'undefined') {
            for (var i = 0; i < styles.files.length; i++) {
                injectStyleSheet(styles.files[i])
            }
            return
        }

        var styleDom = document.createElement('style')
        styleDom.appendChild(document.createTextNode('')) //For some Safari versions
        document.head.appendChild(styleDom)

        var styleSheet = styleDom.sheet

        for (var selector in styles) {
            styleSheet.insertRule(selector + ' { ' + styles[selector] + ' }', 0)
        }

    }


    function injectStyleSheet (url) {
        var head = document.head
        var link = document.createElement('link')

        link.type = 'text/css'
        link.rel  = 'stylesheet'
        link.href = url

        head.appendChild(link)
    }


    return cssInjector

})
