define([
    'core/step_dependencies',
    'silent_teacher_world/levels/overriding_vars',
    'silent_teacher_world/levels/functions2',
    'silent_teacher_world/levels/conditions2',
    'silent_teacher_world/levels/arrays_position',
    'silent_teacher_world/levels/advanced_functions'
], function (
    stepDependencies,
    overridingVars_music,
    functions_music,
    conditions_music,
    arraysPosition_music,
    advancedFunctions_music
) {

    'use strict'

    return stepDependencies([
        overridingVars_music,
        functions_music,
        conditions_music,
        arraysPosition_music,
        advancedFunctions_music
    ])


})
