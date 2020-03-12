# WillCore.Server

Assignable to create a NodeJS server.

```javascript
let server = willcore.server;
server.port = 1337;
server.https.certificate = certificate; //enables https
server.controllerName.controller = "Path to JS file";
server.
```
All assignables in the server module will be in the wilcore.server module.

Request proxies are activated via the first segment of the url

## Todo:

* Request aliases
* Rest Action
* End to end tests
* ETags
* Time expiration
* Compression