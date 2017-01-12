
var express = require('express');
var bookRouter  = express.Router();

var mongoose = require('mongoose');

var books = require('../models/books');

bookRouter.route('/')
.get(function(req,res,next){

  books.find({}, function(err, book){
      if(err){
        throw err;
      }
      res.json(book);
  });

})

.post(function (req, res, next) {
    books.create(req.body, function (err, book) {
        if (err) throw err;
        console.log('book created!');
        var id = book._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the book with id: ' + id);
    });
})

.delete(function (req, res, next) {
    books.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

bookRouter.route('/:bookId')

.get(function (req, res, next) {
    books.findById(req.params.bookId, function (err, book) {
        if (err) throw err;
        res.json(book);
    });
})

.put(function (req, res, next) {
    books.findByIdAndUpdate(req.params.bookId, {
        $set: req.body
    }, {
        new: true
    }, function (err, book) {
        if (err) throw err;
        res.json(book);
    });
})

.delete(function (req, res, next) {
    books.findByIdAndRemove(req.params.bookId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = bookRouter;
