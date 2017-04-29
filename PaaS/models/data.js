var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },

    key: {
        type: [String],
        required: true
    },
    value: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});


var data = mongoose.model('data', dataSchema);

module.exports = data;