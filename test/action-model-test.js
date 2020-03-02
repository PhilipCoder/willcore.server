const assert = require('chai').assert;
const actionModelProxy = require("../proxies/request/actionModel/actionModelProxy.js");
const willCoreProxy = require("willcore.core");
const axios = require('axios');

describe('models-test', function () {
    before(async function () {
        require('module-alias/register');
    });
    it('action-model-test', function () {
        let model = actionModelProxy.new();
        model.valueA = 2;
        model.valueB = { one: 1 };
        assert(model.valueA === 2, "Value not assigned");
        assert(model.valueB.one === 1, "Value not assigned");
        assert(Object.keys(model.stateValues).length === 0, "No recorder state values should exist.");

        model.record();

        model.valueC = 4;
        model.valueD = { two: 2 };

        assert(model.valueC === 4, "Value not assigned");
        assert(model.valueD.two === 2, "Value not assigned");

        assert(Object.keys(model.stateValues).length === 2, "Recorder values are incorrect.");
        assert(model.stateValues.valueC === 4, "Value not assigned");
        assert(model.stateValues.valueD.two === 2, "Value not assigned");

        model.record(false);

        model.valueE = 5;
        model.valueF = { three: 3 };

        assert(model.valueE === 5, "Value not assigned");
        assert(model.valueF.three === 3, "Value not assigned");
        assert(Object.keys(model.stateValues).length === 2, "Recorder values are incorrect.");
    });

    it('requestInfo-model-parameter-test',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        coreProxy.testServer._serverAssignable.onRequest = async function (requestInfo) {
            coreProxy.testServer.stop();
            assert(requestInfo.parameters.id === 12, "Incorrect paramter value");
            assert(requestInfo.parameters.name === 'philip', "Incorrect paramter value");
            assert(requestInfo.parameters.age === 192, "Incorrect paramter value");
        }
        await axios.get('http://localhost:8580/demoService/getData?id=12&name=philip&age=192');
    });

    it('requestInfo-model-body-test',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        let body = { mydata: "helo world" };
        coreProxy.testServer._serverAssignable.onRequest = function (requestInfo) {
            coreProxy.testServer.stop();
            assert(JSON.stringify(requestInfo.body) === JSON.stringify(body), "Incorrect body value");
        }
        await axios.post('http://localhost:8580/demoService/getData', body);
    });
    it('requestInfo-model-token-test',async function () {
        let coreProxy = willCoreProxy.new();
        coreProxy.testServer.server = 8580;
        let body = { mydata: "helo world" };
        coreProxy.testServer._serverAssignable.onRequest = function (requestInfo) {
            coreProxy.testServer.stop();
            assert(requestInfo.headers['testheader'] === 'foobar', "Incorrect body value");
        }
        await axios.post('http://localhost:8580/demoService/getData', body,{  headers: {'testheader': 'foobar'}});
    });
});