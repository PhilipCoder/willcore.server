const assert = require('chai').assert;
const pathHelper = require("../helpers/path.js");

describe('helper-path-test', function () {
    it('path-relativePath', function () {
        let pathHelperInstance = new pathHelper(__dirname);
        let pathA = pathHelperInstance.getRelativePath(__dirname,"/mocks/serviceMock.js");
        let pathB = pathHelperInstance.getRelativePath(__dirname,"/one/mocks/serviceMock.js");

        assert(pathA === ".\\mocks\\serviceMock.js","Incorrect relative path calculated");
        assert(pathB === ".\\one\\mocks\\serviceMock.js","Incorrect relative path calculated");

    });

    it('path-getFilePath', function () {
        let pathHelperInstance = new pathHelper(__dirname);
        let directory = pathHelperInstance.getFilePath("/scripts","/bootstrap/scripts/bootstrap.js")
        assert(directory !== false);
        let directoryB = pathHelperInstance.getFilePath("/scripts","/../../bootstrap/scripts/bootstrap.js")
        assert(directoryB === false);

    });
});