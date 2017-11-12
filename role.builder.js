const roleUtils = require('role.utils');


const roleBuilder = {
    count: 2,
    spawnPriority: 2,

    getBodyParts: function(maxPower) {
        if (maxPower >= 300) {
            return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
        }

        return [WORK, CARRY, MOVE];
    },

    spawnNeeded: function(room) {
        return room.find(FIND_CONSTRUCTION_SITES).length !== 0;
    },

    run: function(creep) {
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('🔨 building');
        }

        if (creep.memory.working) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            const closestTarget = creep.pos.findClosestByPath(targets);

            if(targets.length) {
                if(creep.build(closestTarget) === ERR_NOT_IN_RANGE) {
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

module.exports = roleBuilder;
