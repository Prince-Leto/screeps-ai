const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleRepairer = require('role.repairer');
const roleBuilder = require('role.builder');


const creepManager = {
    roles: {
        'harvester': roleHarvester,
        'upgrader': roleUpgrader,
        'repairer': roleRepairer,
        'builder': roleBuilder,
    },

    run: function(room) {
        const creeps = room.find(FIND_MY_CREEPS);

        _.each(creeps, creep => {
            const role = this.roles[creep.memory.role];
            role.run(creep);
        });

        this.buildMissingCreeps(room, creeps);
    },

    buildMissingCreeps: function(room, creeps) {
        let max;
        const priority = {};
        for (const roleName in this.roles) {
            const role = this.roles[roleName];

            if (role.spawnNeeded(room)) {
                const roleCount = _.filter(creeps, creep => creep.memory.role === roleName).length;
                if (roleCount < role.count) {
                    if (priority[role.spawnPriority] === undefined) {
                        priority[role.spawnPriority] = [];

                        if (max === undefined || max < role.spawnPriority) {
                            max = role.spawnPriority;
                        }
                    }
                    priority[role.spawnPriority].push(roleName);
                }
            }
        }

        if (max !== undefined) {
            const roleName = priority[max][0];
            const role = this.roles[roleName];

            const spawns = room.find(FIND_MY_SPAWNS, {
                filter: spawn => {
                    return spawn.spawning === null;
                }
            });

            _.each(spawns, spawn => {
                const bodyParts = role.getBodyParts(room.energyCapacityAvailable);
                this.spawnCreep(spawn, bodyParts, roleName);
            });
        }
    },

    spawnCreep: function(spawn, bodyParts, role) {
        const creepName = spawn.room.name + '-' + role + '-' + Game.time;

        const properties = {
            role: role,
            room: spawn.room.name,
            working: false
        };

        spawn.spawnCreep(bodyParts, creepName, { memory: properties });
    }
}

module.exports = creepManager;
