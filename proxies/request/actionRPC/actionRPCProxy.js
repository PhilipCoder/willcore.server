const actionRPCProxyHandler = require("./actionRPCProxyHandler.js");
const baseProxy = require("willcore.core/proxies/base/baseProxy.js");

/**
 * Proxy class for the main willCore instance.
 */
class actionRPCProxy extends baseProxy {
    constructor() {
        super();
    }
    /**
     * Factory method.
     * @type {InstanceType<requestProxyHandler>}
     */
    static new(actionRPCAssignable) {
        let result = new Proxy(new actionRPCProxy(), new actionRPCProxyHandler());
        result._actionRPCAssignable = actionRPCAssignable;
        return result;
    }
}

module.exports = actionRPCProxy;