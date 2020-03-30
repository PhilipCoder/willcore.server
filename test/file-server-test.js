const assert = require('chai').assert;
const willCoreProxy = require("willcore.core");
const serverProxy = require("../proxies/filesServer/filesServerProxy.js");
const requestDetails = require("../models/requestDetails.js").requestDetails;

describe('file-server-test', function () {
    before(async function () {
        require('module-alias/register');
    });
    it('test-proxy', function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8080;
        let server = coreProxy.testServer;
        server.javascript.files = "/mocks";

        assert(server.javascript, "File server proxy is not assigned.");
        assert(server.javascript instanceof serverProxy, "File server is not an instance of the serverProxy.");
    });

    it('test-run-action', async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8080;

        let server = coreProxy.testServer;
        server.javascript.files = "/mocks";

        let requestInfo = new requestDetails();
        requestInfo.url = "/javascript/dummyFile.js";
        let fileResult = await server._assignable.onRequest(requestInfo);
        assert(fileResult.mime === "text/javascript", "File service returned incorrect MIME type.");
        assert(fileResult.status === 200, "File service returned incorrect status code.");
        assert(fileResult.data , "File service did not return a file.");
    });

    it('test-run-action-invalid-file', async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8080;

        let server = coreProxy.testServer;
        server.javascript.files = "/mocks";

        let requestInfo = new requestDetails();
        requestInfo.url = "/javascript/nonExistingFile.js";
        let fileResult = await server._assignable.onRequest(requestInfo);
        assert(fileResult.mime === "application/json", "File service returned incorrect MIME type.");
        assert(fileResult.status === 404, "File service returned incorrect status code.");
        assert(fileResult.data , "File service did not return a file.");
    });
});