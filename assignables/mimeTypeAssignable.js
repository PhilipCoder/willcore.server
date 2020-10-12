const assignable = require("willcore.core/assignable/assignable");
const serverProxy = require("../proxies/server/serverProxy.js");
const mimeContainer = require("../helpers/mimeContainer.js");

class mimeTypeAssignable extends assignable {
    constructor() {
        super({string:1}, serverProxy);
    }

    completionResult() {
        mimeContainer[this.propertyName] = this.bindedValues.string[0];
        return undefined;
    }

    completed() {
    }
}

module.exports = mimeTypeAssignable;