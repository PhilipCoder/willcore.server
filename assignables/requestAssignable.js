const assignable = require("willcore.core/assignable/assignable");
const serverProxy = require("../proxies/server/serverProxy.js");

class requestAssignable extends assignable {
    constructor(bindingConstraints) {
        super(bindingConstraints, serverProxy);
    }
}

module.exports = requestAssignable;