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
    URL :"http://172.19.0.10:8083/",
    ENDPOINT_ALL_FILE:"test_fileSystem",
    ENDPOINT_ONE_FILE:"test/:id"
}

function logError(place, error){
    console.log(place+" error. Code: "+error.code+" "+error.msg)
}
