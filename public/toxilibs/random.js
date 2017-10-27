/* eslint-disable no-magic-numbers */
define([], function () {
    'use strict'

    var allLetters             = 'abcdefghijklmnopqrstuvwxyz'
    var allUnmistakableLetters = 'defghijkmnpqrtuvwxyz'


    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ' + allLetters


    var random = Math.random


    function reset () {
        random = Math.random
    }


    function generateSeed () {
        var seed = ''
        for (var i = 0; i < 10; i++) {
            seed += chars[Math.floor(Math.random() * chars.length)]
        }
        return seed
    }



    //****************************** BOOLEAN

    function oneChanceIn (chances) {
        return random() < 1 / chances
    }



    //****************************** NUMBERS

    function between (min, max) {
        return min + (max - min) * random()
    }


    function intBetween (min, max) {
        return Math.floor(between(min, max))
    }




    //****************************** LETTERS

    function letter () {
        return allLetters[intBetween(0, allLetters.length)]
    }


    function letters (count) {
        var s = ''
        for (var i = 0; i < count; i++) {
            s += letter()
        }
        return s
    }


    function unmistakableLetter () {
        return allUnmistakableLetters[intBetween(0, allUnmistakableLetters.length)]
    }


    function unmistakableLetters (count) {
        var s = ''
        for (var i = 0; i < count; i++) {
            s += unmistakableLetter()
        }
        return s
    }



    //****************************** ARRAYS

    var argsToArray = Array.prototype.slice

    function pick () {
        var array
        if (arguments.length === 1) {
            array = arguments[0]
        } else {
            array = argsToArray.call(arguments)
        }
        return array[intBetween(0, array.length)]
    }


    function shuffleArray (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(random() * (i + 1))
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }









    //****************************** GAUSSIAN RANDOM

    // 67% chances of being between value - variance and value + variance
    // Algo : polar form of the Box-Muller transformation
    // http://www.design.caltech.edu/erik/Misc/Gaussian.html
    function around (value, variance) {

        var x1
        var x2
        var w = 2
        while (w >= 1) {
            x1 = 2 * random() - 1
            x2 = 2 * random() - 1
            w = x1 * x1 + x2 * x2
        }

        w = Math.sqrt(-2 * Math.log(w) / w)
        return x1 * w * variance

    }





    //****************************** WEIGHTED RANDOM

    // choices = [['apple', 2], ['banana', 1], ['peach', 10]]
    function weightedChoice (choices) {
        var allChoices = []
        var weightSum  = 0

        for (var i = 0; i < choices.length; i++) {
            var choice = choices[i]
            weightSum += choice[1]
            allChoices.push({
                value:     choice[0],
                weight:    choice[1],
                weightSum: weightSum
            })
        }

        var rand = random() * weightSum
        for (var index = 0; index < allChoices.length; index++) {
            if (rand < allChoices[index].weightSum) {
                return allChoices[index].value
            }
        }

        return allChoices[allChoices.length - 1]
    }


    var fairRandoms = {}

    //FIXME add more params to fine tune (but perhaps the only relevant is decayWeightPower ?)
    function fairChoice (choices, params) {
        params      = params || {}
        var name    = params.name || 'default'
        var history = fairRandoms[name]

        var index
        if (history) {
            var stats = weightedStats(choices.length, history)
            balanceWeights(stats)
            index = weightedChoice(stats)
            history.push(index)
        } else {
            index = intBetween(0, choices.length)
            fairRandoms[name] = [index]
        }

        return choices[index]
    }


    //FIXME add to doc
    function fairChoiceInt (min, max, params) {
        var choices = []
        for (var i = min; i <= max; i++) {
            choices.push(i)
        }
        return fairChoice(choices, params)
    }


    function resetFairChoice (name) {
        delete fairRandoms[name]
    }


    function resetAllFairChoices () {
        fairRandoms = {}
    }


    var decayWeightPower = -0.3
    function weightedStats (choicesCount, history) {
        var count = history.length
        var stats = []
        for (var i = 0; i < choicesCount; i++) {
            stats.push([i, 0])
        }
        for (i = 1; i <= count; i++) {
            var value = history[count - i]
            stats[value][1] += Math.pow(i, decayWeightPower)
        }
        return stats
    }


    function balanceWeights (stats) {
        var weightSum = 0
        for (var i = 0; i < stats.length; i++) {
            weightSum += stats[i][1]
        }
        var idealWeight = weightSum / stats.length
        for (i = 0; i < stats.length; i++) {
            var delta = (stats[i][1] - idealWeight)
            stats[i][1] = Math.max(0, idealWeight - delta) //FIXME find better formula
        }
    }





    function randomAPI () {
        return random()
    }

    randomAPI.reset        = reset
    randomAPI.generateSeed = generateSeed

    randomAPI.oneChanceIn  = oneChanceIn

    randomAPI.around       = around
    randomAPI.between      = between
    randomAPI.int          = intBetween //FIXME remove
    randomAPI.intBetween   = intBetween

    randomAPI.letter               = letter
    randomAPI.letters              = letters
    randomAPI.unmistakableLetter   = unmistakableLetter
    randomAPI.unmistakableLetters  = unmistakableLetters

    randomAPI.shuffleArray = shuffleArray
    randomAPI.pick         = pick
    randomAPI.chooseWithin = pick //FIXME remove

    randomAPI.weightedChoice      = weightedChoice
    randomAPI.fairChoice          = fairChoice
    randomAPI.fairChoiceInt       = fairChoiceInt
    randomAPI.resetFairChoice     = resetFairChoice
    randomAPI.resetAllFairChoices = resetAllFairChoices



    return randomAPI

})
