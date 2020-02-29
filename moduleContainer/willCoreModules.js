module.exports = (willCoreModuleInstance) => {
       willCoreModuleInstance.server = () => require("../assignables/serverAssignable.js");
       willCoreModuleInstance.service = () => require("../assignables/serviceAssignable.js");
       willCoreModuleInstance.files = () => require("../assignables/fileServerAssignable.js");
       willCoreModuleInstance.action = () => require("../assignables/actionRPCAssignable.js");
       willCoreModuleInstance.interceptor = () => require("../assignables/requestInterceptorAssignable.js");
};