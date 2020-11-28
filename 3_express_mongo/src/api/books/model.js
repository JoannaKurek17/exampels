const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: [Schema.ObjectId],            // jedna ksiazka moze miec wielu autorow
        ref: 'Author',
        required: true
    },
    year: {
        type: Number
    }
}, {
    timestamps: true,
});


module.exports = {
    BookSchema,
    Book: Mongoose.model('Car', BookSchema)
};
