import { isString } from "util";
var atob = require('atob')

module.exports = function(string){
    if(isString(string)){
        var res = string.split(" ");
        console.log(res)
        string = atob(res[1]);
        console.log(string)
        res = string.split(":")
    }else{
        string = "No se recibio un string!"
    }
    
    return res;
}



