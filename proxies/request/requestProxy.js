const requestProxyHandler = require("./requestProxyHandler.js");
const baseProxy = require("willcore.core/proxies/base/baseProxy.js");

/**
 * Proxy class for the main willCore instance.
 */
class requestProxy extends baseProxy {
    constructor() {
        super();
    }
    // /**
    //  * Factory method.
    //  * @type {InstanceType<requestProxyHandler>}
    //  */
    // static new(requestAssignable) {
    //     let result = new Proxy(new requestProxy(), new requestProxyHandler());
    //     result._requestAssignable = requestAssignable;
    //     return result;
    // }
}

module.exports = requestProxy;