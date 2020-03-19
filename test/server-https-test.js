const assert = require('chai').assert;
const sslHelper = require("../helpers/sslHelper.js");

describe('server-https-test', function () {
    before(async function () {
        require('module-alias/register');
    });
    it('test-cert',async function () {
       let certificates = await sslHelper.generateCertificate();

    });
});