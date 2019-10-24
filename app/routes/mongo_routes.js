const basicAuth = require('../../Util/basicAuth');
const jsonUtil = require('../../Util/jsonUtils');
const mongoConst = require('../../Constants/index').mongoConst;
const HTTP_METHODS = require('../../Constants/index').HTTP_METHODS;
const fetch = require('node-fetch')

var headers;
var mongoResponse={
    data:"",
    errors
};
var errors = {
    array:"",
    quantity:Number(0)
}


module.exports = function(app){

    app.get('/folder', (req, res)=>{
        headers = req.headers
        
        fetch(mongoConst.URL+mongoConst.ENDPOINT_GET_ALL,{method:HTTP_METHODS.GET, headers:headers})
        .then(jsonUtil)
        .then(data =>{
            mongoResponse.data = data;
        })
        .catch(err =>{
            mongoResponse.errors.array[mongoResponse.errors.quantity] = err;
            mongoResponse.errors.quantity++;
        })

        if (mongoResponse.errors.quantity != 0) {
            res.send(mongoResponse.errors.array)
        }else{
            res.send(mongoResponse.data)
        }
    })
}