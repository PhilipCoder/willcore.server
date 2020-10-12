const assignable = require("willcore.core/assignable/assignable");
const requestAssignable = require("../proxies/request/requestProxy.js");
const etag = require('etag')

class etagCacheAssignable extends assignable {
    constructor() {
        super({}, requestAssignable);
    }

    static get noValues() {
        return requestAssignable;
    }

    completionResult() {
        this.parentProxy._assignable.interceptors.after.push(this.intercept);
        return false;
    }

    completed() {
    }

    intercept(data, request, response) {
        let dataEtag = etag(data);
        let requestEtag = request.headers["if-none-match"];
        response.setHeader('ETag', dataEtag);
        if (requestEtag !== dataEtag) {
            return true;
        }else{
            response.statusCode = 304;
            return false;
        }
    }
}

module.exports = etagCacheAssignable;