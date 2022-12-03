class Session {
    id = 0;
    exercises = [];

    constructor(sessionId) {
        this.id = sessionId;
    }

    addExercise(exerciseId, exerciseDefn, sessionType, cur5RM) {
        const exercise = new Exercise(
            exerciseId, exerciseDefn, sessionType, cur5RM
        );
        this.exercises.push(exercise);
    }

};

module.exports = Session;