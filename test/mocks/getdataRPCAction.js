module.exports = (service, server, willcore) => {
    service.getData.action.get = async (model) => {
        let result = [];
        for (let i = 0; i < model.resultCount; i ++){
            result.push({one: model.value, index:i});
        }
        model.result = result;
    };
};