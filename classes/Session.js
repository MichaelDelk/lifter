class Session {
    id = 0;
    exercises = [];

    constructor(sessionId) {
        this.id = sessionId;
    }

    addExercise(exerciseId, exerciseDefn, sessionType, beg5RM) {
        const config = exerciseDefn.sessionConfigs.find(
            (config) => config.type === sessionType);
            console.info(config);

        const exercise = {} ;

        exercise.id = exerciseId;
        exercise.name = exerciseDefn.name;
        exercise.desc = exerciseDefn.desc;
        exercise.workingSets = config.workingSets;
        exercise.workingReps = config.workingReps;

        if (config.multiplier) {
            exercise.workingWeight = beg5RM * config.multiplier;
        } else {
            exercise.workingWeight = beg5RM + config.increment;
        }

        this.exercises.push(exercise);
    }

};

module.exports = Session;