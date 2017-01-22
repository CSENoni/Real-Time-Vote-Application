var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    seedDB = require('./seed');

// required routes
var indexRoutes = require('./routes/index'),
    pollRoutes = require('./routes/polls');
    
mongoose.connect("mongodb://localhost/Real_Time_Voting_App");    
app.use(bodyParser.urlencoded ({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cookieParser("secret"));
// Use seedDB() only for test
// seedDB();

app.use("/", indexRoutes);
app.use("/", pollRoutes);

io.on('connection', function(socket){
    socket.on('send chart', function(obj){
        io.emit('show chart', obj);
    });
});

http.listen(process.env.PORT, function(){
    console.log("Server has started!!!");
});