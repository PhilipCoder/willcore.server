const assert = require('chai').assert;
const willCoreProxy = require("willcore.core");
const actionRPCProxy = require("../proxies/request/actionRPC/actionRPCProxy.js");
const serviceProxy = require("../proxies/service/serviceProxy.js");


describe('service-assignable-test', function () {
    before(async function () {
        require('module-alias/register');
    });
    after(function () {
    });
    it('test-proxy', async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 33333;
        
        let server = coreProxy.testServer;
        server.myService.service = "/test/mocks/serviceRPCMock.js";

         assert(coreProxy.testServer.myService._serviceAssignable.requests.getData, "Action proxy is not assigned.");
         assert(coreProxy.testServer.myService._serviceAssignable.requests.getData instanceof actionRPCProxy, "Action proxy is not an instance of the actionRPCProxy.");
    });
});