var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String
    },
    url: {
        type: String
    }
});

CategorySchema.virtual('link').get(function () {
    return `/category/${this._id}`;
});

//Export model
module.exports = mongoose.model('Category', CategorySchema);