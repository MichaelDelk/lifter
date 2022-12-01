class Session {
    id = 0;
    exercises = [];

    constructor(sessionId) {
        this.id = sessionId;
    }

    addExercise(exercise) {
        this.exercises.push(exercise);
    }

};

module.exports = Session;