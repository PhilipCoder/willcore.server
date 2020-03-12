const assignable = require("willcore.core/assignable/assignable");
const requestAssignable = require("../proxies/request/requestProxy.js");
const zlib = require('zlib');
const { pipeline } = require('stream');

class responseCompressionAssignable extends assignable {
    constructor() {
        super({}, requestAssignable);
        this.interceptors = {
            after: () => {
                this.parentProxy._assignable.interceptors.after.push(this.intercept);
            }
        };
    }

    static get noValues() {
        return requestAssignable;
    }

    completionResult() {
        this.interceptors.after();
        return false;
    }

    completed() {
    }

    async intercept(data, request, response) {
        request.ended = true;
        let acceptEncoding = request.headers['accept-encoding'];
        if (!acceptEncoding) {
          acceptEncoding = '';
        }
        const onError = (err) => {
            if (err) {
              response.end();
            }
          };
        
          if (/\bdeflate\b/.test(acceptEncoding)) {
            response.writeHead(200, { 'Content-Encoding': 'deflate' });
            pipeline(data, zlib.createDeflate(), response, onError);
          } else if (/\bgzip\b/.test(acceptEncoding)) {
            response.writeHead(200, { 'Content-Encoding': 'gzip' });
            pipeline(data, zlib.createGzip(), response, onError);
          } else if (/\bbr\b/.test(acceptEncoding)) {
            response.writeHead(200, { 'Content-Encoding': 'br' });
            pipeline(data, zlib.createBrotliCompress(), response, onError);
          } else {
            response.writeHead(200, {});
            pipeline(data, response, onError);
          }
    }
}

module.exports = responseCompressionAssignable;