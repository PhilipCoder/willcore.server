const baseProxyHandler = require("willcore.core/proxies/base/assignableProxyHandler.js");

class serverProxyHandler extends baseProxyHandler {
    constructor() {
      super();
    }

    assignRequest(target, property, proxy){
        
    }

  }
  
  module.exports = serverProxyHandler;