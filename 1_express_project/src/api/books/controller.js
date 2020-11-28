const BookModel = require('./model');
const books = new BookModel()

const create = ({ body }, res, next) => {
    const result = books.create(body);
    res.send(result);
};

const index = ({ query }, res, next) => {
    const {title} = query;
    if(title)
        return res.send(books.findByTitle(title));
    res.send(books.findAll());
};

const show = ({ params }, res, next) => {
    const id = parseInt(params.id);
    const result = books.findByPk(id)
    if(result)
        res.send(result);
    else
        res.status(404).end()
};


const update = ({ body , params }, res, next) => {
    const id = parseInt(params.id);
    const {title, author} = body
    const result = books.update({id, title, author})
    if(result)
        res.send(result);
    else
        res.status(404).end()
};

const destroy = ({ params }, res, next) => {
    const id = parseInt(params.id);
    books.destroy(id);
    res.status(204).end()
};



module.exports = {
    create, index, show, update, destroy
};
