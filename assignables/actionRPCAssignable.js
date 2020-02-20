const requestAssignable = require("./requestAssignable.js");

class actionRPCAssignable extends requestAssignable {
    constructor() {
        super({function:1});
    }
}

module.exports = actionRPCAssignable;