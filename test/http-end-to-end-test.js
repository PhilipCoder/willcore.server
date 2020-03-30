const assert = require('chai').assert;
const actionModelProxy = require("../proxies/request/actionModel/actionModelProxy.js");
const willCoreProxy = require("willcore.core");
const axios = require('axios');

describe('http-end-to-end-test', function () {
    let coreProxy = null;
    before(async function () {
        require('module-alias/register');
    });
    afterEach(function(){
        coreProxy.testServer.stop();
    });
    it('getDataRPC-get-test',async function () {
        coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8580;
        coreProxy.testServer.http;
        coreProxy.testServer.demoService.service = "/test/mocks/getdataRPCAction.js";

        let result = await axios.get('http://localhost:8580/demoService/getData?resultCount=12&value=JohnDoe');
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 12, "Result should have 12 items.");
        coreProxy.testServer.stop();
    });
    it('getDataRPC-post-test',async function () {
        coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8580;
        coreProxy.testServer.http;
        coreProxy.testServer.demoService.service = "/test/mocks/getdataRPCAction.js";

        let result = await axios.post('http://localhost:8580/demoService/postData', {'resultCount':12,value:"JohannDoe"} );
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 24, "Result should have 12 items.");
        coreProxy.testServer.stop();
    });

    it('getFiles',async function () {
        coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8580;
        coreProxy.testServer.http;
        let server = coreProxy.testServer;
        server.javascript.files = "/test/mocks";
        let result = await axios.get('http://localhost:8580/javascript/dummyFile.js');
        assert(result.data === "//hello world", "Wrong file data returned");
        coreProxy.testServer.stop();
    });
    it('getDataRPC-alias-test',async function () {
        coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8580;
        coreProxy.testServer.http;
        coreProxy.testServer.demoService.service = "/test/mocks/getPostDataRPCAction.js";

        let result = await axios.get('http://localhost:8580/demoService/data?resultCount=12&value=JohnDoe');
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 12, "Result should have 12 items.");
        let resultPost = await axios.post('http://localhost:8580/demoService/data', {'resultCount':12,value:"JohannDoe"} );
        resultPost = resultPost.data.result;
        assert(Array.isArray(resultPost), "Result should be array.");
        assert(resultPost.length === 24, "Result should have 12 items.");
         coreProxy.testServer.stop();
    });
    it('getDataREST-alias-test',async function () {
        coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8580;
        coreProxy.testServer.http;
        coreProxy.testServer.demoService.service = "/test/mocks/getdataRestAction.js";

        let result = await axios.get('http://localhost:8580/demoService/getData/JohnDoe/10');
        result = result.data.result;
        assert(Array.isArray(result), "Result should be array.");
        assert(result.length === 10, "Result should have 12 items.");
         coreProxy.testServer.stop();
    });
    it('getFileHome',async function () {
        coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8580;
        coreProxy.testServer.http;
        let server = coreProxy.testServer;
        server.homePage.file["/"] = "/test/mocks/index.html";
        let result = await axios.get('http://localhost:8580/');
        assert(result.data === "<h1>Hello world</h1>", "Wrong file data returned");
        coreProxy.testServer.stop();
    });
});