// Konfiguracja aplikacji

const config = {
        env: process.env.NODE_ENV || 'development',
        port: 9000,
        ip: '127.0.0.1',
        apiRoot: '/api',
        mongo: {
                host: 'mongodb://localhost/library',                     // Jesli mamy logowanie definiujemy jako mongodb://{login}:{haslo}@{host}/{nazwa-bazy}
                options: {
                        useNewUrlParser: true,
                        useCreateIndex: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false,
                        debug: true
                }
        }
};

module.exports = config;
