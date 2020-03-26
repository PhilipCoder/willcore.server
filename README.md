<p align="center">
<img src="res/WillCoreLogo.png"  />
<h1 align="center">WillCore.Server</h1>
<h5 align="center">Build With Proxies - By Philip Schoeman</h5>
</p>

## Index
* Assignable introduction
* Features overview
* Installing willcore.server
* Creating a server
    *  HTTP
    * HTTPS
* Hosting files
* Hosting a single file
* Services
* RPC Actions
* REST Actions
* Interceptors
___

### A) Assignable-Introduction
___

In order to make the API as simple as possible, WillCore uses the concept of assignables to instantiate and assign state to internal objects. The concept might be a bit weird at first, but it simplifies the API.

<br/>

E1) Let's take the following example:

```javascript
//Creates an instance of the database class and assign values to it.
let dataBase = new mySQL();
dataBase.connectionString = "127.0.0.1";
dataBase.userName = "root";
dataBase.password = "mypassword";
//Adds a table to the database
let userTable = new table();
userTable.name = "usersDB";
dataBase.tables.add(userTable);
```

In the example above we use traditional Class or Function instantiation and then we assign properties to the instance. But by doing so we are expecting the programmer to know the API and what values to assign. But what if the class itself knew what values to assign where? That is where assignables come in.

<br/>

E2) Doing it the assignable way:

```javascript
//Creating an instance of the mysql database named "usersDB"
dbProxy.usersDB.mysql = ["127.0.0.1", "userName", "password"];
//Defining a table on the database named "usersTable"
dbProxy.usersDB.usersTable.table;
```
<br/>

>The two examples above do the exact same thing. 
When the class is assigned to $elementId, the framework checks if the class inherits from an assignable. Then it creates an instance of the mysql class. The instance of the mysql class then tells WillCore that it needs 3 strings to complete assignment. When the strings are assigned, the mysql class initiates itself.

 #### The syntax for assignables is:
> proxyInstance.newPropertyName.newObjectType = assignmentValues (optional)

* __Proxy Instance :__ An instance of a proxy that supports assignables. In the case of WillCore.Data, it can be the main proxy, a database proxy, table proxy or column proxy.
* __New Property Name :__  The name of the property that has to be created or set on the proxy.
* __New Object Type :__ The type of the value that is created on the parent proxy.

## Getting started

WillCore.Server is an expansion module on the WillCore framework. It provides easy to use HTTP/HTTPS webserver functionality. WillCore.Server can easily be extended by installing willCore assignable modules. Out of the box it provides the following features:

* HTTP/HTTPS web server.
* File server.
* RPC and REST service functionality (JSON).

#### Installing WillCore.Server
WillCore.Server can be installed as an extension module on WillCore.Server:

```javascript
npm install willcore.core
npm install willcore.server
```


## Creating a server
As with other willCore modules, the main willCore proxy needs to be imported and the server created the assignable way.

### __Server assignable__

Has Name | Assignable values | Assignable result | Can assign to
-------- | ----------------- | ----------------- | -------------
   ✔    | 1 Number          |  serverProxy     | willCoreProxy

#### Assignable values

String Values | Number Values | Function Values
------------- | ------------- | ---------------
 _ | Server TCP port | _ 

<br/>

### __HTTP assignable__

Has Name | Assignable values | Assignable result | Can assign to
-------- | ----------------- | ----------------- | -------------
   ❌    | -          |  Promise< void >     | serverProxy

#### Assignable values

String Values | Number Values | Function Values
------------- | ------------- | ---------------

<br/>

### __HTTPS assignable__

Has Name | Assignable values | Assignable result | Can assign to
-------- | ----------------- | ----------------- | -------------
   ❌    | -          |  Promise< void >     | serverProxy

#### Assignable values

String Values | Number Values | Function Values
------------- | ------------- | ---------------

<br/>

#### Creating a HTTP server
```javascript
//Importing the willCore proxy
const willCoreProxy = require("willcore.core");

//Lets use a IIFE to use async functionality.
(async () => {
    //New WillCore proxy instance.
    const wCProxyInstance = willCoreProxy.new();
    //Creates a new server named "testServer" on port 8580
    coreProxy.testServer.server = 8580;
    //Configure for http
    await coreProxy.testServer.http;
})();
```

#### Creating a HTTPS server
```javascript
//Importing the willCore proxy
const willCoreProxy = require("willcore.core");

//Lets use a IIFE to use async functionality.
(async () => {
    //New WillCore proxy instance.
    const wCProxyInstance = willCoreProxy.new();
    //Creates a new server named "testServer" on port 8580
    coreProxy.testServer.server = 8580;
    //Configure for http
    await coreProxy.testServer.https;
})();
```

> #### Important: When creating a HTTPS server, you need to run your IDE and as administrator. WillCore.Core will install a self signed certificate into your Windows' trusted root certificate store and needs admin rights to do so.

## Serving a single file


### __File assignable__

Has Name | Assignable values | Assignable result | Can assign to
-------- | ----------------- | ----------------- | -------------
   ✔    | 2 String          |  fileServerProxy     | serverProxy

#### Assignable values

String Values | Number Values | Function Values
------------- | ------------- | ---------------
Activation URL | _ | _ 
Path to file on file system that should be served | - | - 
<br/>


In order to serve a file on a predefined URL, the file assignable can be used. 

#### For instance to display a file **"/views/index.html"** home page on **http://localhost:8580**:

```javascript
//Importing the willCore proxy
const willCoreProxy = require("willcore.core");

//Lets use a IIFE to use async functionality.
(async () => {
    //New WillCore proxy instance.
    const wCProxyInstance = willCoreProxy.new();
    //Creates a new server named "testServer" on port 8580
    coreProxy.testServer.server = 8580;
    //Configure for http
    await coreProxy.testServer.https;
    //Serve the home page
     coreProxy.testServer.homePage.file["/"] = "/views/index.html";
     //Serve the about page
     coreProxy.testServer.homePage.file["/about"] = "/views/about.html";
})();
```

When navigating to https://localhost:8580 you will see the homepage. https://localhost:8580/about will be the about page.

## Serving files in a directory

When you need to serve files in a folder, for example so serve a folder with it's sub folders with JavaScript files, the files assignable can be used. The first segment of the file's URL is the part that will activate the assignable.


### __Files assignable__

Has Name | Assignable values | Assignable result | Can assign to
-------- | ----------------- | ----------------- | -------------
   ✔    | 1 String          |  filesServerProxy     | serverProxy

#### Assignable values

String Values | Number Values | Function Values
------------- | ------------- | ---------------
Path to directory that should be served | - | - 

<br/>

#### Serving files in a folder

```javascript
//Importing the willCore proxy
const willCoreProxy = require("willcore.core");

//Lets use a IIFE to use async functionality.
(async () => {
    //New WillCore proxy instance.
    const wCProxyInstance = willCoreProxy.new();
    //Creates a new server named "testServer" on port 8580
    coreProxy.testServer.server = 8580;
    //Configure for http
    await coreProxy.testServer.https;
    //Serve the javascript folder.
     coreProxy.testServer.jsFiles.files = "/javascript";
})();
```

When navigating to https://localhost:8580/jsFiles/bootstrap.js, the server will try and get the bootstrap.js file in the javascript folder and return it. If not found, a 404 error will be returned.

## Services

A service is a container of components that serve dynamic data. These components are called actions. A service is composed of the service assignable and a function that should be the main export of a different file.

### __Service assignable__

Has Name | Assignable values | Assignable result | Can assign to
-------- | ----------------- | ----------------- | -------------
   ✔    | 1 String          |  serviceProxy     | serverProxy

#### Assignable values

String Values | Number Values | Function Values
------------- | ------------- | ---------------
Path to service file | - | - 

<br/>