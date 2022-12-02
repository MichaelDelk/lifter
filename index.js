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
    metric: false,
    barWeight: 45,
    weights: [45, 35, 25, 10, 5, 2.5]
};

/**
 * Exercise Definitions: Descriptions, sets, reps, and percentages.
 */
const exerciseDefnsFilePath = './programs/lifter-exercise-defns.json';
const exerciseDefns = JSON.parse(
        fs.readFileSync(exerciseDefnsFilePath, {encoding: "utf8"})
    );

/**
 * Set reference to each exercise in Texas Program.
 */
const backSquatDefn = exerciseDefns.find(
    (exerciseDefn) => exerciseDefn.name == 'back-squat');
const benchPressDefn = exerciseDefns.find(
    (exerciseDefn) => exerciseDefn.name == 'bench-press');
const deadliftDefn = exerciseDefns.find(
    (exerciseDefn) => exerciseDefn.name == 'deadlift');
const overheadPressDefn = exerciseDefns.find(
        (exerciseDefn) => exerciseDefn.name == 'overhead-press'
    );
const barbellRowDefn = exerciseDefns.find(
    (exerciseDefn) => exerciseDefn.name == 'barbell-row');


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

    /**
     * 1 cycle = 6 sessions (Typically 2 weeks, e.g. Mon-Wed-Fri, Mon-Wed-Fri)
     * 
     * Session 1: Back squat volume, bench press volume, deadlift volume
     * Session 2: Back squat recovery, overhead press recovery
     * Session 3: Back squat intensity, bench press intensity, barbell row
     *              intensity
     * Session 4: Back squat volume, overhead press volume, deadlift volume
     * Session 5: Back squat recovery, bench press recovery
     * Session 6: Back squat intensity, overhead press intensity, barbell row
     *              intensity
     */

    let sessionId = 1;
    let session = new Session(sessionId);
    session.addExercise(1, backSquatDefn, "volume", beg5RMs.backSquat);
    session.addExercise(2, benchPressDefn, "volume", beg5RMs.benchPress);
    session.addExercise(3, deadliftDefn, "intensity", beg5RMs.deadlift);
    cycle.addSession(session);
    
    sessionId = 2;
    session = new Session(sessionId);
    session.addExercise(1, backSquatDefn, "recovery", beg5RMs.backSquat);
    session.addExercise(
        2, overheadPressDefn, "recovery", beg5RMs.overheadPress
    );
    cycle.addSession(session);
    
    sessionId = 3;
    session = new Session(sessionId);
    session.addExercise(1, backSquatDefn, "intensity", beg5RMs.backSquat);
    session.addExercise(2, benchPressDefn, "intensity", beg5RMs.benchPress);
    session.addExercise(3, barbellRowDefn, "intensity", beg5RMs.barbellRow);
    cycle.addSession(session);
    
    sessionId = 4;
    session = new Session(sessionId);
    session.addExercise(1, backSquatDefn, "volume", beg5RMs.backSquat);
    session.addExercise(2, overheadPressDefn, "volume", beg5RMs.overheadPress);
    session.addExercise(3, deadliftDefn, "intensity", beg5RMs.deadlift);
    cycle.addSession(session);
    
    sessionId = 5;
    session = new Session(sessionId);
    session.addExercise(1, backSquatDefn, "recovery", beg5RMs.backSquat);
    session.addExercise(2, benchPressDefn, "recovery", beg5RMs.benchPress);
    cycle.addSession(session);
    
    sessionId = 6;
    session = new Session(sessionId);
    session.addExercise(1, backSquatDefn, "intensity", beg5RMs.backSquat);
    session.addExercise(
        2, overheadPressDefn, "intensity", beg5RMs.overheadPress
    );
    session.addExercise(3, barbellRowDefn, "intensity", beg5RMs.barbellRow);
    cycle.addSession(session);
    
    cycles.push(cycle);

}

cycles.forEach(cycle => {
    console.info(cycle);
    cycle.sessions.forEach(session => {
        console.info(session);
    })
});
