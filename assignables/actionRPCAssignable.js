const requestAssignable = require("./requestAssignable.js");
const actionRPCProxy = require("../proxies/request/actionRPC/actionRPCProxy.js");
const actionModel = require("../proxies/request/actionModel/actionModelProxy.js");

class actionRPCAssignable extends requestAssignable {
    constructor() {
        super({function:1, string:1});
    }

    completionResult() {
        let proxyResult = actionRPCProxy.new(this);
        this.parentProxy._serviceAssignable.registerRequest(this.propertyName,proxyResult);
        return proxyResult;
    }
    
     /**
     * @param {import('../models/requestDetails.js').requestInstance} requestInfo 
     */
    onRequest(requestInfo){ //Model to be created here and action called
        let model = actionModel.new();
        this.requestFunction(model
            );
        return {};
    }
}

module.exports = actionRPCAssignable;