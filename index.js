fs = require('fs');

const equipment = {
    metric: false,
    barWeight: 45,
    weights: [45, 35, 25, 10, 5, 2.5]
};

const programFilePath = './programs/texas-intermediate-5x5.json';
const program = JSON.parse(
        fs.readFileSync(programFilePath, {encoding: "utf8"})
    );

/**
 * Load exercises for Texas Intermediate Program.
 */
const exercisesFilePath = './programs/lifter-exercises.json';
const exercises = JSON.parse(
        fs.readFileSync(exercisesFilePath, {encoding: "utf8"})
    );

/**
 * Set reference to each exercise in Texas Program.
 */
const backSquat = exercises.find((exercise) => exercise.name == 'back-squat');
const benchPress = exercises.find((exercise) => exercise.name == 'bench-press');
const deadlift = exercises.find((exercise) => exercise.name == 'deadlift');
const overheadPress = exercises.find(
        (exercise) => exercise.name == 'overhead-press'
    );
const barbellRow = exercises.find((exercise) => exercise.name == 'barbell-row');


/**
 * Set beginning 5RM (5-Rep Maximum) values.
 */
const beg5RMs = {
    "backSquat" : 225,
    "benchPress" : 175,
    "deadlift" : 315,
    "overheadPress" : 115,
    "barbellRow" : 135
}


/**
 * Create cycles.
 * Create cycle.
 * Create session 1.
 * Create session 2.
 * Create session 3.
 * Create session 4.
 * Create session 5.
 * Create session 6.
 */

/**
 * Create cycle.
 */
const cycle = {
    "id" : 1,
    "beg5RMs" : beg5RMs,
    "sessions" : []
}

/**
 * Create session 1.
 */
const session = {
    "id" : 1,
    "exercises" : []
}

/**
 * Add exercise to cycle.
 */
session.exercises.push(backSquat);

/**
 * Add session to cycle.
 */
cycle.sessions.push(session);

console.info(backSquat);
console.info(cycle);
console.info(cycle.sessions[0]);