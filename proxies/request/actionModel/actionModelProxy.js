const actionModelProxyHandler = require("./actionModelProxyHandler.js");
const baseProxy = require("willcore.core/proxies/base/baseProxy.js");

/**
 * Proxy class for the main willCore instance.
 */
class actionModelProxy extends baseProxy {
    constructor() {
        super();
    }
    /**
     * Factory method.
     * @type {InstanceType<requestProxyHandler>}
     */
    static new(actionRPCAssignable) {
        let result = new Proxy(new actionModelProxy(), new actionModelProxyHandler());
        result._assignable = actionRPCAssignable;
        return result;
    }
}

module.exports = actionModelProxy;