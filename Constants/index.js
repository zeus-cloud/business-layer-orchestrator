export const Value ={
    PORT:8080,
    EXPRESS:'express',
    BODY_PARSER:'body-parser'
}

export var headers = {
    "Content-type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
}

export var mongoConst = {
    URL :"http://172.19.0.50:9090/",
    ENDPOINT_ALL_FILE:"test_mongo",
    ENDPOINT_GET_ONE:"test/:id"
}

export var HTTP_METHODS = {
    POST:"POST",
    GET:"GET",
    PUT:"PUT",
    DELETE :"DELETE"
}

export var fileSystemConst = {
    URL :"http://172.19.0.10:8083/",
    ENDPOINT_ALL_FILE:"test_fileSystem",
    ENDPOINT_ONE_FILE:"test/:id"
}

export function logError(place, error){
    console.log(place+" error. Code: "+error.code+" "+error.msg)
}
