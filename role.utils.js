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
        const costs = {
            [WORK]: 100,
            [CARRY]: 50,
            [MOVE]: 50,
            [ATTACK]: 80,
            [RANGED_ATTACK]: 150,
            [HEAL]: 250,
            [CLAIM]: 600,
            [TOUGH]: 10
        };

        return _.sum(bodyParts, o => costs[o]);
    },

    firstPossibleParts: function(maxPower, bodyPartsArray) {
        return _.find(bodyPartsArray, bodyParts => {
            return maxPower >= this.computeNeededEnergy(bodyParts);
        });
    }
}

module.exports = roleUtils;
