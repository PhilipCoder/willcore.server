module.exports = (service, server, willcore) => {
    service.getData.action.get = async (model) => {
        let result = [];
        for (let i = 0; i < model.resultCount; i++) {
            result.push({ one: model.value, index: i });
        }
        model.result = result;
    };
    service.postData.action.post = async (model) => {
        let result = [];
        for (let i = 0; i < model.resultCount * 2; i++) {
            result.push({ one: model.value, index: i });
        }
        model.result = result;
    };
    service.postData.before.interceptor = async (model, request, response) => {
        return true;
    };

    service.noValidation.action.get = async (model) => {
        model.result = model.message;
    };
    service.noValidation.valueValidation = {};
    service.validation.action.get = async (model) => {
        model.result = model.email;
    };
    service.validation.typeValidation = {
        email: "string",
        name: "string",
        age: "number"
    };
    service.validation.valueValidation = {
        email: (model) => model.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        name: (model) => model.name.length > 4
    };
};