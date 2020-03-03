module.exports = (service, server, willcore) => {
    service.getData.action.get = async (model) => {
        service.getData._assignable.testCalled = true;
    };
    service.getData.before.interceptor = async (model,request) => {
        service.getData._assignable.testBlocked = true;
        model.statusCode = 501;
        model.error = "Unauthorized";
        return false;
    };
};
