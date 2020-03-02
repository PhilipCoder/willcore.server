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

        await axios.get('http://localhost:8580/demoService/getData?resultCount=12&value=JohnDoe');
    });
});