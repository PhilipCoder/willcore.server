module.exports = (service, server, willcore) => {
    service.getData.actionREST["value/resultCount"].get = async (model) => {
        let result = [];
        for (let i = 0; i < model.resultCount; i++) {
            result.push({ one: model.value, index: i });
        }
        model.result = result;
        debugger;
    };
    service.postData.actionREST["value/resultCount"].post = async (model) => {
        let result = [];
        for (let i = 0; i < model.resultCount * 2; i++) {
            result.push({ one: model.value, index: i });
        }
        model.result = result;
    };
};