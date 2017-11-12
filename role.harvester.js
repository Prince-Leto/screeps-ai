const roleUtils = require('role.utils');


const roleHarvester = {
    count: 3,
    spawnPriority: 15,

    getBodyParts: function(maxPower) {
        return roleUtils.firstPossibleParts(maxPower, [
            [WORK, WORK, CARRY, MOVE, MOVE],
            [WORK, CARRY, MOVE]
        ]);
    },

    spawnNeeded: function(room) {
        return true;
    },

    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            roleUtils.harvestClosestSource(creep);
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length) {
                const closestTarget = creep.pos.findClosestByPath(targets);
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                }
            } else {
                creep.moveTo(Game.flags['Inactive area']);
            }
        }
    }
}

module.exports = roleHarvester;
