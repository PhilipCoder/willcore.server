const baseProxyHandler = require("willcore.core/proxies/base/assignableProxyHandler.js");

class requestInterceptorProxyHandler extends baseProxyHandler {
    constructor() {
      super();
    }
  }
  
  module.exports = requestInterceptorProxyHandler;