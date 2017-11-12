const roleUtils = require('role.utils');


const roleRepairer = {
    count: 1,
    spawnPriority: 4,

    getBodyParts: function(maxPower) {
        return roleUtils.firstPossibleParts(maxPower, [
            [WORK, CARRY, MOVE]
        ]);
    },

    spawnNeeded: function(room) {
        return true;
    },

    run: function(creep) {
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('🔨 repairing');
        }

        if (creep.memory.working) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            const closestTarget = creep.pos.findClosestByPath(targets);

            if(targets.length) {
                if(creep.repair(closestTarget) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                }
            } else {
                creep.moveTo(Game.flags['Inactive area']);
            }
        }
        else {
            roleUtils.harvestClosestSource(creep);
        }
    }
}

module.exports = roleRepairer;
