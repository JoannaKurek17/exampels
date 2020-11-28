const { Router } = require('express');
const { create, index, show, update, destroy } = require('./controller');

const router = Router();
router.get('/',
    index);

router.get('/:id',
    show);

router.post('/',
    create);

router.put('/:id',
    update);

router.delete('/:id',
    destroy);


module.exports = router;
