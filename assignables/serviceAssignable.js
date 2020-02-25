/*
Steps: 
1) Base service assignable registers itself on the server assignable.
2) When a request is coming through the server assignable, it calls the onRequest method on the base 
   service assignable that is registered with the first request segment.
3) The inherited assignable will handle its own stuff in the onRequest method if overwritten
*/

const assignable = require("willcore.core/assignable/assignable");
const serverProxy = require("../proxies/server/serverProxy.js");
const serviceProxy = require("../proxies/service/serviceProxy.js");
const moduleLoader = require("../loaders/serviceLoader.js");
const requestProxy = require("../proxies/request/requestProxy.js");

class serviceAssignable extends assignable {
    constructor() {
        super({ string: 1 }, serverProxy);
        this.requests = {};
    }

    registerRequest(name, requestProxyInstance){
        if (!(requestProxyInstance instanceof requestProxy)) throw "Only request proxies can be registered on a service.";
        this.requests[name] = requestProxyInstance;
    }

    completionResult() {
        let proxyResult = serviceProxy.new(this);
        this.parentProxy._serverAssignable.registerRequestProxy(this.propertyName,proxyResult);
        moduleLoader(this.bindedValues.string[0], proxyResult ,this.parentProxy,this.parentProxy._serverAssignable.parentProxy);
        return proxyResult;
    }

    onRequest(requestInfo){

    }

    completed() {
    }
}

module.exports = serviceAssignable;