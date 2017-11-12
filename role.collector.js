const roleUtils = require('role.utils');


const roleCollector = {
    count: 1,
    spawnPriority: 10,

    getBodyParts: function(maxPower) {
        return roleUtils.firstPossibleParts(maxPower, [
            [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        ]);
    },

    spawnNeeded: function(room) {
        const containers = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_CONTAINER;
            }
        });

        return room.energyCapacityAvailable >= 600 && containers.length > 0;
    },

    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            roleUtils.harvestClosestSource(creep);
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_CONTAINER;
                }
            });
            if (targets.length) {
                const closestTarget = creep.pos.findClosestByPath(targets);
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                }
            }
        }
    }
}

module.exports = roleCollector;
