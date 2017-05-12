
var express = require('express');
var bookRouter  = express.Router();

var mongoose = require('mongoose');

var books = require('../models/books');

bookRouter.route('/')
//Get all the books
.get(function(req,res,next){

  books.find({}, function(err, book){
      if(err){
        throw err;
      }
      res.json(book);
  });

})

//Add a new book
.post(function (req, res, next) {
    books.create(req.body, function (err, book) {
        if (err) console.log(err);
        console.log('book created!');
        var id = book._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the book with id: ' + id);
    });
})

//Delete all with stock 0
.delete(function (req, res, next) {
    books.remove({"stock":0}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

bookRouter.route('/:bookName')

//Get book by book name
.get(function (req, res, next) {
    books.findOne({"userkey": "OneUser", "name":req.params.bookName}, function (err, book) {
        if (err) throw err;
        res.json(book);
    });
})


//Delete book by bookname
.delete(function (req, res, next) {
    books.findOne({"userkey": "OneUser", "name":req.params.bookName}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    }).remove().exec();
});


bookRouter.route('/category/:categoryName')

//Get all books in a category
.get(function (req, res, next) {
    books.find({ "userkey": "OneUser", "category":req.params.categoryName}, function (err, book) {
        if (err) console.log(err);
        res.json(book);
    });
})

//Delete all books in a category
.delete(function (req, res, next) {
    books.findOne({"userkey": "OneUser", "category":req.params.categoryName}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    }).remove().exec();
});

bookRouter.route('/price/:bookName')

//Get price of a book
.get(function (req, res, next) {
    books.findOne({"userkey": "OneUser", "name":req.params.bookName}, {"price":1}, function (err, book) {
        if (err) throw err;
        res.json(book);
    });
})

//Set the price of a book
.post(function (req, res, next) {
    console.log(req.body);
    books.findOneAndUpdate({"userkey": "OneUser", "name":req.params.bookName}, {"$set":{"price": req.body.price}}, function (err, resp){
        if (err) console.log(err);
        res.json(resp);        
    });
});


module.exports = bookRouter;
