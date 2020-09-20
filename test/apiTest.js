const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const Contact = require('../src/model/contactModel');

chai.use(chaiHttp);
chai.should();

// TODO: fix travis

describe("GET /contacts", () => {
    it("should get all contacts", (done) => {
        chai.request(app)
            .get('/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            });
    });
});

describe("POST /contacts", () => {
    const newContact = new Contact({ name: 'Alice', email: 'al1c3@hotmail.com', phone: '01028475621221' });
    after((done) => {
        // TODO: Fix the deletion of added contacts
        newContact.delete((err) => {
            done();
        })
    });

    it("should create a new contact", (done) => {
        chai.request(app)
            .post('/contacts')
            .send(newContact)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });
});

describe("DEL /contacts/:contact_id", () => {
    const newContact = new Contact({ name: 'Bob', email: 'bobby11@email.com', phone: '91234567' });
    let id = addDummyContact(newContact);
    deleteDummyContact(newContact);

    it("should delete a new contact", (done) => {
        chai.request(app)
            .delete(`/contacts/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });
});

describe("GET /contacts/:contact_id", () => {
    const newContact = new Contact({ name: 'Charlie', email: 'charlie@example.com', phone: '87654321' });
    let id = addDummyContact(newContact);
    deleteDummyContact(newContact);

    it("should get a contact", (done) => {
        chai.request(app)
            .get(`/contacts/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            });
    });
});

describe("UPDATE /contact/:contact_id with PATCH or PUT", () => {
    describe("PATCH /contacts/:contact_id", () => {
        const newContact = new Contact({ name: 'Derrick', email: 'd3rr1c2@example.email.com', phone: '455778796' });
        let id = addDummyContact(newContact);
        deleteDummyContact(newContact);

        it("should update the contact's name", (done) => {
            chai.request(app)
                .patch(`/contacts/${id}`)
                .send({ name: 'Elinei' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should update the contact's email", (done) => {
            chai.request(app)
                .patch(`/contacts/${id}`)
                .send({ email: 'Elineyparky@gmail.com' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("PUT /contacts/:contact_id", () => {
        const newContact = new Contact({ name: 'Felix', email: 'kjellberg@example.email.com', phone: '435257667' });
        let id = addDummyContact(newContact);
        deleteDummyContact(newContact);

        it("should update the contact's name", (done) => {
            chai.request(app)
                .put(`/contacts/${id}`)
                .send({ name: 'Philipe' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should update the contact's phone", (done) => {
            chai.request(app)
                .put(`/contacts/${id}`)
                .send({ phone: '001340658356' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

function deleteDummyContact(newContact) {
    after((done) => {
        newContact.delete((err) => {
            done();
        });
    });
}

function addDummyContact(newContact) {
    before((done) => {
        newContact.save((err) => {
            done();
        });
    });
    return newContact._id;
}
