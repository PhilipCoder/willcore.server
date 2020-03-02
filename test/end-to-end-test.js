const assert = require('chai').assert;
const actionModelProxy = require("../proxies/request/actionModel/actionModelProxy.js");
const willCoreProxy = require("willcore.core");
const axios = require('axios');

describe('end-to-end-test', function () {
    before(async function () {
        require('module-alias/register');
    });
    it('getDataRPC-get-test',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        coreProxy.testServer.demoService.service = "/test/mocks/getdataRPCAction.js";

        let result = await axios.get('http://localhost:8580/demoService/getData?resultCount=12&value=JohnDoe');
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 12, "Result should have 12 items.");
        coreProxy.testServer.stop();
    });
    it('getDataRPC-post-test',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        coreProxy.testServer.demoService.service = "/test/mocks/getdataRPCAction.js";

        let result = await axios.post('http://localhost:8580/demoService/postData', {'resultCount':12,value:"JohannDoe"} );
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 24, "Result should have 12 items.");
        coreProxy.testServer.stop();
    });

    it('getFile',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;

        let server = coreProxy.testServer;
        server.javascript.files = "/test/mocks";
        let result = await axios.get('http://localhost:8580/javascript/dummyFile.js');
        assert(result.data === "//hello world", "Wrong file data returned");
        coreProxy.testServer.stop();
    });
});