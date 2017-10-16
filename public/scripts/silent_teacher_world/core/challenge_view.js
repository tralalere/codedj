define([
    'toxilibs/event_bus_queued',
    'jquery',
    'perfectScrollbarJQuery',
    'css_effect'
], function (eventBus, $, perfectscroll, EffectProgress) {

    eventBus.on('page loaded', initDom)

    eventBus.on('challenge created', createChallengeView)

    eventBus.on('challenge answer given', addCorrection)

    eventBus.on('challenge changed', updateAnsweredQuestions)



    var answerTemplate
    var correctionTemplate
    var previousChallenge

    /*
     TODO: add variable for integration css
     */
    var counter = 1

    var $blocInputAnswer
    var $blocChallenge
    var $blocQuestion
    var $challengeAfterAnswer
    var $blocChallengesContainer
    var $blocCount

    var $viewApp


    function initDom () {
        answerTemplate     = $('#answer_template').html()
        correctionTemplate = $('#correction_template').html()

        $blocChallengesContainer = $('#challenges_container')
        $blocInputAnswer = $('.blocInputAnswer')
        $blocChallenge = $('#blocChallenge')
        $blocQuestion = $('.blocQuestion')
        $challengeAfterAnswer = $('#challengeAfterAnswer')
        $blocCount = $('.blocCount')

        $viewApp = $('#viewApp')


        $blocChallengesContainer.removeClass('invisible')
        $('.loader').addClass('invisible')
        $viewApp.empty()
        $viewApp.prepend($('#world1')).find('.containPreHome').append($blocChallengesContainer);
        $('.btnWorldWin #btnGoMenu').on('click',function () {
            window.location.href = '.?monde=select'
        })
        $('.logoImg').on('click', function(){
            $viewApp.empty()
            window.location.href = '.?monde'
        })
        $('.btnPrevious').click(function(){
            window.location.href = '.?monde=select'
            return false;
        });
        $blocChallengesContainer.find('.wrapChallengeTimeline').prepend(blocTimeline)

        $blocChallengesContainer.append($challengeAfterAnswer)
        counter = 1
        EffectProgress()
    }


    function createChallengeView (challenge) {
        $('body').addClass('secondBack');
        $blocCount.find('.count').text(counter)
        $blocChallenge.removeClass('win lose')
        addQuestion(challenge)

        addInput(challenge)
        addInputListeners(challenge)

        previousChallenge = challenge

        eventBus.emit('challenge view ready', $blocChallenge)
    }


    function addCorrection (challenge, userAnswer, win) {
        /*
         Todo: modif integration css => remove class for init and add class icon
         */
        var htmlClass

        if (win === null) {
            htmlClass = 'too_late'
        } else {
            htmlClass = win ? 'win' : 'lose'
        }

        $blocChallenge.addClass(htmlClass)


        //we do not remove the input : it's a hack for mobile users to keep the keyboard opened
        challenge.input.css({
            position: 'absolute',
            top:      '-100px',
            left:     '-2000px',
            'z-index':  '-10'
        })

        $blocChallenge.find('.interro').remove()

        if (!userAnswer) {
            userAnswer = '<img src="./icons/late_gray.png" alt="too late" />'
        }

        if (typeof challenge.answer === 'string') {
            challenge.answer = "'" + challenge.answer + "'"
        }

        challenge.answerContainer.prepend(correctionTemplate)

        /*
         Todo: modif integration css =>
         */
        challenge.answerContainer.find('.user_answer').html(userAnswer)
        challenge.answerContainer.find('.btnAnswer').hide()

        if (!win) {
            challenge.answerContainer.find('.correct_answer').html(challenge.answer.toString()).fadeIn(750)
        }
    }


    function updateAnsweredQuestions () {
        if (previousChallenge) {
            previousChallenge.answerContainer.addClass('after')
            $blocChallenge.clone().prependTo($challengeAfterAnswer)
            counter++
        }
    }


    /*
     Todo: modif integration css => addQuestion
     */
    function addQuestion (challenge) {
        $blocQuestion.empty()
        $blocQuestion.prepend(challenge.question.container)
        challenge.question.display() //FIXME
    }

    /*
     TODO add variable to object challenge (blocinputanswer)=> integration css
     and change width input
     */
    function addInput (challenge) {
        challenge.answerContainer = $(answerTemplate)
        challenge.input = challenge.answerContainer.find('input')
        challenge.input.attr('type', inputType(challenge.answer))

        $blocInputAnswer.empty()
        $blocInputAnswer.prepend(challenge.answerContainer)
    }


    function addInputListeners (challenge) {
        challenge.input.keydown(function (event) {
            if (!canSubmitAnwser(challenge)) {
                return
            }

            if (event.keyCode === 13) {
                event.preventDefault()
                submitAnswer(challenge)
            }
        })

        $blocInputAnswer.find('.btnAnswer').click(function () {
            if (!canSubmitAnwser(challenge)) {
                return
            }
            submitAnswer(challenge)
        })
    }


    function canSubmitAnwser (challenge) {
        if (challenge.answerSubmitted || challenge.wasTooLate) {
            return false
        }

        challenge.timer.addBonusDelay()

        return true
    }


    /*
     Todo: modif integration css => submitAnswer
     */

    function submitAnswer (challenge) {
        challenge.submitAnswer(challenge.input.val())
    }





    function inputType (answer) {
        if (!isIOS()) {
            return 'text'
        }

        if (typeof answer === 'number') {
            return 'number'
        }

        if (typeof answer === 'string') {
            var s = answer.replace(/^0*/g, '') // removing leading zeros
            if (String(parseInt(s, 10)) === s) {
                return 'number'
            }
        }

        return 'text'
    }




    function isIOS () {
        return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
    }




})
