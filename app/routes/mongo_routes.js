const basicAuth = require('../../Util/basicAuth');
const jsonUtil = require('../../Util/jsonUtils');
const mongoConst = require('../../Constants/index').mongoConst;
const HTTP_METHODS = require('../../Constants/index').HTTP_METHODS;
const fileSystemConst = require('../../Constants/index').fileSystemConst;
var logError = require('../../Constants/index').logError;
const Constheaders = require('../../Constants/index').headers
const fetch = require('node-fetch');



module.exports = function(app){
    
var generalResponse={
    data:[],
    errors:[]
};

var postToMongo = {
    user_id:"",
    directory:[{
        logical_path:""
    }],
    shared:[]
}

var userinfo = {
    _id:"",
    name:"",
    __V:""
}

    //GET from mongo all the folder information
    app.get('/:user/folder', (req, res)=>{
        userinfo.user = req.params.user
        headers = {
            Constheaders,
            user:userinfo.user,
            file_id:userinfo.file_id
        }

        console.log("url: ["+mongoConst.URL+mongoConst.ENDPOINT_ALL_FILE+"]")
        //THIS FETCHS THE USERS IN THE DB
        fetch(mongoConst.URL+mongoConst.ENDPOINT_ALL_FILE,
            {method:HTTP_METHODS.GET})
        .then(jsonUtil)
        .then(data =>{
            if (data instanceof Error)
            throw data;
            else{
                //ISSUE: HERE WE SHOULD SEARCH A SPECIFIC USER
                userinfo = data

                console.log("url: ["+mongoConst.URL+mongoConst.ENDPOINT_ONE_DIRECTORY+userinfo._id+"]")
                //THIS FETCH THE DIRECTORY FOR THE USER FOUND
                return fetch(
                    mongoConst.URL+mongoConst.ENDPOINT_ONE_DIRECTORY+userinfo._id,
                    {method:HTTP_METHODS.GET}
                )
                .then(jsonUtil)
                .then(data => {
                    generalResponse.data.push(data)
                })
                .catch(err => processErrors(err, "Mongo Get the Directory"))
            }
        })
        .catch(err =>{
            processErrors(err,"Mongo get the User") 
        })
        .finally(( ) => {
            SendResponse(res, generalResponse);
        })  
    })

    //GET ONE FILE FROM THE CHOPPA!
    app.get('/:user/folder/:file', (req, res)=>{
        userinfo.file_id = req.params.file;
        headersToFileSystem={
            Constheaders,
            file_id:userinfo.file_id
        }

        console.log("url: ["+fileSystemConst.URL+fileSystemConst.ENDPOINT_ALL_FILE+fileSystemConst.QUERYPARAMS+userinfo.file_id+"]")
        fetch(fileSystemConst.URL+fileSystemConst.ENDPOINT_ALL_FILE+fileSystemConst.QUERYPARAMS+userinfo.file_id,{method:HTTP_METHODS.GET, headers:headersToFileSystem})
        .then(jsonUtil)
        .then(data =>{
            //Check for errors in HTTP code. 
            if (data instanceof Error)
            throw data;
            else{
                doingStuff()
                generalResponse.data.push(data)
            }
            
        })
        .catch(err =>{
            processErrors(err,"FileSystem GET FILE") 
        })
        .finally(() => {
            SendResponse(res, generalResponse);
        })
    })


    //POST ONE FILE INTO THE CHOPPA!
    app.post('/:user/folder',(req, res)=>{
        postBody = {
            stream:req.body.stream,
            user:req.params.user,
            timestamp:new Date(),
            file_path:req.body.file_path,
            file_name:hash(req.body.file_name),

        }

        postToMongo.directory.push(postBody.file_path+":"+postBody.file_name)
        postToMongo.user_id = postBody.user
        console.log(JSON.stringify(postBody))
        console.log(JSON.stringify(postToMongo))

        console.log("url: ["+fileSystemConst.URL+fileSystemConst.ENDPOINT_ALL_FILE+"]")
        //Post to FileSystem
        fetch(fileSystemConst.URL+fileSystemConst.ENDPOINT_ALL_FILE,
            {method:HTTP_METHODS.POST,
            body:JSON.stringify(postBody),
        headers:Constheaders})
        .then(jsonUtil)
        .then(data =>{
            //Check for errors in HTTP code. 
            if (data instanceof Error)
            throw data;
            else{
                generalResponse.data.push(data)
                console.log("url: ["+mongoConst.URL+mongoConst.ENDPOINT_ONE_DIRECTORY+"]")
                //Post to Mongo
                return fetch(mongoConst.URL+mongoConst.ENDPOINT_ALL_FILE,
                    {method:HTTP_METHODS.POST,
                        body:JSON.stringify(postToMongo),
                        headers:Constheaders})
                    }
                })
                .then(jsonUtil)
                .then(data => {
                                //Check for errors in HTTP code. 
                                if (data instanceof Error)
                                throw data;
                                else{
                                    //doingStuff()
                                    generalResponse.data.push(data)
                                    
                                }
                                    })
                                    .catch(err=>{processErrors(err, "POST FILE") })
        .finally(()=>{
            console.log(generalResponse)
            SendResponse(res, generalResponse)
            
            })
        
    })
}

/**
 * ***********************************************************************************************************
 * <========================== -- Funciones re utilizadas mas arriba -- =====================================>
 * ***********************************************************************************************************
 */
function resetGeneralResponse(generalResponse){

    generalResponse.data = [];
    generalResponse.errors = [];
}

function SendResponse(res, generalResponse){
    console.log("Sending Rest Response...")
    res.send(generalResponse)
    resetGeneralResponse(generalResponse)
}

function doingStuff(){
    console.log("Doing Stuf...");
    console.warn("Doing Stuf...");
    console.error("Doing Stuf...");
}
var numOfHash = 0
function hash(fileName){
    //this should hash the file name to reduce the possible conflicts into the filesistem
    numOfHash++;
    return numOfHash+'%filename%&_'+fileName+'_&%filename%'+numOfHash
}

function processErrors(err,place) {
    logError('Fetch from '+place,err)
     generalResponse.errors.push(err);
          
}
/**
 * const secondresponse = await 
 */