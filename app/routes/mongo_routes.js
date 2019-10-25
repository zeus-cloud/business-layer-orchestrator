const basicAuth = require('../../Util/basicAuth');
const jsonUtil = require('../../Util/jsonUtils');
const mongoConst = require('../../Constants/index').mongoConst;
const HTTP_METHODS = require('../../Constants/index').HTTP_METHODS;
const fetch = require('node-fetch')

var headers;
var mongoResponse={
    data:[],
    errors:{
        array: [],
        quantity:0
    }
};

    



module.exports = function(app){

    app.get('/:user/folder', (req, res)=>{
        user = req.headers.user
        console.log("user: "+user)
        
        fetch(mongoConst.URL+mongoConst.ENDPOINT_GET_ALL,{method:HTTP_METHODS.GET, headers:headers})
        .then(jsonUtil)
        .then(data =>{
            mongoResponse.data[0] = data;
        })
        .catch(err =>{
            mongoResponse.errors.array[mongoResponse.errors.quantity] = err;
            mongoResponse.errors.quantity++;
        })
        .finally(response => {
            if (mongoResponse.errors.quantity != 0) {
                console.log("Errores: "+mongoResponse.errors.array)
                res.send(mongoResponse.errors.array)
            }else{
                console.log("Data: "+mongoResponse.data)
                res.send(mongoResponse.data)
            }
        })  
    })
}