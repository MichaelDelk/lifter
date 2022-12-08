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
Exercise = require('./classes/Exercise.js');

/**
 * Equipment: Assume non-metric lbs.
 */
const equipment = {
    "metric": false,
    "barWeight": 45,
    "weights": [45, 35, 25, 10, 5, 2.5]
};

/**
 * Exercise Definitions: Descriptions, sets, reps, and percentages.
 */
const exerciseDefnsFilePath = './programs/lifter-exercise-defns.json';
const exerciseDefns = JSON.parse(
        fs.readFileSync(exerciseDefnsFilePath, {encoding: "utf8"})
    );

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
const cur5RMs = { ...beg5RMs };

cycles = [];
cyclesToGenerate = 1;

for (let cycleId = 1; cycleId <= cyclesToGenerate; cycleId++) {
    const cycle = new Cycle(cycleId, exerciseDefns, cur5RMs, equipment);

    cycles.push(cycle);

}

cycles.forEach(cycle => {
    console.info("");
    console.info("Cycle " + cycle.id);
    cycle.sessions.forEach(session => {
        console.info("");
        console.info("Session " + session.id);
        session.exercises.forEach(exercise => {
            let output = exercise.desc;
            console.info(output);
            exercise.warmups.forEach(warmup => {
                output = warmup.sets;
                output += "x" + warmup.reps;
                output += " " + warmup.weight;
                output += " (" + warmup.loadText + ")";
                console.info(output);
            });
            output = exercise.workingSets;
            output += "x" + exercise.workingReps;
            output += " " + exercise.workingWeight;
            output += " (" + exercise.loadText + ")";
            console.info(output);
        });
    });
});
