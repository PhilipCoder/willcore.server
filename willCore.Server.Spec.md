# WillCore.Server spec

### Main initiation file

```javascript
//main.js
const willcore = require("willcore.core").new();
const server = willcore.server;
server.jsFiles.files = "/JS";
server.jsFiles.expire.clientCachingMode = 120;
server.jsFiles.deny.fileBlock = [
    (fileName) => filename.indexOf(".server.") > -1;
];

server.users.service = "/serviceEndPoints/users.js";

server.loadDB.startUp = "/db/myDB.js";

server.start();
```

### Controller (users.js)

```javascript
module.exports = (service, server, willcore) => {
    //RPC action
    service.getUsers.actionRPC.get = (model) => {

    };
    service.getUsers.authorized;

    //REST action
    service.get.actionREST["categoryId/userId"] = async (model, queryDB = willcore.myDB.queryDB) => {
        model.result.jsonResult;
        let user = await queryDB.users.filter(user => user.id === userId, { userId: model.userId })();
        model.result = { success: user };
    };
};
```