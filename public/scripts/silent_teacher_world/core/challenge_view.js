var selected = 'pad'
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

    eventBus.on('lang changed', function (lang) {
        localStorage.setItem('lang', lang)
        location.reload();
    })

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
        $viewApp.prepend($('#world1')).find('.containPreHome').append('<img src="https://code.org/api/hour/begin_tralalere_code_dj.png">').append($blocChallengesContainer)
        $('.btnWorldWin #btnGoMenu').on('click', function () {
            window.location.href = '.?monde=select'
        })
        $('.logoImg').on('click', function () {
            $viewApp.empty()
            window.location.href = '.?monde'
        })
        $('.btnPrevious').click(function () {
            window.location.href = '.?monde=select'
            return false
        })

        $('.tab-mobile div').on('click',function(){
            $('.tab-mobile div').removeClass('active')
            $(this).addClass('active')
        });
        
        $blocChallengesContainer.find('.wrapChallengeTimeline').prepend(blocTimeline)

        $blocChallengesContainer.append($challengeAfterAnswer)
        counter = 1
        
        EffectProgress()
    }


    function createChallengeView (challenge) {
        $('body').addClass('secondBack')
        $blocCount.find('.count').text(counter)
        $blocChallenge.removeClass('win lose')
        addQuestion(challenge)

        addInput(challenge)
        addInputListeners(challenge)

        previousChallenge = challenge

        eventBus.emit('challenge view ready', $blocChallenge)


        // TODO : insertion mobile template
        $('.inputAnswer').on('click',function(){
            $('#roll-list-mobile').fadeIn()
            $('.pad').addClass('active')
            $('.result').val('')
            $('.result').text('')
            selected = 'pad'
        })

        $('.tab-mobile .select div').on('click',function(){
            $('.tab-mobile div').removeClass('active')

            $(this).addClass('active')

            switch($(this).text()){
                
                case '123':
                    selected = 'pad'
                    
                    $('.result').val('')
                    $('.result').text('')
                    
                    $('.tab-content-mobile div').removeClass('active')
                    $('.tab-content-mobile .pad').addClass('active')
                break

                case 'abc':
                    selected = 'keyboard'
                    
                    $('.result').val('')
                    $('.result').text('')
                    
                    $('.tab-content-mobile div').removeClass('active')
                    $('.tab-content-mobile .keyboard').addClass('active')
                break

                case 'T/F':
                    selected = 'boolean'
                    
                    $('.result').val('')
                    $('.result').text('')
                    
                    $('.tab-content-mobile div').removeClass('active')
                    $('.tab-content-mobile .boolean').addClass('active')
                break

                default :
                    console.log('error')
            }
        });

        $('.sub').on('click',function(){

            var val = $('.result').val()

            selected = 'OK'

            $('.inputAnswer').val(val);
            $('#roll-list-mobile').fadeOut();
        })

        $('.tab-content-mobile > div > div').on('click',function(){

            var str = $('.result').text();
            var val = $('.result').val();
            switch(selected){

                case 'pad':
                   // $('.result').text($(this).text())

                    if(str == ""){
                        $('.result').empty()
                        $('.result').val($(this).text())
                        $('.result').text($('.result').val())
                        
                    } else if(val.length == 1){
                        $('.result').text(val + $(this).text())
                        $('.result').val(val + $(this).text())
                    }
                break

                case 'keyboard':
                    $('.result').empty()
                    $('.result').val($(this).text())
                    $('.result').text($('.result').val())
                break

                case 'boolean':
                    $('.result').empty()
                    $('.result').val($(this).text())
                    $('.result').text($('.result').val())
                break

                default:
                console.log('no selected input')

            }
            console.log($(this).text())
        })

        $('.suppress').on('click',function(){

            var str = $('.result').val();
            var text = str.slice(0, -1);
            console.log(str);
            console.log(text);
           
            $('.result').text(text)
            $('.result').val(text)
        })
        
        
        
    }


    function findScrollDirectionOtherBrowsers(event){
        var delta;

        if (event.wheelDelta){
            delta = event.wheelDelta;
        }else{
            delta = -1 * event.deltaY;
        }

        if (delta < 0){
            console.log("DOWN");
        }else if (delta > 0){
            console.log("UP");
        }

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
            if(selected !== 'OK'){
                return
            }
            if (!canSubmitAnwser(challenge)) {
                return
            }

            $('#roll-list-mobile').fadeOut();
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
