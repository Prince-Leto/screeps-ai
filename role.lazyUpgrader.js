const roleUtils = require('role.utils');


const roleLazyUpgrader = {
    count: 5,
    spawnPriority: 1,

    getBodyParts: function(maxPower) {
        return roleUtils.firstPossibleParts(maxPower, [
            [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        ]);
    },

    spawnNeeded: function(room) {
        const collectors = _.filter(room.find(FIND_MY_CREEPS), creep => {
            return creep.memory.role === 'collector';
        });

        return collectors.length > 0;
    },

    run: function(creep) {
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
            creep.say('🔄 refill');
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
            roleUtils.withdrawClosestContainer(creep);
        }
    }
}

module.exports = roleLazyUpgrader;
