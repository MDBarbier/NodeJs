var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = '3000';

var logger = function(req, res, next) {
    console.log('Page loaded at ' + Date());
    next();
}

//Load middleware 
app.use(logger);

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:false}));

//express-validator middleware
app.use(express.json);

//Set static path
//N.B if we define index.html in this folder that will override the output from this file
app.use(express.static(path.join(__dirname, 'public')));

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {

    //this just writes a raw string to the page
    //res.send('Hello world'); 

    //this will write the json out to the response object, could be useful for an api
   /*  res.json([{
        fname:'Matt',
        sname:'Barbier',
        age:'36',
        occupation:'software developer'
    },{
        fname:'Heather',
        sname:'Barbier',
        age:'36',
        occupation:'quality officer'
    }]); */

    res.render('index', {
        title: 'Games'
    });
});

app.post('/users/add', function(req, res) {
    
    var newUser = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        emailAddress: req.body.email
    }
        
    console.log('Form submitted! ' +  newUser);
});

app.listen(port, function() {
    console.log("Server started on port: " + port);
});