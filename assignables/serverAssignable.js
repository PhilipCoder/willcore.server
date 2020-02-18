const assignable = require("willcore.core/assignable/assignable");
const willCoreProxy = require("willcore.core");
const serverProxy = require("../proxies/server/serverProxy.js");

class serverAssignable extends assignable {
    constructor() {
        super({ number: 1 }, willCoreProxy);
        this.serverInfo = {
            port: 3003,
            name: ""
        };
        this.requestProxies = {};
    }

    registerRequestProxy(activationSegment, requestProxy){
        this.requestProxies[activationSegment] = requestProxy;
    }

    completionResult() {
        let proxyResult = serverProxy.new(this);
        return proxyResult;
    }

    completed() {
        this.serverInfo.name = this.propertyName;
        this.serverInfo.port = this.bindedValues.number[0];
    }
}

module.exports = serverAssignable;