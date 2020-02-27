const assignable = require("willcore.core/assignable/assignable");
const requestInterceptorProxy = require("../proxies/request/requestInterceptor/requestInterceptorProxy.js");
const requestAssignable = require("../proxies/request/requestProxy.js");
class requestInterceptorAssignable extends assignable {
    constructor() {
        super({ function: 1, string: 1 },requestAssignable);
        this.interceptors = {
            before: (proxy)=>{
                this.parentProxy._assignable.interceptors.before.push(proxy);
            },
            after: (proxy)=>{
                this.parentProxy._assignable.interceptors.after.push(proxy);
            }
        };
    }

    completionResult() {
        this.position = this.bindedValues["string"][0].toLowerCase();
        if (!interceptors[this.position]) throw `Unsupported interceptor: ${this.position}. Should be either 'before' or 'after'`;
        let proxyResult = requestInterceptorProxy.new(this);
        this.interceptors[this.position](proxyResult);
        return proxyResult;
    }
    
    completed() {
        this.serverInfo.name = this.propertyName;
        this.serverInfo.port = this.bindedValues.number[0];
    }
}

module.exports = requestInterceptorAssignable;