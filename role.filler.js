const roleUtils = require('role.utils');


const roleFiller = {
    count: 3,
    spawnPriority: 2,

    getBodyParts: function(maxPower) {
        return roleUtils.firstPossibleParts(maxPower, [
            [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
        ]);
    },

    spawnNeeded: function(room) {
        const collectors = _.filter(room.find(FIND_MY_CREEPS), creep => {
            return creep.memory.role === 'collector';
        });

        return collectors.length > 0;
    },

    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            roleUtils.withdrawClosestContainer(creep);
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
            }
        }
    }
}

module.exports = roleFiller;
