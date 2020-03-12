module.exports = (willCoreModuleInstance) => {
       willCoreModuleInstance.server = () => require("../assignables/serverAssignable.js");
       willCoreModuleInstance.service = () => require("../assignables/serviceAssignable.js");
       willCoreModuleInstance.files = () => require("../assignables/fileServerAssignable.js");
       willCoreModuleInstance.action = () => require("../assignables/actionRPCAssignable.js");
       willCoreModuleInstance.interceptor = () => require("../assignables/requestInterceptorAssignable.js");
       willCoreModuleInstance.alias = () => require("../assignables/requestAliasAssignable.js");
       willCoreModuleInstance.compression = () => require("../assignables/responseCompressionAssignable.js");
};