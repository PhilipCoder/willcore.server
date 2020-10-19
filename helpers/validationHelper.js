const validateModel = (model, validationContainer, typeValidationContainer) => {
    let invalidKeys = [];
    if (typeValidationContainer) {
        for (var key in typeValidationContainer) {
            if (typeof model[key] !== typeValidationContainer[key]){
                invalidKeys.push(key);
            }
        }
    }
    if (validationContainer && invalidKeys.length ===0) {
        for (var key in validationContainer) {
            if (!validationContainer[key](model)){
                invalidKeys.push(key);
            }
        }
    }

    return invalidKeys.length > 0 ? `Validation failed for model. Fields: ${invalidKeys.join(",")}.` : null;
};

module.exports = validateModel;