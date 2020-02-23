const pathHelper = require("../helpers/path.js");

module.exports = function (pathURL, service, server, willcore) {
    let relativePath = pathHelper.getRelativePath(__dirname, pathURL);
    require(relativePath)(service, server, willcore);
};