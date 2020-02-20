const actionRPCHandler = require("./actionRPCHandler.js");
const serviceProxy = require("../serviceProxy.js");

/**
 * Proxy class for the main willCore instance.
 */
class actionRPCProxy extends serviceProxy {
    constructor() {
        super();
    }
    /**
     * Factory method.
     * @type {InstanceType<serverProxyHandler>}
     */
    static new(actionRPCAssignable) {
        let result = new Proxy(new actionRPCProxy(), new actionRPCHandler());
        result._actionRPCAssignable = actionRPCAssignable;
        return result;
    }
}

module.exports = actionRPCProxy;