const mimeTypes = require("./mimeTypes.json"); 

const mimeContainer = {
    
};

mimeContainer.init = () =>{
    for (let key in mimeTypes){
        mimeContainer[key] = mimeTypes[key];
    }
};

mimeContainer.init();

module.exports = mimeContainer;