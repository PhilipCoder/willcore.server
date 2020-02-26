const requestAssignable = require("./requestAssignable.js");
const actionRPCProxy = require("../proxies/request/actionRPC/actionRPCProxy.js");
const actionModel = require("../proxies/request/actionModel/actionModelProxy.js");
const httpVerbs = require("../models/httpVerbs.js");

class actionRPCAssignable extends requestAssignable {
    constructor() {
        super({ function: 1, string: 1 });
        this.interceptors = {
            before: [],
            after: []
        };
    }

    completionResult() {
        this.verb = this.bindedValues["string"][0].toUpperCase();
        if (!httpVerbs[this.verb]) throw `Unsupported HTTP verb ${this.verb}.`;
        let proxyResult = actionRPCProxy.new(this);
        this.parentProxy._serviceAssignable.registerRequest(this.verb, this.propertyName, proxyResult);
        return proxyResult;
    }

    /**
    * @param {import('../models/requestDetails.js').requestInstance} requestInfo 
    */
    async onRequest(requestInfo) { //Model to be created here and action called
        let model = actionModel.new(requestInfo);
        model.record();
        await this.requestFunction(model);
        model.record(false);
        return { data: JSON.stringify(model.stateValues), mime: "application/json", status: 200 };
    }
}

module.exports = actionRPCAssignable;