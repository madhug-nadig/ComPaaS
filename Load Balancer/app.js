

var mongoose = require('mongoose'),
    express = require('express'),
    assert = require('assert'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path');

var requestHandler = require('./routes/requestHandler');


var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', requestHandler);


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
