const selfsigned = require('selfsigned');
const fileHelper = require("./fileHelper.js");
const pathHelper = require("./path.js");
const spawn = require("child_process").spawn;

const fs = require("fs");

class sslHelper {
    static generateCertificate() {
        return new Promise(async (resolve, reject) => {
            let certPath = pathHelper.getAbsolutePath(pathHelper.projectDir, "/certificates/self-signed.cert");
            let serverKeyPath = pathHelper.getAbsolutePath(pathHelper.projectDir, "/certificates/self-signed.key");
            let serverPEMPath = pathHelper.getAbsolutePath(pathHelper.projectDir, "/certificates/self-signed.pem");

            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

           if (!(await fileHelper.exists(certPath))) {
                let attrs = [{ name: 'commonName', value: 'localhost' }];
                let certificateValues = selfsigned.generate(attrs, { days: 365, pkcs7: true });

                await fileHelper.writeFile(certPath, certificateValues.cert);
                await fileHelper.writeFile(serverKeyPath, certificateValues.private);
                await fileHelper.writeFile(serverPEMPath, certificateValues.pkcs7);

                let hasErrors = true;

                var prc = spawn('certutil', ['-addstore', 'Root', `${certPath}`]);

                prc.stdout.setEncoding('utf8');
                prc.stdout.on('data', function (data) {
                    if (data.indexOf("successfully") > -1) {
                        hasErrors = false;
                    }
                    var str = data.toString()
                    var lines = str.split(/(\r?\n)/g);
                    console.log(lines.join(""));
                });

                prc.on('close', function (code) {
                    console.log('process exit code ' + code);
                    if (hasErrors) {
                        fs.unlink(certPath, () => {
                            fs.unlink(serverKeyPath, () => {
                                reject();
                            })
                        })
                    } else {
                        resolve({ generated: true, certPath: certPath, keyPath: serverKeyPath });
                    }
                });
            } else {
                resolve({ generated: false, certPath: certPath, keyPath: serverKeyPath });
            }
        });
    }

}

module.exports = sslHelper;