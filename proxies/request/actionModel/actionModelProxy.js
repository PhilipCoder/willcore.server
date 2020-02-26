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
    static new(sourceObj) {
        let proxy = new actionModelProxy();
        if (sourceObj) {
            Object.keys(sourceObj).filter(k => !k.startsWith("_")).forEach(key => {
                proxy[key] = sourceObj[key];
            });
        }
        let result = new Proxy(proxy, new actionModelProxyHandler());
        return result;
    }
}

module.exports = actionModelProxy;