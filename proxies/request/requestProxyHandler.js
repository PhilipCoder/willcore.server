const baseProxyHandler = require("willcore.core/proxies/base/assignableProxyHandler.js");

class requestProxyHandler extends baseProxyHandler {
    constructor() {
      super();
    }
  }
  
  module.exports = requestProxyHandler;