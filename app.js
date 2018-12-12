const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiauthentication', { useNewUrlParser: true });

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/users', require('./routes/users.js'));

//start server
const port = process.env.port || 3000;
app.listen(port, function(){
	console.log('server listening on port ' + port);
});
