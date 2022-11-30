class Cycle {
    id = 0;
    beg5RMs = {};
    sessions = [];

    constructor(cycleId, beg5RMs) {
        this.id = cycleId;
        this.beg5RMs = beg5RMs;
    }

    addSession(session) {
        this.sessions.push(session);
    }
};

module.exports = Cycle;