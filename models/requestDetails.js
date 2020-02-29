const availableMethods = require("./httpVerbs.js");

class requestDetails {
    constructor(request) {
        this._initLocals();
        this.request = request;
    }

    //URL
    get url() {
        return this._url;
    }
    set url(value) {
        if (!value.startsWith("/")) throw "URL should start with a '/'.";
        this._url = value;
    }

    //method
    get method() {
        return this._method;
    }
    set method(value){
        let method = availableMethods[value];
        if (!method) throw `Unsupported HTTP verb ${value}`;
        this._method = method;
    }

    //parameters
    get parameters() {
        return this._parameters;
    }
    set parameters(value){
        this._parameters = value;
    }

    //headers
    get headers() {
        return this._headers;
    }
    set headers(value) {
        this._headers = value;
    }

    //body
    get body() {
        return this._body;
    }
    set body(value) {
        this._body = value;
    }

    //servicePart
    get servicePart() {
        let urlParts = this._url.split("/");
        if (urlParts.length < 2) throw `Invalid URL. URL does not contain a service part: ${this._url}.`
        return urlParts[1];
    }

    //action part
    get actionPart() {
        let urlParts = this._url.split("/");
        if (urlParts.length < 3) throw `Invalid URL. URL does not contain an action part: ${this._url}.`
        return urlParts[2];
    }

    get fileName(){
        let fileUrl = this._url.substring(1);
        fileUrl = fileUrl.substring(fileUrl.indexOf("/"));
        return fileUrl;
    }

    _initLocals() {
        /**@type {string} */
        this._url = null;
        /**@type {string} */
        this._method = null;
        /**@type {ArrayLike<Object>} */
        this._parameters = [];
        /**@type {ArrayLike<Object>} */
        this._headers = null;
        /**@type {Object} */
        this._body = null;
    }
}

exports.requestDetails = requestDetails;
exports.requestInstance = new requestDetails();
