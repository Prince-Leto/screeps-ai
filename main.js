var creepManager = require('creep.manager');


module.exports.loop = function() {
    for (const name in Memory.creeps) {
        const creep = Memory.creeps[name];

        if (!Game.creeps[name]) {
            console.log("Clearing non-existing creep memory:", name);
            delete Memory.creeps[name];
        }
    }

    for (const i in Game.rooms) {
        creepManager.run(Game.rooms[i]);
    }
}
