const requestProxyHandler = require("../requestProxyHandler.js");

class actionRPCProxyHandler extends requestProxyHandler {
    constructor(assignable) {
      super(assignable);
      this.getTraps.unshift(this.getValidation);
      this.setTraps.unshift(this.setValidation);
      this.getTraps.unshift(this.getTypeValidation);
      this.setTraps.unshift(this.setTypeValidation);
    }

    setValidation(target, property, value, proxy) {
      if (property === "valueValidation") {
        if (typeof value !== "object"){
          throw "The validation container must be an object."
        }
        for (let key in value){
          if (typeof value[key] !== "function"){
            throw "The validation can only contain validation functions."
          }
        }
        target.validation = value;
        return { value: value, status: true };
      }
      return { value: false, status: false };
    }

    setTypeValidation(target, property, value, proxy) {
      if (property === "typeValidation") {
        if (typeof value !== "object"){
          throw "The type validation container must be an object."
        }
        for (let key in value){
          if (typeof value[key] !== "string"){
            throw "The type validation can only contain validation type names (string)."
          }
        }
        target.typeValidation = value;
        return { value: value, status: true };
      }
      return { value: false, status: false };
    }
  
    getValidation(target, property) {
      if (property === "valueValidation") {
        return { status: true, value: target.validation };
      }
      return { status: false };
    }

    getTypeValidation(target, property) {
      if (property === "typeValidation") {
        return { status: true, value: target.typeValidation };
      }
      return { status: false };
    }
  }
  
  module.exports = actionRPCProxyHandler;