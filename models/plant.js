var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    price: {
        type: Number,
        required: true
    },
    in_stock: {
        type: Number
    },
    url: {
        type: String
    }
});

//Export model
module.exports = mongoose.model('Plant', PlantSchema);