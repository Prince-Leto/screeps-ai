var roleUtils = {
    harvestClosestSource: function(creep) {
        const closestSource = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES_ACTIVE));
        if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSource);
        }
    },

    withdrawClosestContainer: function(creep) {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_CONTAINER;
            }
        });
        if (targets.length) {
            const closestTarget = creep.pos.findClosestByPath(targets);
            if(creep.withdraw(closestTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestTarget);
            }
        }
    },

    computeNeededEnergy: function(bodyParts) {
        // FROM: http://docs.screeps.com/api/#Creep
        const costs = {};
        costs[WORK] = 100;
        costs[CARRY] = 50;
        costs[MOVE] = 50;
        costs[ATTACK] = 80;
        costs[RANGED_ATTACK] = 150;
        costs[HEAL] = 250;
        costs[CLAIM] = 600;
        costs[TOUGH] = 10;

        _.sum(bodyParts, o => costs[o]);
    },

    firstPossibleParts: function(maxPower, bodyPartsArray) {
        return _.find(bodyPartsArray, bodyParts => {
            return maxPower >= this.computeNeededEnergy(bodyParts);
        });
    }
}

module.exports = roleUtils;
