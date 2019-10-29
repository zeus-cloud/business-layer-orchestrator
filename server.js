//nodemon -r esm server.js
//^^^^^^^ RUN THIS PROGRAM WITH THIS COMMAND ^^^^^^^^^^^^

const ex = require('express');
const bodyParser = require('body-parser');
const app = ex();
app.use(bodyParser.json({ extended: true }));

require('./app/routes')(app, {});
app.listen(8084, () =>{
    console.log('We Are live on: '+ 8084);
})
