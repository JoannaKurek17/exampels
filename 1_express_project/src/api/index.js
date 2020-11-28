// Plik centralny API - tu importujemy enpointy (index.js) z poszczegolnych katalogow
const {Router} = require('express')
const books = require('./books')
//const authors = require('./authors')
//const cars = require('./cars')

// Routing
const router = Router()
router.use('/books', books)
//router.use('/authors', authors)
// Inny routing idzie tutaj


module.exports = router
