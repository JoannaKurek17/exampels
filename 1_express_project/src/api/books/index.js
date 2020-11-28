// Tu definiujemy routing i go exportujemy

const { Router } = require('express')
const { create, index, show, update, destroy } = require('./controller')

const router = Router()
// Routing dopasowuje sciezki w kolejnosci deklaracji
// Wiec najpierw deklarujemy ogólnie, a potem szczegolowe, np: /action, /action/:id, /action/:id/filter
// Podobnie, jesli dajemy opcje zadanej wartosci parametru dynamicznego, np. /action/me, /action/:id

router.get('/',  // GET http://localhost/api/books/
    index)

router.get('/:id', // GET http://localhost/api/books/1
    show)

router.post('/', // POST http://localhost/api/books/
    create)

router.put('/:id', // PUT  http://localhost/api/books/1
    update)

router.delete('/:id', // DELETE http://localhost/api/books/1
    destroy)


module.exports = router
