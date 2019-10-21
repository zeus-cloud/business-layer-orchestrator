//nodemon -r esm server.js
//^^^^^^^ RUN THIS PROGRAM WITH THIS COMMAND ^^^^^^^^^^^^

import { Value } from "./Constants/index.js";

const ex = require(Value.EXPRESS);
const bodyParser = require(Value.BODY_PARSER);
const app = ex();
app.use(bodyParser.json({ extended: true }));

require('./app/routes')(app, {});
app.listen(Value.PORT, () =>{
    console.log('We Are live on: '+Value.PORT);
})
