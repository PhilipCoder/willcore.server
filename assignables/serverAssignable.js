/*
Steps: 
1) Base service assignable registers itself on the server assignable.
2) When a request is coming through the server assignable, it calls the onRequest method on the base service assignable that is registered with the first request segment.
3) The inherited assignable will handle its own stuff in the onRequest method if overwritten
*/

const assignable = require("willcore.core/assignable/assignable");
const willCoreProxy = require("willcore.core");
const serverProxy = require("../proxies/server/serverProxy.js");
const serviceProxy = require("../proxies/service/serviceProxy.js");

class serverAssignable extends assignable {
    constructor() {
        super({ number: 1 }, willCoreProxy);
        this.serverInfo = {
            port: 3003,
            name: ""
        };
        this.requestProxies = {};
    }

    /**
     * @param {import('../models/requestDetails.js').requestInstance} requestInfo 
     */
    onRequest(requestInfo){
        this.requestProxies[requestInfo.actionPart]._assignable.onRequest(requestInfo);
    }

    registerRequestProxy(activationSegment, requestProxy){
        if (!(requestProxy instanceof serviceProxy)) throw "Only service proxies can be registered on a server.";
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