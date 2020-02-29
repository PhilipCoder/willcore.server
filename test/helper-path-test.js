const assert = require('chai').assert;
const pathHelper = require("../helpers/path.js");

describe('helper-path-test', function () {
    it('path-relativePath', function () {
        let pathA = pathHelper.getRelativePath(__dirname,"/test/mocks/serviceMock.js");
        let pathB = pathHelper.getRelativePath(__dirname,"/one/mocks/serviceMock.js");

        assert(pathA === ".\\mocks\\serviceMock.js","Incorrect relative path calculated");
        assert(pathB === "..\\one\\mocks\\serviceMock.js","Incorrect relative path calculated");

    });

    it('path-getFilePath', function () {
        let directory = pathHelper.getFilePath("/scripts","/bootstrap/scripts/bootstrap.js")
        assert(directory !== false);
        let directoryB = pathHelper.getFilePath("/scripts","/../../bootstrap/scripts/bootstrap.js")
        assert(directoryB === false);

    });
});