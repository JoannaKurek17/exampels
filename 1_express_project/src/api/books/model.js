// Typowo miejsce na operacje bazodanowe

class BookModel {

    database = [
        {id: 1, title: "Lalka", author: "Bolesław Prus"},
        {id: 2, title: "Pan Tadeusz", author: "Adam Mickiewicz"},
        {id: 3, title: "Nad Niemnem", author: "Eliza Orzeszkowa"}
    ];

    create = ({author, title}) => {
        const newId = this.database[this.database.length - 1].id + 1;     // Zwykle to Baza zarządza ID
        const newBook = {author, title, id: newId };
        this.database.push(newBook);
        return newBook;
    }

    findAll = () => {
        return this.database;
    }

    findByPk = (id) => {
        return this.database.find(entity => entity.id === id);
    }

    findByTitle = (title) => {
        return this.database.filter(entity => entity.title.includes(title));
    }

    destroy = (id) => {
        this.database = this.database.filter(entity => entity.id !== id);
    }

    update = ({id, author, title}) => {
        const dbId = this.database.findIndex(book => book.id === id);
        if (dbId === -1) return null;

        this.database[dbId].author = author;
        this.database[dbId].title = title;

        return this.database[dbId];
    }
}

module.exports = BookModel;
