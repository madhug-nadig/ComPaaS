var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },     
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});

var books = mongoose.model('Book', bookSchema);

module.exports = books;