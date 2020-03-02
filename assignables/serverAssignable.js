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
const fileServerProxy = require("../proxies/fileServer/fileServerProxy.js");
const http = require('http');
const requestDetails = require("../models/requestDetails.js").requestDetails;

class serverAssignable extends assignable {
    constructor() {
        super({ number: 1 }, willCoreProxy);
        this.serverInfo = {
            port: 3003,
            name: ""
        };
        this.server = null;
        this.requestProxies = {};
    }

    /**
     * @param {requestDetails} requestInfo 
     */
    async onRequest(requestInfo){
        let requestProxy = this.requestProxies[requestInfo.servicePart];
        if (!requestProxy){
            return { data: JSON.stringify({error:"Endpoint not found"}), mime: "application/json", status: 404 };
        }
        let requestResult = await requestProxy._assignable.onRequest(requestInfo);
        return requestResult;
    }

    registerRequestProxy(activationSegment, requestProxy){
        if (!(requestProxy instanceof serviceProxy || requestProxy instanceof fileServerProxy)) throw "Only service proxies can be registered on a server.";
        this.requestProxies[activationSegment] = requestProxy;
    }

    completionResult() {
        let that = this;
        this.serverRequestEntry = async function(request, response){
            let requestInfo = await requestDetails.fromRequest(request);
            let requestResult = await that.onRequest(requestInfo,request);
            if (!requestResult){
                response.writeHead("200");
                response.end("Bad Request");
            }else{
                response.writeHead(requestResult.status, { 'Content-Type': requestResult.mime });
                response.end(requestResult.data);
            }
        }
        this.server = http.createServer(this.serverRequestEntry).listen(this.serverInfo.port);
        let proxyResult = serverProxy.new(this);
        return proxyResult;
    }

    completed() {
        this.serverInfo.name = this.propertyName;
        this.serverInfo.port = this.bindedValues.number[0];
    }
}

module.exports = serverAssignable;