require('dotenv').config();

var headers = {
    "Content-type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
}

var mongoConst = {
    URL :process.env.mongoURL,
    ENDPOINT_ALL_FILE:process.env.mongoENDPOINT_ALL,
    ENDPOINT_GET_ONE:process.env.mongoENDPOINT_ONE
}

var HTTP_METHODS = {
    POST:"POST",
    GET:"GET",
    PUT:"PUT",
    DELETE :"DELETE"
}

var fileSystemConst = {
    URL :process.env.fileSystemURL,
    ENDPOINT_ALL_FILE:process.env.fileSystemENDPOINT,
    QUERYPARAMS:"?archivo="
}

function logError(place, error){
    console.log(place+" error. Code: "+error.code+" "+error.msg)
}

module.exports={
    logError,
    fileSystemConst,
    HTTP_METHODS,
    mongoConst,
    headers
}