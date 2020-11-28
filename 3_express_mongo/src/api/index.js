// Plik centralny API - tu importujemy enpointy (index.js) z poszczegolnych katalogow
const {Router} = require('express');
const books = require('./books');
const authors = require('./authors');

// Routing
const router = Router();
router.use('/authors', authors);
router.use('/books', books);
// Inny routing idzie tutaj


module.exports = router;
