var headers = {
    "Content-type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
}

var mongoConst = {
    URL :"http://172.19.0.50:9090/",
    ENDPOINT_ALL_FILE:"test_mongo",
    ENDPOINT_GET_ONE:"test/:id"
}

var HTTP_METHODS = {
    POST:"POST",
    GET:"GET",
    PUT:"PUT",
    DELETE :"DELETE"
}

var fileSystemConst = {
    URL :"http://10.30.129.174:8083/",
    ENDPOINT_ALL_FILE:"enc/",
    ENDPOINT_ONE_FILE:"enc/"
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