const baseProxyHandler = require("willcore.core/proxies/base/assignableProxyHandler.js");
const serviceProxy = require("../service/serviceProxy.js");

class serverProxyHandler extends baseProxyHandler {
  constructor() {
    super();
    this.setTraps.unshift(this.assignService);
    this.getTraps.unshift(this.stopService);
  }

  assignService(target, property, value, proxy) {
    if (value instanceof serviceProxy) {
      proxy._serverAssignable.registerRequestProxy(property, value);
      return { value: value, status: true };
    }
    return { value: false, status: false };
  }

  stopService(target, property, proxy) {
    if (property === "stop") {
      return { value: ()=>{
        proxy._serverAssignable.server.close();
      }, status: true };
    }
    return {status: false };
  }

}

module.exports = serverProxyHandler;