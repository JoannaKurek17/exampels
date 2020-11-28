const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (obj, ret) => {
            delete ret['__v']           // Przy konwersji do JSONa nie chcemy numeru wersji dokumentu (to sprawa wewnetrzna)
        }
    }
});


module.exports = {
    AuthorSchema,
    Author: Mongoose.model('Author', AuthorSchema)
};
