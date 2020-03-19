const selfsigned = require('selfsigned');
const fileHelper = require("./fileHelper.js");
const pathHelper= require("./path.js");
const spawn = require("child_process").spawn;

class sslHelper {
    static generateCertificate() {
        return new Promise(async (resolve, reject) => {
            let certPath = pathHelper.getAbsolutePath(pathHelper.projectDir, "/certificates/self-signed.cert");
            let serverKeyPath = pathHelper.getAbsolutePath(pathHelper.projectDir, "/certificates/self-signed.key");

            if (!(await fileHelper.exists(certPath))) {
                let attrs = [{ name: 'commonName', value: 'localhost' }];
                let certificateValues = selfsigned.generate(attrs, { days: 365 });

                await fileHelper.writeFile(certPath, certificateValues.cert);
                await fileHelper.writeFile(serverKeyPath, certificateValues.private);

                var prc = spawn('certutil', ['-addstore', 'Root', `${certPath}`]);

                prc.stdout.setEncoding('utf8');
                prc.stdout.on('data', function (data) {
                    var str = data.toString()
                    var lines = str.split(/(\r?\n)/g);
                    console.log(lines.join(""));
                });

                prc.on('close', function (code) {
                    console.log('process exit code ' + code);
                    resolve({ generated: true, certPath: certPath, keyPath: serverKeyPath });
                });
            } else {
                resolve({ generated: false, certPath: certPath, keyPath: serverKeyPath });
            }
        });
    }

}

module.exports = sslHelper;