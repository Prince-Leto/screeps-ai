var roleUtils = {
    harvestClosestSource: function(creep) {
        const closestSource = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES_ACTIVE));
        if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSource);
        }
    }
}

module.exports = roleUtils;
