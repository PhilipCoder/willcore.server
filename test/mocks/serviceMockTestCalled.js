module.exports=  (service, server, willcore) =>{
    service.getData.action.get = (model) => {
        service.getData._assignable.testCalled = true;
    };
};
