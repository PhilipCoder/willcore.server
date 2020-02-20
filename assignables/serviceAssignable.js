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

class serviceAssignable extends assignable {
    constructor() {
        super({ string: 1 }, serverProxy);
    }

    completionResult() {
        let proxyResult = serviceProxy.new(this);
        return proxyResult;
    }

    completed() {
    }
}

module.exports = serviceAssignable;