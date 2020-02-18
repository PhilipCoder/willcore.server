module.exports = (willCoreModuleInstance) => {
       willCoreModuleInstance.server = () => require("../assignables/serverAssignable.js");
};