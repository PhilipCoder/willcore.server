const selfsigned = require('selfsigned');
const fs = require("fs");
const pathHelper = require("./path.js");
const path = require("path");

class sslHelper{
    constructor(){
        this.sslDir =  path.join(pathHelper.projectDir,"ssl");
        let certPath = path.join(sslDir,"selfSigned.crt");
        this.isCertGenerated = fs.exists(certPath);
    }

    generateCertificate(){
        
    }

}

module.exports = sslHelper;