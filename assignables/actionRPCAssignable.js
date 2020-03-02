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
        this.parentProxy._assignable.registerRequest(this.verb, this.propertyName, proxyResult);
        return proxyResult;
    }

    /**
    * @param {import('../models/requestDetails.js').requestInstance} requestInfo 
    */
    async onRequest(requestInfo, request) {
        let model = actionModel.new(requestInfo);
        model.record();
        for (let beforeIndex = 0; beforeIndex < this.interceptors.before.length; beforeIndex++) {
            let interceptorResult = await this.interceptors.before[beforeIndex](model, request);
            if (!interceptorResult) {
                return { data: JSON.stringify(model.stateValues), mime: "application/json", status: model.statusCode };
            }
        }

        await this.requestFunction(model);

        for (let afterIndex = 0; afterIndex < this.interceptors.after.length; afterIndex++) {
            let interceptorResult = await this.interceptors.after[afterIndex](model);
            if (!interceptorResult) {
                return { data: JSON.stringify(model.stateValues), mime: "application/json", status: model.statusCode };
            }
        }
        model.record(false);

        return { data: JSON.stringify(model.stateValues), mime: "application/json", status: 200 };
    }
}

module.exports = actionRPCAssignable;