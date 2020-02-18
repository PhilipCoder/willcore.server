const willCoreModules = require("../proxies/moduleContainment/moduleProxyHandler.js");

let willCoreModuleInstance = willCoreModules.new();
willCoreModuleInstance.assignables = willCoreModules.new();

willCoreModuleInstance._reset = ()=>{
    willCoreModuleInstance.assignables = willCoreModules.new();
};

module.exports = willCoreModuleInstance;