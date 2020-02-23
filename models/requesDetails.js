class requestDetails{
    constructor(request){
       
    }

    _initLocals(){
        this._url = null;
        this._method = null;
        this._parameters = [];
        this._servicePart = null;
        this._actionPart = null;
    }
    
}

module.exports = requestDetails;