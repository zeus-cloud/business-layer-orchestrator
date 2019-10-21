//import {} from "../../Util/basicAuth";
const basicAuth = require('../../Util/basicAuth');
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

var responseBody;
const fetch = require('node-fetch')

var headers = {
    "Content-Type": "application/json"
}

var post_headers = {
    "Content-Type": "application/json",
    "authorization":user.name+":"+user.password
}

module.exports = function(app, db){
    app.post('/file', (req, res)=>{
        //Aqui deberia venir un archivo
       file_id= req.body.file_id
       file_path= req.body.file_path

       //decodificar Basic Auth
        authHeader = req.headers.authorization;
        auth = basicAuth(authHeader)
        user.name = auth[0]
        user.password = auth[1]

        //y realizar la llamada a los servicios
        fetch('http://localhost:9090/test', { method: 'GET', headers: headers})
        .then(json)
        .then(data => {
            console.log("Data is:")
            console.log(data)
            responseBody = data.message;
            fetch('http://localhost:9090/test', {method: 'POST', headers: post_headers, body:data})
            .then(json)
            .then(data =>{
                console.log("Data from 2nd fetch...: ")
                console.log(data)
            })
            .catch(err => console.log("error ocurred: "+err))
        })
        .catch(err => console.log("error ocurred: "+err))

        //Enviar una respuesta adecuada
        res.send(" Now is: "+user.name+":"+user.password+" with response body: "+responseBody)
    })
}

/*
*
*   Checks if the status code its OK, then returns the response in JSON format.
*   If Status Code it's not OK, returns Error()
*
*/
function json(response){
    if(response.status !== 200){
        console.log("Something went wrong... ");
        console.log("Code: "+response.status)
        console.log("Msg: "+response.statusText)
        return new Error();
    }
    return response.json()    
}