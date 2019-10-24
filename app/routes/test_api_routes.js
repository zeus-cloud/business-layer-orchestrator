//import {} from "../../Util/basicAuth";
const basicAuth = require('../../Util/basicAuth');
const jsonUtil = require('../../Util/jsonUtils');
let authHeader = "";
var user = {
    name:"",
    password:""
}

var req_file = {
    file_id:null,
    file_path:null,
    file_stream:null
}
var allfetchdone = false;
var responseBody;
const fetch = require('node-fetch')

var headers = require('../../Constants/index').headers

var post_headers = {
    "Content-Type": "application/json",
    "authorization":user.name+":"+user.password
}

module.exports = function(app, db){
    app.post('/file', (req, res)=>{
        //Aqui deberia venir un archivo
       req_file.file_id= req.body.file_id
       req_file.file_path= req.body.file_path

       //decodificar Basic Auth
        authHeader = req.headers.authorization;
        auth = basicAuth(authHeader)
        user.name = auth[0]
        user.password = auth[1]

        //y realizar la llamada a los servicios
        fetch('http://localhost:9090/test', { method: 'GET', headers: headers})
        .then(jsonUtil)
        .then(data => {
            console.log("Data is:")
            console.log(data)
            responseBody = data.message;
            json_req = JSON.stringify(data)
            fetch('http://localhost:9090/test', {method: 'POST', headers: post_headers, body:json_req})
            .then(jsonUtil)
            .then(data =>{
                console.log("Data from 2nd fetch...: ")
                console.log(data)
                responseBody = responseBody + data.file_timeStamp;
                console.log("Response body: "+responseBody)
                
            })
            .catch(err => console.log("error ocurred: "+err))
        })
        .catch(err => console.log("error ocurred: "+err))

        //Enviar una respuesta adecuada
        res.send(" Now is: "+user.name+":"+user.password+" with response body: "+responseBody)
    })
}



