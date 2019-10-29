const apiTestRoutes = require('./test_api_routes')
const apiMongoRoutes = require('./mongo_routes')

module.exports = function(app, db){
    apiTestRoutes(app, db);
    apiMongoRoutes(app)
}
