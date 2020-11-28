const Mongoose = require('mongoose');
const {EngineSchema} = require('./engine.model.js');

const Schema = Mongoose.Schema;

const CarSchema = new Schema({
    // _id nie deklarujemy sami - jest zawsze obecne w schemacie i jest indeksowane
    model: {
        type: String,
        required: true
    },
    engine: {
        type: EngineSchema,         // Dokument zagniezdzony (ang. embeded documents). Dziala rowniez z tablicami, np. [EngineSchema]
    },
    productionStarted: {
        type: Number
    },
    inProduction: {
        type: Boolean,
        default: true
    },
    manufacturer: {                 // Referencja do innego dokumentu, działa równiez z tablicami, np. [Schema.ObjectId]
        type: Schema.ObjectId,
        ref: 'Manufacturer',
        required: true
    }
}, {
    timestamps: true,               // createdAt, modifiedAt
});


module.exports = {
    CarSchema,                      // to samo co: CarSchema:CarSchema
    Car: Mongoose.model('Car', CarSchema)
};
