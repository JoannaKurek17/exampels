const mongoose = require('mongoose')

const config = {
    host: 'mongodb://localhost/cars',
    options: {
        debug: true,
        useNewUrlParser: true,              // Naprawia: 'Deprecation Warnings' z nowym MongoDB
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
};

for(const [key, value] of Object.entries(config.options)){
    mongoose.set(key, value);
}

mongoose.connection.on('connected', (res) => {
    console.log('MongoDB connected successfully')
})


mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err)
    process.exit(-1)
})

mongoose.connect(config.host)

module.exports = mongoose
