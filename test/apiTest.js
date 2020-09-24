const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const Book = require('../src/model/bookModel');

chai.use(chaiHttp);
chai.should();

describe("GET /books", () => {
    it("should get all ", (done) => {
        chai.request(app)
            .get('/books')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            });
    }).timeout(10000);
});

describe("POST /books", () => {
    const newBook = new Book({ title: 'Alice' });
    deleteDummyBook(newBook);

    it("should create a new book", (done) => {
        chai.request(app)
            .post('/books')
            .send(newBook)
            .end((err, res) => {
                res.should.have.status(200);
                // res.should.be.json;
                // res.body.should.be.a('object');
                done();
            });
    }).timeout(10000);
});

describe("DEL /books/:book_id", () => {
    const newBook = new Book({ title: 'Bob' });
    let id = addDummyBook(newBook);
    deleteDummyBook(newBook);

    it("should delete a new book", (done) => {
        chai.request(app)
            .delete(`/books/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    }).timeout(10000);
});

describe("GET /books/:book_id", () => {
    const newBook = new Book({ title: 'Charlie' });
    let id = addDummyBook(newBook);
    deleteDummyBook(newBook);

    it("should get a book", (done) => {
        chai.request(app)
            .get(`/books/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            });
    }).timeout(10000);
});

describe("UPDATE /book/:book_id with PATCH or PUT", () => {
    describe("PATCH /books/:book_id", () => {
        const newBook = new Book({ title: 'Derrick' });
        let id = addDummyBook(newBook);
        deleteDummyBook(newBook);

        it("should update the book's title", (done) => {
            chai.request(app)
                .patch(`/books/${id}`)
                .send({ title: 'Elinei' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(10000);
    });

    describe("PUT /books/:book_id", () => {
        const newBook = new Book({ title: 'Felix ' });
        let id = addDummyBook(newBook);
        deleteDummyBook(newBook);

        it("should update the book's title", (done) => {
            chai.request(app)
                .put(`/books/${id}`)
                .send({ title: 'Philipe' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        }).timeout(10000);
    });
});

function deleteDummyBook(newBook) {
    after((done) => {
        newBook.delete((err) => {
            done();
        });
    });
}

function addDummyBook(newBook) {
    before((done) => {
        newBook.save((err) => {
            done();
        });
    });
    return newBook._id;
}
