const requestAssignable = require("./requestAssignable.js");
const actionRPCProxy = require("../proxies/request/actionRPC/actionRPCProxy.js");

class actionRPCAssignable extends requestAssignable {
    constructor() {
        super({function:1, string:1});
    }

    completionResult() {
        let proxyResult = actionRPCProxy.new(this);
        this.parentProxy._serviceAssignable.registerRequest(this.propertyName,proxyResult);
        return proxyResult;
    }
}

module.exports = actionRPCAssignable;