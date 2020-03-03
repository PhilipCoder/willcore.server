const assignable = require("willcore.core/assignable/assignable");
const fileServerProxy = require("../proxies/fileServer/fileServerProxy.js");
const serverProxy = require("../proxies/server/serverProxy.js");
const pathHelper = require("../helpers/path.js");
const fileHelper = require("../helpers/fileHelper.js");
const mimeTypes = require("../helpers/mimeTypes.json");
const file = require("path");

class fileServerAssignable extends assignable {
    constructor() {
        super({ string: 1 }, serverProxy);
        this.interceptors = {
            before: [],
            after: []
        };
    }

    completionResult() {
        let proxyResult = fileServerProxy.new(this);
        this.parentProxy._serverAssignable.registerRequestProxy(this.propertyName, proxyResult);

        return proxyResult;
    }

    /**
    * @param {import('../models/requestDetails.js').requestInstance} requestInfo 
    */
    async onRequest(requestInfo, request, response) { //Model to be created here and action called
        let fileExtention = file.extname(requestInfo.fileName);
        let mimeType = mimeTypes[fileExtention];
        if (!mimeType) {
            return { data: JSON.stringify({ error: "Invalid MIME type." }), mime: "application/json", status: 404 };
        }
        let assignablePath = this.bindedValues.string[0];
        let filePath = pathHelper.getFilePath(assignablePath, requestInfo.fileName);

        for (let beforeIndex = 0; beforeIndex < this.interceptors.before.length; beforeIndex++) {
            let interceptorResult = await this.interceptors.before[beforeIndex](filePath, request, response);
            if (interceptorResult) {
                return { data: interceptorResult, mime: model.mimeType, status: model.statusCode };
            }
        }

        if (filePath === false || !(await fileHelper.exists(filePath))) {
            return { data: JSON.stringify({ error: "File not found." }), mime: "application/json", status: 404 };
        }
        return { data: await fileHelper.read(filePath), mime: mimeType, status: 200 };
    }

    completed() {
    }
}

module.exports = fileServerAssignable;