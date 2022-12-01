/**
 * index.js
 * 
 * Calculate warmup sets, reps and weights for strength training programs like 
 * Starting Strength.
 * 
 * @package lifter
 * @author Michael Delk
 * @version 2022-11-29
 */

fs = require('fs');
Cycle = require('./classes/Cycle.js');
Session = require('./classes/Session.js');

/**
 * Equipment: Assume non-metric lbs.
 */
const equipment = {
    metric: false,
    barWeight: 45,
    weights: [45, 35, 25, 10, 5, 2.5]
};

/**
 * Exercises: Descriptions, sets, reps, and percentages.
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

cycles = [];
cyclesToGenerate = 1;

for (let cycleId = 1; cycleId <= cyclesToGenerate; cycleId++) {
    const cycle = new Cycle(cycleId, beg5RMs);

    for (let sessionId = 1; sessionId <= 6; sessionId++) {
        const session = new Session(sessionId);
        session.addExercise(backSquat);
        session.addExercise(benchPress);
        session.addExercise(deadlift);
        cycle.addSession(session);
    }
    
    cycles.push(cycle);
}

console.info(cycles);
console.info(JSON.stringify(cycles));