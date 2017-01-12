/*
    The stuff the REST API should do. 
        *Create or remove a category
        *Add a book, descroption
        *Query for all books in a category
        *Determine the price of the book
        *Remove the book after getting selected
        *Remove the book after it goes out of stock
        *Modify the price of the book
*/


var mongoose = require('mongoose'),
    express = require('express'),
    assert = require('assert'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path');

var books = require('./models/books');

// Connection URL
var url = 'mongodb://localhost:27017/bookkart';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});


var bookRouter = require('./routes/bookRouter');


var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', bookRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
