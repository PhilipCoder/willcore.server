const assert = require('chai').assert;
const willCoreProxy = require("willcore.core");
const serverProxy = require("../proxies/server/serverProxy.js");
describe('server-assignable-test', function () {
    before(async function () {
        require('module-alias/register')
    });
    after(function () {
    });
    it('test-proxy', async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 33333;
        assert(coreProxy.testServer, "Server proxy is  not assigned.");
        assert(coreProxy.testServer instanceof serverProxy, "Server proxy is not an instance of the serverProxy.");
    });
});