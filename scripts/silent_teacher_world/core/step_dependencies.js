define([], function () {

    'use strict'

    function getStepDependencies (steps) {

        var stepsWithDependencies = []

        var loadedDependencies = {}


        function addStepWithDependencies (step) {
            if (loadedDependencies[step.name]) {
                return
            }

            if (step.dependencies) {
                for (var i = 0; i < step.dependencies.length; i++) {
                    addStepWithDependencies(step.dependencies[i])
                }
            }
            stepsWithDependencies.push(step)
            loadedDependencies[step.name] = true
        }


        function addStepsWithDependencies () {
            for (var i = 0; i < steps.length; i++) {
                addStepWithDependencies(steps[i])
            }
        }


        addStepsWithDependencies()



        //FIXME

        for (var i = 0; i < stepsWithDependencies.length; i++) {
            stepsWithDependencies[i].id = stepsWithDependencies[i].name
        }



        /*for (var i = 0; i < stepsWithDependencies.length; i++) {
            console.log(stepsWithDependencies[i].name)
        }*/



        return stepsWithDependencies
    }


    return getStepDependencies

})