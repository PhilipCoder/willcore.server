const assert = require('chai').assert;
const actionModelProxy = require("../proxies/request/actionModel/actionModelProxy.js");

describe('action-model-test', function () {
    it('model-test', function () {
        let model = actionModelProxy.new();
        model.valueA = 2;
        model.valueB = { one: 1 };
        assert(model.valueA === 2,"Value not assigned");
        assert(model.valueB.one === 1, "Value not assigned");
        assert(Object.keys(model.stateValues).length === 0,"No recorder state values should exist.");

        model.record();

        model.valueC = 4;
        model.valueD = { two: 2 };

        assert(model.valueC === 4,"Value not assigned");
        assert(model.valueD.two === 2, "Value not assigned");

        assert(Object.keys(model.stateValues).length === 2,"Recorder values are incorrect.");
        assert(model.stateValues.valueC === 4,"Value not assigned");
        assert(model.stateValues.valueD.two === 2, "Value not assigned");

        model.record(false);

        model.valueE = 5;
        model.valueF = { three: 3 };

        assert(model.valueE === 5,"Value not assigned");
        assert(model.valueF.three === 3, "Value not assigned");
        assert(Object.keys(model.stateValues).length === 2,"Recorder values are incorrect.");
    });
});