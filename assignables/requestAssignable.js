const assignable = require("willcore.core/assignable/assignable");
const serviceProxy = require("../proxies/service/serviceProxy.js");
const requestProxy = require("../proxies/request/requestProxy.js");

class requestAssignable extends assignable {
    constructor(bindingConstraints) {
        super(bindingConstraints, serviceProxy);
    }
    completed() {
    }
   
}

module.exports = requestAssignable;