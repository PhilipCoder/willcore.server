const assignable = require("willcore.core/assignable/assignable");
const requestAssignable = require("../proxies/request/requestProxy.js");

class maxAgeCacheAssignable extends assignable {
    constructor() {
        super({}, requestAssignable);
    }

    completionResult() {
        let intercept = (data, request, response) => {
            response.setHeader('cache-control', `max-age=${this.propertyName}, public`);
            return true;
        };
        this.parentProxy._assignable.interceptors.after.push(intercept);
        return false;
    }

    completed() {
    }
}

module.exports = maxAgeCacheAssignable;