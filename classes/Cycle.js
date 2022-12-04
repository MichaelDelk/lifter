class Cycle {
    id = 0;
    beg5RMs = {};
    exerciseDefns = {};
    cur5RMs = {};
    sessions = [];

    constructor(cycleId, exerciseDefns, beg5RMs, equipment) {
        this.id = cycleId;
        this.exerciseDefns = exerciseDefns;
        this.beg5RMs = beg5RMs;
        this.cur5RMs = this.beg5RMs;

        /**
         * Set reference to each exercise in Texas Program.
         */
        const backSquatDefn = this.exerciseDefns.find(
            (exerciseDefn) => exerciseDefn.name == 'back-squat');
        const benchPressDefn = this.exerciseDefns.find(
            (exerciseDefn) => exerciseDefn.name == 'bench-press');
        const deadliftDefn = this.exerciseDefns.find(
            (exerciseDefn) => exerciseDefn.name == 'deadlift');
        const overheadPressDefn = this.exerciseDefns.find(
                (exerciseDefn) => exerciseDefn.name == 'overhead-press'
            );
        const barbellRowDefn = this.exerciseDefns.find(
            (exerciseDefn) => exerciseDefn.name == 'barbell-row');

        /**
         * 1 cycle = 6 sessions (Typically 2 weeks, e.g. Mon-Wed-Fri, 
         *             Mon-Wed-Fri)
         * 
         * Session 1: Back squat volume, bench press volume, deadlift volume
         * Session 2: Back squat recovery, overhead press recovery
         * Session 3: Back squat intensity, bench press intensity, barbell row
         *              intensity
         * Session 4: Back squat volume, overhead press volume, deadlift volume
         * Session 5: Back squat recovery, bench press recovery
         * Session 6: Back squat intensity, overhead press intensity, barbell 
         *              row intensity
         */

        let sessionId = 1;
        let session = new Session(sessionId);
        session.addExercise(
            1, backSquatDefn, "volume", this.cur5RMs.backSquat, equipment
        );
        session.addExercise(
            2, benchPressDefn, "volume", this.cur5RMs.benchPress, equipment
        );
        session.addExercise(
            3, deadliftDefn, "intensity", this.cur5RMs.deadlift, equipment
        );
        this.increment5RM(deadliftDefn);
        this.addSession(session);
        
        sessionId = 2;
        session = new Session(sessionId);
        session.addExercise(
            1, backSquatDefn, "recovery", this.cur5RMs.backSquat, equipment
        );
        session.addExercise(
            2, overheadPressDefn, "recovery", this.cur5RMs.overheadPress, 
            equipment
        );
        this.addSession(session);
        
        sessionId = 3;
        session = new Session(sessionId);
        session.addExercise(
            1, backSquatDefn, "intensity", this.cur5RMs.backSquat, equipment
        );
        this.increment5RM(backSquatDefn);
        session.addExercise(
            2, benchPressDefn, "intensity", this.cur5RMs.benchPress, equipment
        );
        this.increment5RM(benchPressDefn);
        session.addExercise(
            3, barbellRowDefn, "intensity", this.cur5RMs.barbellRow, equipment
        );
        this.increment5RM(barbellRowDefn);
        this.addSession(session);
        
        sessionId = 4;
        session = new Session(sessionId);
        session.addExercise(
            1, backSquatDefn, "volume", this.cur5RMs.backSquat, equipment
        );
        session.addExercise(
            2, overheadPressDefn, "volume", this.cur5RMs.overheadPress, 
            equipment
        );
        session.addExercise(
            3, deadliftDefn, "intensity", this.cur5RMs.deadlift, equipment
        );
        this.increment5RM(deadliftDefn);
        this.addSession(session);
        
        sessionId = 5;
        session = new Session(sessionId);
        session.addExercise(
            1, backSquatDefn, "recovery", this.cur5RMs.backSquat, equipment
        );
        session.addExercise(
            2, benchPressDefn, "recovery", this.cur5RMs.benchPress, equipment
        );
        this.addSession(session);
        
        sessionId = 6;
        session = new Session(sessionId);
        session.addExercise(
            1, backSquatDefn, "intensity", this.cur5RMs.backSquat, equipment
        );
        this.increment5RM(backSquatDefn);
        session.addExercise(
            2, overheadPressDefn, "intensity", this.cur5RMs.overheadPress, 
            equipment
        );
        this.increment5RM(overheadPressDefn);
        session.addExercise(
            3, barbellRowDefn, "intensity", this.cur5RMs.barbellRow, equipment
        );
        this.increment5RM(barbellRowDefn);
        this.addSession(session);
        
    }

    addSession(session) {
        this.sessions.push(session);
    }

    increment5RM(exerciseDefn) {
        const config = exerciseDefn.sessionConfigs.find(
            (config) => config.type === 'intensity');
        
        switch (exerciseDefn.name) {
            case 'back-squat':
                this.cur5RMs.backSquat += config.increment;
                break;
            case 'banch-press':
                this.cur5RMs.benchPress += config.increment;
                break;
            case 'deadlift':
                this.cur5RMs.deadlift += config.increment;
                break;
            case 'overhead-press':
                this.cur5RMs.overheadPress += config.increment;
                break;
            case 'barbell-row':
                this.cur5RMs.batbellRow += config.increment;
                break;
        }
    }
};

module.exports = Cycle;