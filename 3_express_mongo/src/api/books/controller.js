const {Book} = require('./model');


const create = ({ body }, res, next) => {

};

const index = ({ query }, res, next) => {
    const {title} = query;

};

const show = ({ params }, res, next) => {
    const id = parseInt(params.id);

};


const update = ({ body , params }, res, next) => {
    const id = parseInt(params.id);
    const {title, author} = body

};

const destroy = ({ params }, res, next) => {
    const id = parseInt(params.id);
};



module.exports = {
    create, index, show, update, destroy
};
