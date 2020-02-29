const requestProxyHandler = require("../request/requestProxyHandler.js");

class fileServerProxyHandler extends requestProxyHandler {
    constructor() {
      super();
    }
  }
  
  module.exports = fileServerProxyHandler;