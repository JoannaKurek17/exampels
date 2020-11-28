const {Author} = require('./model');        // domyslny import z index.js
const Joi = require('joi');

const create = async ({body}, res, next) => {
    try {
        const author = await Author.create(body);
        return res.status(201).json(author);
    } catch (e) {
        return next(e);
    }
};

const index = async ({query}, res, next) => {
    // Aby kod byl czystszy nalezaloby przeniesc walidacje do middlewaru
    const qValidtor = Joi.object({
        limit: Joi.number().integer().max(5).default(5),
        skip: Joi.number().integer().default(0),
        name: Joi.string()
    }).validate(query);

    if(qValidtor.error) return res.status(400).end();

    const {skip, limit, name} = qValidtor.value;

    const mongoQuery = {};
    if(name) mongoQuery.name = name;

    // Chcemy dwie informacje: Ile jest wszystkich ksiazek pasujacych do zapytania + odpowiedz na nasze zapytanie wliczajac przyjete limity.
    let results = [];
    try {
        results = await Promise.all([
            Author.find(mongoQuery).skip(skip).limit(limit),
            Author.countDocuments(mongoQuery)
        ]);
    } catch (e) {
        return next(e)
    }

    return res
        .status(200)
        .set('X-Total-Count', results[1])               // Ile jest wszystkich potencjalnych wynikow pasujacych do query
        .set('X-Result-Count', results[0].length)       // Ile zwrocono wynikow, opcjonalne, ale przydatne jesli klient nie zna limitu domyslnego
        .json(results[0]);                              // Zwrocone wyniki (uwzgledniajac limit)
};

const show = async ({params}, res, next) => {
    const id = params.id;       // ID jest stringiem (UUID)

    try {
        const author = await Author.findById(id);
        if (author) return res.status(200).json(author);
        return res.status(404);
    } catch (e) {
        next(e);
    }
};


const update = async ({body, params}, res, next) => {
    const id = params.id;
    const {name} = body;

    try {
        const author = await Author.findById(id);
        if (author) {
            author.name = name;
            await author.save();
            return res.json(author);
        } else {
            return res.status(404);
        }
    } catch (e) {
        next(e);
    }

};

const destroy = async ({params}, res, next) => {
    const id = params.id;
    try {
        const author = await Author.findById(id);
        if(author){
            await author.remove();
            return res.status(204).end();
        }
        return res.status(404).end();

    } catch (e) {
        next(e)
    }
};



module.exports = {
    create, index, show, update, destroy
};
