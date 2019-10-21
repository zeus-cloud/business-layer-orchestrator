//import {} from "../../Util/basicAuth";
const basicAuth = require('../../Util/basicAuth');
let textTest = "";
var user = {
    name:"",
    password:""
}
const fetch = require('node-fetch')

var headers = {
    "Content-Type": "application/json"
}

module.exports = function(app, db){
    app.post('/file', (req, res)=>{
        //Aqui deberia venir un archivo
        textTest   = req.headers;
        textTest = req.headers.authorization;
       //decodificar Basic Auth
        auth = basicAuth(textTest)
        user.name = auth[0]
        user.password = auth[1]
        //y realizar la llamada a los servicios
       
        fetch('https://localhost:9090/test', { method: 'GET', headers: headers})
        .then(response => {
                            response.json()
                            console.log(response.status)
                            console.log(response.statusText)
                            console.log(response.type)

                                            })
        .then(data => {console.log(data)})
        .catch(err => console.log("error ocurred: "+err))

        //Enviar una respuesta adecuada
        res.send(textTest+" Now is: "+user.name+":"+user.password)
    })
}


//const response = await fetch('http://localhost:9090/test');
//const myJson = await response.json();
//console.log(JSON.stringify(myJson));