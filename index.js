fs = require('fs');
Cycle = require('./classes/Cycle.js');
Session = require('./classes/Session.js');

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

cycles = [];
cyclesToGenerate = 3;

for (let cycleId = 1; cycleId <= cyclesToGenerate; cycleId++) {
    const cycle = new Cycle(cycleId, beg5RMs);

    for (let sessionId = 1; sessionId <= 6; sessionId++) {
        const session = new Session(sessionId);
        cycle.addSession(session);
    }
    
    cycles.push(cycle);
}

console.info(cycles);