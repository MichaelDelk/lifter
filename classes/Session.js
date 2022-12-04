class Session {
    id = 0;
    exercises = [];

    constructor(sessionId) {
        this.id = sessionId;
    }

    addExercise(exerciseId, exerciseDefn, sessionType, cur5RM, equipment) {
        const exercise = new Exercise(
            exerciseId, exerciseDefn, sessionType, cur5RM, equipment
        );
        this.exercises.push(exercise);
    }

};

module.exports = Session;