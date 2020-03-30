const assert = require('chai').assert;
const willCoreProxy = require("willcore.core");
const serverProxy = require("../proxies/server/serverProxy.js");
const serviceProxy = require("../proxies/service/serviceProxy.js");


describe('server-assignable-test', function () {
    before(async function () {
        require('module-alias/register');
    });
    after(function () {
    });
    it('test-proxy', async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8080;

        assert(coreProxy.testServer, "Server proxy is  not assigned.");
        assert(coreProxy.testServer instanceof serverProxy, "Server proxy is not an instance of the serverProxy.");
    });

    it('test-service', async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8080;
        
        let server = coreProxy.testServer;
        server.myService.service = "/test/mocks/serviceMock.js";

        assert(coreProxy.testServer.myService, "Service proxy is  not assigned.");
        assert(coreProxy.testServer.myService instanceof serviceProxy, "Server proxy is not an instance of the serverProxy.");
    });

    
    it('test-service-registration', async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server[__dirname] = 8080;
        
        let server = coreProxy.testServer;
        server.myService.service = "/test/mocks/serviceMock.js";

        assert(coreProxy.testServer._assignable.requestProxies.myService, "Service proxy is  not assigned.");
        assert(coreProxy.testServer._assignable.requestProxies.myService instanceof serviceProxy, "Server proxy is not an instance of the serverProxy.");
    });
});