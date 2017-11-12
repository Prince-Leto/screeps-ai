const roleUtils = require('role.utils');


const roleUpgrader = {
    count: 7,
    spawnPriority: 0,

    getBodyParts: function(maxPower) {
        if (maxPower >= 300) {
            return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
        }

        return [WORK, CARRY, MOVE];
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
            creep.say('⚡ upgrade');
        }

        if (creep.memory.working) {
            if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                creep.say('I have nothing to do here!');
            }
        }
        else {
            roleUtils.harvestClosestSource(creep);
        }
    }
}

module.exports = roleUpgrader;
