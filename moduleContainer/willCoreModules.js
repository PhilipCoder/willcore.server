module.exports = (willCoreModuleInstance) => {
       willCoreModuleInstance.server = () => require("../assignables/serverAssignable.js");
       willCoreModuleInstance.service = () => require("../assignables/serviceAssignable.js");
       willCoreModuleInstance.action = () => require("../assignables/actionRPCAssignable.js");
};