const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

const ManufacturerSchema = new Schema({
        name: {
            type: String,
            unique: true                            // zostanie utworzony index z opcja unikalnych wartosci
        },
    }, {
        timestamps: true,
        // collection: 'MyManufacturers'             // Kolekjce mozna nazwac samemu - domyslnie == nazwie modelu
    }
);

module.exports = {
    ManufacturerSchema,
    Manufacturer: Mongoose.model('Manufacturer', ManufacturerSchema)
}
