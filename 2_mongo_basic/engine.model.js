const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;

const EngineTypes = {
    diesel: 'DIESEL',
    gasoline: 'GASOLINE'
}

const EngineSchema = new Schema({
    type: {
        type: String,
        enum: Object.values(EngineTypes)       // Obiekt na tablice wartosci
    },
    power: {
        type: Number
    },
}, {
        _id: false,         // Rezygnujemy z ID bo jest to dokument zagniezdzony (OPCJA), nie chcemy też timestampow
    }
);

module.exports = {
    EngineSchema,
    Engine: Mongoose.model('Engine', EngineSchema),
    EngineTypes
}
