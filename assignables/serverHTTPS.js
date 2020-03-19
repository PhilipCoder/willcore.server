const assignable = require("willcore.core/assignable/assignable");
const https = require('https');
const requestDetails = require("../models/requestDetails.js").requestDetails;
const serverProxy = require("../proxies/server/serverProxy.js");
const sslHelper = require("../helpers/sslHelper.js");
const fileHelper = require("../helpers/fileHelper.js");

class serverHTTPS extends assignable {
    constructor() {
        super({}, serverProxy);
    }

    static get noValues() {
        return serverProxy;
    }

    initServer(serverAssignableInstance) {
        return new Promise(async (resolve, reject) => {
            this.serverRequestEntry = async function (request, response) {
                let requestInfo = await requestDetails.fromRequest(request);
                let requestResult = await serverAssignableInstance.onRequest(requestInfo, request, response);
                if (!requestResult) {
                    response.writeHead("200");
                    response.end("Bad Request");
                } else if (!request.ended) {
                    response.writeHead(requestResult.status, { 'Content-Type': requestResult.mime });
                    response.end(requestResult.data);
                }
            }
            let certificates = await sslHelper.generateCertificate();
            const options = {
                key: await fileHelper.readFile(certificates.keyPath),
                cert: await fileHelper.readFile(certificates.certPath)
            };
            let server = https.createServer(options, this.serverRequestEntry).listen(serverAssignableInstance.serverInfo.port)
            resolve(server);
        });
    }

    completionResult() {
        this.parentProxy._assignable.server = this.initServer(this.parentProxy._assignable).then((server)=>{
            return this.parentProxy._assignable.server = server;
        });
        return this.parentProxy._assignable.server;
    }

    completed() {

    }
}

module.exports = serverHTTPS;