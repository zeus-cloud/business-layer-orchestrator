//import {} from "../../Util/basicAuth";
const basicAuth = require('../../Util/basicAuth');
let authHeader = "";
var user = {
    name:"",
    password:""
}

var responseBody;
const fetch = require('node-fetch')

var headers = {
    "Content-Type": "application/json"
}

module.exports = function(app, db){
    app.post('/file', (req, res)=>{
        //Aqui deberia venir un archivo
        
       //decodificar Basic Auth
        authHeader = req.headers.authorization;
        auth = basicAuth(authHeader)
        user.name = auth[0]
        user.password = auth[1]
        //y realizar la llamada a los servicios
       
        fetch('http://localhost:9090/test', { method: 'GET', headers: headers})
        .then(response => {
            if(response.status !== 200){
                console.log("Something went wrong... ");
                console.log("Code: "+response.status)
                console.log("Msg: "+response.statusText)
                return new Error();
            }
            return response.json()    
             })
        .then(data => {
            console.log("Data is:")
            console.log(data)
            responseBody = data.message;
        })
        .catch(err => console.log("error ocurred: "+err))

        //Enviar una respuesta adecuada
        res.send(" Now is: "+user.name+":"+user.password+" with response body: "+responseBody)
    })
}


//const response = await fetch('http://localhost:9090/test');
//const myJson = await response.json();
//console.log(JSON.stringify(myJson));