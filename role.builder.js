const roleUtils = require('role.utils');


const roleBuilder = {
    count: 3,
    spawnPriority: 3,

    getBodyParts: function(maxPower) {
        return roleUtils.firstPossibleParts(maxPower, [
            [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            [WORK, CARRY, MOVE]
        ]);
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
