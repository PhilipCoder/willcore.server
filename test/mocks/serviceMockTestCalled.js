module.exports= (service, server, willcore) =>{
    service.getData.action.get = async (model) => {
        service.getData._assignable.testCalled = true;
    };
};
