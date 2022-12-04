class Exercise {
    id = 0;
    name = '';
    desc = '';
    sessionType = '';
    workingSets = 0;
    workingReps = 0;
    workingWeight = 0;
    loadText = "";
    warmups = [];

    constructor(exerciseId, exerciseDefn, sessionType, cur5RM, equipment) {
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
        this.workingWeight = Math.round(this.workingWeight);

        this.loadText = this.getPlateLoadText(this.workingWeight, equipment);

        this.warmups = exerciseDefn.warmups;
        exerciseDefn.warmups.forEach(warmup => {
            warmup.weight = this.workingWeight * warmup.multiplier;
            warmup.weight = Math.round(warmup.weight);
            if (warmup.weight < equipment.barWeight) {
                warmup.weight = equipment.barWeight;
            }
            warmup.loadText = this.getPlateLoadText(warmup.weight, equipment);
        });

    }

    getPlateLoadText(weight, equipment) {
        weight -= equipment.barWeight;

        if (weight === 0) {
            return "Bar";
        }

        weight /= 2;

        let weight_45 = 0;
        let weight_35 = 0;
        let weight_25 = 0;
        let weight_10 = 0;
        let weight_5 = 0;
        let weight_2half = 0;

        while (weight > 0) {
            if (weight >= equipment.weights[0]) {
                weight_45 += 1;
                weight -= equipment.weights[0];
                continue;
            }
            else if (weight >= equipment.weights[1]) {
                weight_35 += 1;
                weight -= equipment.weights[1];
                continue;					
            }
            else if (weight >= equipment.weights[2]) {
                weight_25 += 1;
                weight -= equipment.weights[2];
                continue;					
            }
            else if (weight >= equipment.weights[3]) {
                weight_10 += 1;
                weight -= equipment.weights[3];
                continue;					
            }
            else if (weight >= equipment.weights[4]) {
                weight_5 += 1;
                weight -= equipment.weights[4];
                continue;					
            }
            else {
                weight_2half += 1;
                weight -= equipment.weights[5];
                continue;					
            }				
        }

        let result = "";

        if (weight_45 != 0) 
            result += this.printWeightCountSubstring(weight_45, equipment.weights[0].toString());
        if (weight_35 != 0)
            result += this.printWeightCountSubstring(weight_35, equipment.weights[1].toString());
        if (weight_25 != 0)
            result += this.printWeightCountSubstring(weight_25, equipment.weights[2].toString());
        if (weight_10 != 0)
            result += this.printWeightCountSubstring(weight_10, equipment.weights[3].toString());
        if (weight_5 != 0) 
            result += this.printWeightCountSubstring(weight_5, equipment.weights[4].toString());
        if (weight_2half != 0)
            result += this.printWeightCountSubstring(weight_2half, equipment.weights[5].toString());

        let computedTotal = 0;
        computedTotal += weight_45 * 45;
        computedTotal += weight_35 * 35;
        computedTotal += weight_25 * 25;
        computedTotal += weight_10 * 10;
        computedTotal += weight_5 * 5;
        computedTotal += weight_2half * 2.5;
        computedTotal *= 2;
        computedTotal += equipment.barWeight;

        result = computedTotal.toString() + ": " + result;

        return result.trim();

    }

    printWeightCountSubstring(weight, text) {
        if (weight > 1) {
            return weight + "x" + text + " ";
        } else {
            return text + " ";
        }
    }

};

module.exports = Exercise;