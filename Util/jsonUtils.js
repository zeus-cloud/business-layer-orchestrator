module.exports = function(response){
    if(response.status !== 200){
        console.log("Something went wrong... ");
        console.log("Code: "+response.status)
        console.log("Msg: "+response.statusText)
        return new Error();
    }
    return response.json()   

}

/*
*
*   Checks if the status code its OK, then returns the response in JSON format.
*   If Status Code it's not OK, returns Error()
*
*/