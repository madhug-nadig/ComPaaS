var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var metaSchema = new Schema({

    userid: {
        type: String,
        required: true,
    },
    ip: {
        type: String
    }

}, {
    timestamps: false
});


var meta = mongoose.model('meta', metaSchema);

module.exports = meta;