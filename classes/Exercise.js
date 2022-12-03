class Exercise {
    id = 0;
    name = '';
    desc = '';
    sessionType = '';
    workingSets = 0;
    workingReps = 0;
    workingweight = 0;
    warmups = [];
    
    constructor(exerciseId, exerciseDefn, sessionType, cur5RM) {
        this.id = exerciseId;

        const config = exerciseDefn.sessionConfigs.find(
            (config) => config.type === sessionType);

        this.name = exerciseDefn.name;
        this.desc = exerciseDefn.desc;
        this.sessionType = sessionType;
        this.workingSets = config.workingSets;
        this.workingReps = config.workingReps;

        if (config.multiplier) {
            this.workingWeight = cur5RM * config.multiplier;
        } else {
            this.workingWeight = cur5RM + config.increment;
        }

    }

};

module.exports = Exercise;