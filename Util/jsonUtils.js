var logError = require('../Constants/index').logError

module.exports = function(response){
    if(response.status !== 200){
        console.log("Something went wrong... ");
        console.log("Code: "+response.status);
        console.log("Msg: "+response.statusText);
        error = new Error();
        error.code = response.status;
        error.msg = response.statusText
        logError("JsonUtils", error);
        return error;
    }
    return response.json()   

}

/*
*
*   Checks if the status code its OK, then returns the response in JSON format.
*   If Status Code it's not OK, returns Error()
*
*/