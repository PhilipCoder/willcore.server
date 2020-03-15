const assert = require('chai').assert;
const willCoreProxy = require("willcore.core");
var selfsigned = require('selfsigned');

describe('server-https-test', function () {
    before(async function () {
        require('module-alias/register');
    });
    it('test-cert', function () {
        var attrs = [{ name: 'commonName', value: 'localhost' }];
        var pems = selfsigned.generate(attrs, { days: 365 });
    });
});