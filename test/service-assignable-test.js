const assert = require('chai').assert;
const willCoreProxy = require("willcore.core");
const actionRPCProxy = require("../proxies/request/actionRPC/actionRPCProxy.js");
const serviceProxy = require("../proxies/service/serviceProxy.js");
const requestDetails = require("../models/requestDetails.js").requestDetails;

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

        assert(coreProxy.testServer.myService._serviceAssignable.requests.GET.getData, "Action proxy is not assigned.");
        assert(coreProxy.testServer.myService._serviceAssignable.requests.GET.getData instanceof actionRPCProxy, "Action proxy is not an instance of the actionRPCProxy.");
    });
    it('test-run-action', async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 33333;

        let server = coreProxy.testServer;
        server.myService.service = "/test/mocks/serviceMockTestCalled.js";

        assert(coreProxy.testServer.myService._serviceAssignable.requests.GET.getData, "Action proxy is not assigned.");
        assert(coreProxy.testServer.myService._serviceAssignable.requests.GET.getData instanceof actionRPCProxy, "Action proxy is not an instance of the actionRPCProxy.");
        assert(!coreProxy.testServer.myService._serviceAssignable.requests.GET.getData._assignable.testCalled, "Action was called, it should not have been.");

        let requestInfo = new requestDetails();
        requestInfo.url = "/myService/getData";
        requestInfo.method = "GET";
        await server._serverAssignable.onRequest(requestInfo);
        assert(coreProxy.testServer.myService._serviceAssignable.requests.GET.getData._assignable.testCalled, "Action was not called, it should have been.");
    });
    it('test-run-action-block-interceptor', async function () {//should not pass 
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 33333;

        let server = coreProxy.testServer;
        server.myService.service = "/test/mocks/interceptorBeforeBlockMock.js";

        assert(coreProxy.testServer.myService._serviceAssignable.requests.GET.getData, "Action proxy is not assigned.");
        assert(coreProxy.testServer.myService._serviceAssignable.requests.GET.getData instanceof actionRPCProxy, "Action proxy is not an instance of the actionRPCProxy.");
        assert(!coreProxy.testServer.myService._serviceAssignable.requests.GET.getData._assignable.testCalled, "Action was called, it should not have been.");

        let requestInfo = new requestDetails();
        requestInfo.url = "/myService/getData";
        requestInfo.method = "GET";
        let result = await server._serverAssignable.onRequest(requestInfo);
        assert(!coreProxy.testServer.myService._serviceAssignable.requests.GET.getData._assignable.testCalled, "Action was called, it should not have been.");
        assert(coreProxy.testServer.myService._serviceAssignable.requests.GET.getData._assignable.testBlocked, "Interceptor was not called.");
        assert(result.data === "{\"statusCode\":501,\"error\":\"Unauthorized\"}", "Interceptor was not called.");
        assert(result.status === 501);
    });
});