const assert = require('chai').assert;
const actionModelProxy = require("../proxies/request/actionModel/actionModelProxy.js");
const willCoreProxy = require("willcore.core");
const axios = require('axios');

describe('https-end-to-end-test', function () {
    before(async function () {
        require('module-alias/register');
    });
    it('getDataRPC-get-test',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        await coreProxy.testServer.https;
        coreProxy.testServer.demoService.service = "/test/mocks/getdataRPCAction.js";

        let result = await axios.get('https://localhost:8580/demoService/getData?resultCount=12&value=JohnDoe');
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 12, "Result should have 12 items.");
        coreProxy.testServer.stop();
    });
    it('getDataRPC-post-test',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        await coreProxy.testServer.https;
        coreProxy.testServer.demoService.service = "/test/mocks/getdataRPCAction.js";

        let result = await axios.post('https://localhost:8580/demoService/postData', {'resultCount':12,value:"JohannDoe"} );
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 24, "Result should have 12 items.");
        coreProxy.testServer.stop();
    });

    it('getFile',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        await coreProxy.testServer.https;
        let server = coreProxy.testServer;
        server.javascript.files = "/test/mocks";
        let result = await axios.get('https://localhost:8580/javascript/dummyFile.js');
        assert(result.data === "//hello world", "Wrong file data returned");
        coreProxy.testServer.stop();
    });
    it('getDataRPC-alias-test',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        await coreProxy.testServer.https;
        coreProxy.testServer.demoService.service = "/test/mocks/getPostDataRPCAction.js";

        let result = await axios.get('https://localhost:8580/demoService/data?resultCount=12&value=JohnDoe');
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 12, "Result should have 12 items.");
        let resultPost = await axios.post('https://localhost:8580/demoService/data', {'resultCount':12,value:"JohannDoe"} );
        resultPost = resultPost.data.result;
        assert(Array.isArray(resultPost), "Result should be array.");
        assert(resultPost.length === 24, "Result should have 12 items.");
         coreProxy.testServer.stop();
    });
});